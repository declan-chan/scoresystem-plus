import { createStore } from 'redux';
import reducer from './reducers'
import { loadState, saveState } from './localStorage'
// import { throttle } from 'lodash';
import throttle from 'lodash/throttle'

const addLoggingToDispatch = (store) => {
	const rawDispatch = store.dispatch;
	if (!console.group) {
		return rawDispatch;
	}

	return (action) => {
		console.group(action.type);
		console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue', action);
		const returnValue = rawDispatch(action);
		console.log('%c next state', 'color: green', store.getState());
		console.groupEnd(action.type);
	}
}

const configureStore = () => {
//persist the state to the localStorage;
	const persistedState = loadState();
	let store;
	
	if (process.env.NODE_ENV === 'production') {
		store = createStore(
			reducer,
			persistedState
		);
	} else {
		//调试模式没有缓存到本地
		store = createStore(
			reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
		store.dispatch = addLoggingToDispatch(store);
	}


	store.subscribe(throttle(() => {
		//only Save Data
		saveState({
			todos: store.getState().todos
		});
	}, 1000));

	return store;
}

export default configureStore;