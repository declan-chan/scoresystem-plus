import React, { Component } from 'react'
import { connect } from 'react-redux' 
import * as actions from '../actions'
import { withRouter } from 'react-router'
import { getVisibilityTodos, getIsFetching, getErrorMessage } from '../reducers'
import TodoList from '../components/todolist/TodoList'
import HandleRetry from '../components/todolist/HandleRetry'
// import { fetchTodos } from '../api'

class VisibleTodoList extends Component {
	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}

	fetchData() {
		const { filter, fetchTodos } = this.props;
		// fetchTodos(filter).then(todos =>
		// 	receiveTodos(filter, todos)
		// );
		// fetchTodos(filter).then((value) => console.log(value))
		fetchTodos(filter);
	}

	render() {
		const { toggleTodo, isFetching, todos, filter, errorMessage } = this.props;
		if (errorMessage && !todos.length) {
			return <HandleRetry 
				errorMessage={errorMessage}
				onRetry={() => this.fetchData()}
			/>
		}
		if (isFetching && !todos.length) {
			return <p>loading...</p>
		}
		return (
			<TodoList 
				todos={todos}
				onTodoClick={toggleTodo}
			/>
		);
	}
}

const mapStateToProps = (state, {params}) => {
	const filter = params.filter || 'all';
	return {
		filter,
		todos: getVisibilityTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		errorMessage: getErrorMessage(state, filter),
	}
}

// mapDispatchToProps的完整写法
// const mapDispatchToProps = (dispatch) => ({
// 	onTodoClick(id) {
// 		dispatch(toggleTodo(id));
// 	}
// })

// const mapDispatchToProps = ({
// 	onTodoClick: toggleTodo,
// 	receiveTodos,
// })

VisibleTodoList = withRouter(connect(
	mapStateToProps,
	actions
)(VisibleTodoList));

export default VisibleTodoList