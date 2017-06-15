import { createStore } from 'redux';
import reducer from './reducers'
import { loadState, saveState } from './localStorage'
// import { throttle } from 'lodash';
import throttle from 'lodash/throttle'


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