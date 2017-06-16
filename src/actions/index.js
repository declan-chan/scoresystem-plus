import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers';
import * as api from '../api';
//temporary

export const toggleTodo = (id) => (dispatch) =>
	api.toggleTodo(id).then(response => {
		dispatch({
			type: 'TOGGLE_TODO_SUCCESS',
			response: normalize(response, schema.todo)
		})
	});

//有了thunkMiddleware后，一个action内可以调用多次dispatch
export const fetchTodos = (filter) => (dispatch, getState) => {
	if (getIsFetching(getState(), filter)) {
		return Promise.resolve('fetching');
	}

	dispatch({
		type: 'FETCH_TODOS_REQUEST',
		filter,
	});
	return api.fetchTodos(filter).then(response => {
		dispatch({
			type: 'FETCH_TODOS_SUCCESS',
			filter,
			response: normalize(response, schema.arrayOfTodos)
		});
		return response;
	}, (error) => {
		dispatch({
			type: 'FETCH_TODOS_FAILURE',
			filter,
			errorMessage: error.message || 'Something went Wrong',
		})
	});
}

export const addTodo = (text) => (dispatch) => {
	return api.addTodo(text).then(response => {
		dispatch({
			type: 'ADD_TODO_SUCCESS',
			response: normalize(response, schema.todo)
		})
	})
}
