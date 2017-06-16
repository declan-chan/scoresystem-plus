import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers'
import { loadState, saveState } from './localStorage'
// import { throttle } from 'lodash';
import throttle from 'lodash/throttle'

// //可以从redux-promise中引入
// const promise = (store) => (next) => (action) => {
// 	if (typeof action.then === 'function') {
// 		return action.then(next)
// 	}
// 	return next(action);
// }

// wrap DispatchWithMiddlewares的作用和applyMiddleware相同
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
// 	middlewares.slice().reverse().forEach(middleware =>
// 		store.dispatch = middleware(store)(store.dispatch)
// 	);
// }

//可以从redux-logger中引入
const logger = (store) => (next) => {
	if (!console.group) {
		return next;
	}

	return (action) => {
		console.log(action)
		console.group(action.type);
		console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue', action);
		const returnValue = next(action);
		console.log('%c next state', 'color: green', store.getState());
		console.groupEnd(action.type);
	}
}

const thunk = (store) => (next) => (action) => 
	typeof action === 'function' ? 
		action(store.dispatch, store.getState) :
		next(action);



const configureStore = () => {
//persist the state to the localStorage;
	const persistedState = loadState();
	
	const middlewares = [thunk];
	let enhancer, store;
	if (process.env.NODE_ENV === 'production') {
		enhancer = applyMiddleware(...middlewares);
		store = createStore(
			reducer,
			persistedState,
			enhancer
		);
		store.subscribe(throttle(() => {
			//only Save Data
			saveState({
				todos: store.getState().todos
			});
		}, 1000));
	} else {
		//调试模式没有缓存到本地
		// middlewares.push(logger);
		enhancer = compose(
			applyMiddleware(...middlewares),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		);
		store = createStore(
			reducer,
			enhancer
		)
	}

	return store;
}

export default configureStore;