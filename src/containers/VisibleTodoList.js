import { connect } from 'react-redux' 
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router'
import TodoList from '../components/todolist/TodoList'
import { getVisibilityTodos } from '../reducers'

const mapStateToProps = (state, {params}) => ({
	todos: getVisibilityTodos(state, params.filter || 'all')
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