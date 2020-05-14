import { observable, action, decorate } from 'mobx';
import { ToDoItem } from '../types/todosStoreTypes';

class TodosStore {
  @observable todos: ToDoItem[] = [];

  lastId = 0;

  @action.bound
  addTodo(todo: string) {
    this.todos.push({ id: this.lastId++, text: todo, isDone: false });
  }

  @action.bound
  removeTodo(todoToRemove: ToDoItem) {
    this.todos = this.todos.filter((todo) => todo.id !== todoToRemove.id);
  }

  @action.bound
  editTodoText(todoToEdit: ToDoItem, newText: string) {
    const i = this.todos.findIndex((todo) => todo.id === todoToEdit.id);
    this.todos[i] = { ...this.todos[i], text: newText };
  }

  @action.bound
  toggleTodoState(todoToEdit: ToDoItem) {
    const i = this.todos.findIndex((todo) => todo.id === todoToEdit.id);
    this.todos[i] = { ...this.todos[i], isDone: !this.todos[i].isDone };
  }

}

// alternative syntax if we don't want to use the @ syntax for decorators
// decorate(TodosStore, {
//   todos: observable,
//   addTodo: action.bound,
//   removeTodo: action.bound,
//   editTodo: action.bound,
// });

export default TodosStore;