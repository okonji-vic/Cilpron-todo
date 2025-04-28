import type React from "react"
import { useState, useEffect } from "react"
import { Calendar as FluentCalendar, DayOfWeek } from "@fluentui/react"
import type { Todo } from "../types/todo"
import styles from "./Calendar.module.css"

interface CalendarProps {
  todos: Todo[]
  onDateSelect: (date: Date | null) => void
  selectedDate: Date | null
}

const Calendar: React.FC<CalendarProps> = ({ todos, onDateSelect, selectedDate }) => {
  const [todoDates, setTodoDates] = useState<Record<string, number>>({})

  // Format date to YYYY-MM-DD for comparison
  const formatDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  // Get count of todos for each date
  useEffect(() => {
    const dateMap: Record<string, number> = {}

    todos.forEach((todo) => {
      const dateKey = formatDateKey(new Date(todo.createdAt))
      dateMap[dateKey] = (dateMap[dateKey] || 0) + 1
    })

    setTodoDates(dateMap)
  }, [todos])

  // Custom renderer for calendar day
  const onRenderDayCallback = (date: Date, dayProps: any): JSX.Element => {
    const dateKey = formatDateKey(date)
    const todoCount = todoDates[dateKey] || 0

    // Check if this date is the selected date
    const isSelected =
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()

    return (
      <div
        className={`${styles.calendarDay} ${todoCount > 0 ? styles.hasTodos : ""} ${isSelected ? styles.selected : ""}`}
      >
        <span>{date.getDate()}</span>
        {todoCount > 0 && <span className={styles.todoIndicator}>{todoCount}</span>}
      </div>
    )
  }

  const handleSelectDate = (date: Date | null | undefined): void => {
    onDateSelect(date || null)
  }

  const clearSelection = (): void => {
    onDateSelect(null)
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>Todo Calendar</h2>
        {selectedDate && (
          <button onClick={clearSelection} className={styles.clearButton}>
            Clear Selection
          </button>
        )}
      </div>

      <div className={styles.calendarWrapper}>
        <FluentCalendar
          onSelectDate={handleSelectDate}
          value={selectedDate || undefined}
          firstDayOfWeek={DayOfWeek.Sunday}
          onRenderDay={onRenderDayCallback}
          showGoToToday={true}
          showMonthPickerAsOverlay={true}
          highlightSelectedMonth={true}
        />
      </div>

      {selectedDate && (
        <div className={styles.selectedDateInfo}>
          <p>
            Showing todos created on: <strong>{selectedDate.toLocaleDateString()}</strong>
          </p>
        </div>
      )}
    </div>
  )
}

export default Calendar
