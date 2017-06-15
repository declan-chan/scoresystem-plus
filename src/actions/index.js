//temporary
let nextTodoId = Math.random() * 1000000;

export const addTodo = (text) => ({
	type: 'ADD_TODO',
	id: nextTodoId++,
	text,
})


export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id
})