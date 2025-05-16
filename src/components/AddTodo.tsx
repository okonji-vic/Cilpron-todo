"use client"

import type React from "react"
import { useState } from "react"
import { TextField, PrimaryButton, DatePicker, Dropdown, type IDropdownOption } from "@fluentui/react"
import type { Priority, TodoCategory } from "../types/todo"
import styles from "./AddTodo.module.css"

interface AddTodoProps {
  onAddTodo: (title: string, dueDate: Date | null, priority: Priority, category: TodoCategory) => void
  activeCategory: TodoCategory
  message?: string | null
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo, activeCategory,message, setMessage }) => {
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [priority, setPriority] = useState<Priority>("medium")
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityOptions: IDropdownOption[] = [
    { key: "low", text: "Low Priority" },
    { key: "medium", text: "Medium Priority" },
    { key: "high", text: "High Priority" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeCategory === "planned" && !dueDate) {
      setMessage?.("Please select a due date for planned tasks.")
      return
    }


setMessage?.("Task added successfully!") // Set success message
    if (title.trim()) {
      onAddTodo(title, dueDate, priority, activeCategory)
      setTitle("")
      setDueDate(null)
      setPriority("medium")
      setIsExpanded(false)
      // setMessage?.(null) // Clear the message after successful submission
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <div className={styles.inputRow}>
        <TextField
          placeholder="Add a new task"
          value={title}
          onChange={(_, newValue) => setTitle(newValue || "")}
          className={styles.titleInput}
          onFocus={() => setIsExpanded(true)}
        />
        <PrimaryButton type="submit" disabled={!title.trim()} iconProps={{ iconName: "Add" }} text="Add" />
      </div>

      {isExpanded && (
        <div className={styles.expandedOptions}>
          <DatePicker
            label="Due Date"
            placeholder="Choose a date"
            value={dueDate || undefined}
            onSelectDate={(date) => setDueDate(date || null)}
            formatDate={(date) => (date ? date.toLocaleDateString() : "")}
            className={styles.datePicker}
          />
          <Dropdown
            label="Priority"
            selectedKey={priority}
            options={priorityOptions}
            onChange={(_, option) => setPriority(option?.key as Priority)}
            className={styles.priorityDropdown}
          />
        </div>
      )}
    </form>
  )
}

export default AddTodo
