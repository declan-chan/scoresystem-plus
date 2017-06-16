import { combineReducers } from 'redux'
import todos, * as fromTodos from './todolist/todos'

const todoApp = combineReducers({
	todos,
})

export default todoApp

export const getVisibilityTodos = (state, filter) => 
	fromTodos.getVisibilityTodos(state.todos, filter);

export const getIsFetching = (state, filter) => 
	fromTodos.getIsFetching(state.todos, filter);