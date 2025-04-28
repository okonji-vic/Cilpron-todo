
"use client"

import React from "react"
import type { Todo } from "../types/todo"
import TodoItem from "./TodoItem"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Text } from "@fluentui/react"
import Pagination from "./Pagination"
import styles from "./TodoList.module.css"

interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string) => void
  onToggleStar: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (updatedTodo: Todo) => void
  onReorder: (dragIndex: number, hoverIndex: number) => void
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

interface DraggableTodoItemProps {
  todo: Todo
  index: number
  onToggleComplete: (id: string) => void
  onToggleStar: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (updatedTodo: Todo) => void
  onReorder: (dragIndex: number, hoverIndex: number) => void
}

const DraggableTodoItem: React.FC<DraggableTodoItemProps> = ({
  todo,
  index,
  onToggleComplete,
  onToggleStar,
  onDelete,
  onUpdate,
  onReorder,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: "TODO_ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover: (item: { index: number }, _monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Time to actually perform the action
      onReorder(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className={styles.draggableItem}>
      <TodoItem
        todo={todo}
        onToggleComplete={onToggleComplete}
        onToggleStar={onToggleStar}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  )
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onToggleStar,
  onDelete,
  onUpdate,
  onReorder,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  // Calculate pagination
  const indexOfLastTodo = currentPage * itemsPerPage
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)

  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text variant="large" className={styles.emptyStateTitle}>
          No tasks found
        </Text>
        <Text className={styles.emptyStateSubtitle}>Add a new task to get started</Text>
      </div>
    )
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.todoList}>
          {currentTodos.map((todo, index) => (
            <DraggableTodoItem
              key={todo.id}
              todo={todo}
              index={index + indexOfFirstTodo} // Adjust index for pagination
              onToggleComplete={onToggleComplete}
              onToggleStar={onToggleStar}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onReorder={onReorder}
            />
          ))}
        </div>
      </DndProvider>

      <Pagination
        totalItems={todos.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  )
}

export default TodoList
