import React, { Component } from 'react'
import { connect } from 'react-redux' 
import * as actions from '../actions'
import { withRouter } from 'react-router'
import { getVisibilityTodos, getIsFetching } from '../reducers'
import TodoList from '../components/todolist/TodoList'
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
		fetchTodos(filter);
	}

	render() {
		const { toggleTodo, isFetching, todos } = this.props;
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