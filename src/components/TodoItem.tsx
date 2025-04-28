
import type React from "react"
import { useState } from "react"
import type { Todo, Priority } from "../types/todo"
import {
  CheckmarkCircle24Regular,
  Circle24Regular,
  Star20Filled,
  Star20Regular,
  Delete24Regular,
  Edit24Regular,
  Flag24Regular,
} from "@fluentui/react-icons"
import { Dropdown, TextField, DatePicker, PrimaryButton, DefaultButton } from "@fluentui/react"
import styles from "./TodoItem.module.css"

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => void
  onToggleStar: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (updatedTodo: Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onToggleStar, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  const [editedNotes, setEditedNotes] = useState(todo.notes)
  const [editedDueDate, setEditedDueDate] = useState<Date | null>(todo.dueDate)
  const [editedPriority, setEditedPriority] = useState<Priority>(todo.priority)

  const priorityOptions = [
    { key: "low", text: "Low" },
    { key: "medium", text: "Medium" },
    { key: "high", text: "High" },
  ]

  const getPriorityColorClass = (priority: Priority): string => {
    switch (priority) {
      case "high":
        return styles.highPriority
      case "medium":
        return styles.mediumPriority
      case "low":
        return styles.lowPriority
      default:
        return ""
    }
  }

  const handleSave = () => {
    onUpdate({
      ...todo,
      title: editedTitle,
      notes: editedNotes,
      dueDate: editedDueDate,
      priority: editedPriority,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(todo.title)
    setEditedNotes(todo.notes)
    setEditedDueDate(todo.dueDate)
    setEditedPriority(todo.priority)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className={styles.todoItemEdit}>
        <div className={styles.formGroup}>
          <TextField
            label="Task Title"
            value={editedTitle}
            onChange={(_, newValue) => setEditedTitle(newValue || "")}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <TextField
            label="Notes"
            value={editedNotes}
            onChange={(_, newValue) => setEditedNotes(newValue || "")}
            multiline
            rows={3}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <DatePicker
              label="Due Date"
            //   value={editedDueDate || undefined}
            value={editedDueDate ? new Date(editedDueDate) : undefined}
              onSelectDate={(date) => setEditedDueDate(date || null)}
              placeholder="Select a date..."
              ariaLabel="Select a due date"
            />
          </div>
          <div className={styles.formColumn}>
            <Dropdown
              label="Priority"
              selectedKey={editedPriority}
              onChange={(_, option) => setEditedPriority(option?.key as Priority)}
              options={priorityOptions}
            />
          </div>
        </div>
        <div className={styles.actionButtons}>
          <DefaultButton onClick={handleCancel} text="Cancel" />
          <PrimaryButton onClick={handleSave} text="Save" />
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}>
      <button
        onClick={() => onToggleComplete(todo.id)}
        className={styles.iconButton}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed ? (
          <CheckmarkCircle24Regular className={styles.completedIcon} />
        ) : (
          <Circle24Regular className={styles.incompleteIcon} />
        )}
      </button>

      <div className={styles.todoContent}>
        <div className={`${styles.todoTitle} ${todo.completed ? styles.completedText : ""}`}>{todo.title}</div>

        {todo.notes && <div className={styles.todoNotes}>{todo.notes}</div>}

        <div className={styles.todoMeta}>
          {todo.dueDate && (
            <span
              className={`${styles.dueDate} ${
                new Date(todo.dueDate) < new Date() && !todo.completed ? styles.overdue : ""
              }`}
            >
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}

          {/* {todo.priority !== "medium" && (
            <span className={`${styles.priority} ${getPriorityColorClass(todo.priority)}`}>
              <Flag24Regular className={styles.priorityIcon} />
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          )} */}
          {todo.priority && (
  <span className={`${styles.priority} ${getPriorityColorClass(todo.priority)}`}>
    <Flag24Regular className={styles.priorityIcon} />
    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
  </span>
)}

        </div>
      </div>

      <div className={styles.todoActions}>
        <button
          onClick={() => onToggleStar(todo.id)}
          className={styles.starButton}
          aria-label={todo.isStarred ? "Remove star" : "Add star"}
        >
          {todo.isStarred ? (
            <Star20Filled className={styles.starredIcon} />
          ) : (
            <Star20Regular className={styles.unstarredIcon} />
          )}
        </button>

        <button onClick={() => setIsEditing(true)} className={styles.editButton} aria-label="Edit task">
          <Edit24Regular />
        </button>

        <button onClick={() => onDelete(todo.id)} className={styles.deleteButton} aria-label="Delete task">
          <Delete24Regular />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
