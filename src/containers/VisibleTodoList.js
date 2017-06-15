import { connect } from 'react-redux' 
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router'
import TodoList from '../components/todolist/TodoList'

const getVisibilityTodos = (todos, filter) => {
	switch (filter) {
		case 'all':
			return todos;
		case 'completed':
			return todos.filter(t => t.completed);
		case 'active':
			return todos.filter(t => !t.completed);
		default:
			throw new Error('Unknown filter: ' + filter);
	}

}

const mapStateToProps = (state, {params}) => ({
	//why is state.todos.present
	todos: getVisibilityTodos(state.todos, params.filter || 'all')
})

// mapDispatchToProps的完整写法
// const mapDispatchToProps = (dispatch) => ({
// 	onTodoClick(id) {
// 		dispatch(toggleTodo(id));
// 	}
// })

const mapDispatchToProps = ({
	onTodoClick: toggleTodo
})

let VisibleTodoList = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList));

export default VisibleTodoList