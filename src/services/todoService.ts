import type { Todo } from "../types/todo"

// This is a mock service that would normally connect to a backend API
// In a real application, this would make HTTP requests to your server

export const todoService = {
  // Get all todos
  async getTodos(): Promise<Todo[]> {
    // In a real app, this would be a fetch call to your API
    const storedTodos = localStorage.getItem("todos")
    return storedTodos ? JSON.parse(storedTodos) : []
  },

  // Add a new todo
  async addTodo(todo: Todo): Promise<Todo> {
    // In a real app, this would be a POST request to your API
    const todos = await this.getTodos()
    const updatedTodos = [...todos, todo]
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    return todo
  },

  // Update an existing todo
  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // In a real app, this would be a PUT request to your API
    const todos = await this.getTodos()
    const updatedTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    return updatedTodo
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    // In a real app, this would be a DELETE request to your API
    const todos = await this.getTodos()
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  },

  // Sync todos with server (mock implementation)
  async syncTodos(todos: Todo[]): Promise<Todo[]> {
    // In a real app, this would sync local changes with the server
    localStorage.setItem("todos", JSON.stringify(todos))
    return todos
  },
}
