import { v4 as uuidv4 } from "uuid"

export type Priority = "low" | "medium" | "high"
export type SystemCategory =
  | "tasks"
  | "myday"
  | "important"
  | "planned"
  | "home"
  | "work"
  | "shopping"
  | "travel"
  | "movies"
  | "assigned"

export interface CustomCategory {
  id: string
  name: string
  icon: string
}

export type TodoCategory = SystemCategory | string

export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  dueDate: Date | null
  priority: Priority
  isStarred: boolean
  notes: string
  category: TodoCategory
}

export const createTodo = (
  title: string,
  dueDate?: Date | null,
  priority: Priority = "medium",
  category: TodoCategory = "tasks",
): Todo => ({
  id: uuidv4(),
  title,
  completed: false,
  createdAt: new Date(),
  dueDate: dueDate || null,
  priority,
  isStarred: false,
  notes: "",
  category,
})

export const SYSTEM_CATEGORY_LABELS: Record<SystemCategory, string> = {
  myday: "My Day",
  important: "Important",
  planned: "Planned",
  assigned: "Assigned to me",
  tasks: "Tasks",
  home: "Home",
  work: "Work",
  shopping: "Shopping",
  travel: "Travel",
  movies: "Movies to watch",
}

export const createCustomCategory = (name: string, icon: string): CustomCategory => ({
  id: uuidv4(),
  name,
  icon,
})

