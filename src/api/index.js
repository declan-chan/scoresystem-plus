import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
	todos: [{
		id: v4(),
		text: 'hey',
		completed: true,
	}, {
		id: v4(),
		text: 'hello',
		completed: true,
	}, {
		id: v4(),
		text: 'goodbye',
		completed: false,
	}]
}

const delay = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) => 
	delay(500).then(() => {
		if (Math.random() > 0.9) {
			throw new Error('Fake Network Error');
		}

		switch (filter) {
			case 'all':
				return fakeDatabase.todos;
			case 'active':
				return fakeDatabase.todos.filter(t => !t.completed);
			case 'completed':
				return fakeDatabase.todos.filter(t => t.completed);
			default: 
				return new Error(`Unknown filter: ${filter}`);
		}
	});

export const addTodo = (text) => 
	delay(500).then(() => {
		const todo = {
			id: v4(),
			text,
			completed: false,
		}
		fakeDatabase.todos.push(todo);
		return todo;
	});

export const toggleTodo = (id) => 
	delay(500).then(() => {
		let todo = fakeDatabase.todos.find(todo => todo.id === id);
		if (todo) {
			todo.completed = !todo.completed;
			return todo;
		}
	});