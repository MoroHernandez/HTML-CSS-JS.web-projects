import { TodoList } from './src/classes/todo-list.class.js';
import { crearTodoHtml } from './src/js/componentes.js';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

