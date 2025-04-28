
import { useEffect, useState } from "react"
import type { Todo } from "../types/todo"

export const useNotifications = (todos: Todo[]) => {
  const [notifications, setNotifications] = useState<Todo[]>([])

  useEffect(() => {
    // Check for todos with due dates coming up in the next 24 hours
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const upcomingTodos = todos.filter((todo) => {
      if (!todo.completed && todo.dueDate) {
        const dueDate = new Date(todo.dueDate)
        return dueDate > now && dueDate <= tomorrow
      }
      return false
    })

    setNotifications(upcomingTodos)

    // Set up notification check every hour
    const intervalId = setInterval(() => {
      const currentTime = new Date()
      const nextDay = new Date(currentTime)
      nextDay.setDate(nextDay.getDate() + 1)

      const newUpcomingTodos = todos.filter((todo) => {
        if (!todo.completed && todo.dueDate) {
          const dueDate = new Date(todo.dueDate)
          return dueDate > currentTime && dueDate <= nextDay
        }
        return false
      })

      setNotifications(newUpcomingTodos)
    }, 3600000) // 1 hour in milliseconds

    return () => clearInterval(intervalId)
  }, [todos])

  return notifications
}
