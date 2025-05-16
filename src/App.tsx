"use client"

import { useState, useCallback, useEffect } from "react"
import { Dialog, initializeIcons,DialogType, } from "@fluentui/react"
import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"
import Filters, { type FilterType } from "./components/Filters"
import Calendar from "./components/Calendar"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import {
  type Todo,
  type Priority,
  type TodoCategory,
  type CustomCategory,
  createTodo,
  createCustomCategory,
} from "./types/todo"
import type { User } from "./types/user"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useNotifications } from "./hooks/useNotifications"
import styles from "./App.module.css"
import { ErrorBoundary } from "react-error-boundary";
import { FallbackComponent } from "./components/ErrorComponent"
import Custom404 from "./components/Custom404"
import { Routes, Route } from "react-router-dom"

// Initialize Fluent UI icons
initializeIcons()

function App() {
  // Local storage for todos, user, and custom categories
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [user, setUser] = useLocalStorage<User | null>("user", null)
  const [customCategories, setCustomCategories] = useLocalStorage<CustomCategory[]>("customCategories", [])

  // State for filtering and searching
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [activeCategory, setActiveCategory] = useState<TodoCategory>("tasks")
  const [message, setMessage] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Responsive state
  const [isMobile, setIsMobile] = useState(false)
  const [showCalendar, setShowCalendar] = useState(true)

  // Get notifications for upcoming tasks
  const notifications = useNotifications(todos)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setShowCalendar(window.innerWidth >= 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, searchTerm, selectedDate, activeCategory])

  // Calculate category counts
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {
      myday: 0,
      important: 0,
      // planned: 0,
      assigned: 0,
      tasks: 0,
      home: 0,
      work: 0,
      shopping: 0,
      travel: 0,
      movies: 0,
    }

    const plannedCount = todos.filter((todo) => todo.dueDate).length

    // Initialize counts for custom categories
    customCategories.forEach((category) => {
      counts[category.id] = 0
    })

    todos.forEach((todo) => {
      if (!todo.completed) {
        // Count by category
        counts[todo.category] = (counts[todo.category] || 0) + 1

        // Count important todos separately
        if (todo.isStarred) {
          counts.important++
        }

        // Count planned todos separately
        // if (todo.dueDate) {
        //   counts.planned++ 
        // }

        // Count today's todos for My Day
        const today = new Date()
        if (todo.dueDate) {
          const dueDate = new Date(todo.dueDate)
          if (
            dueDate.getDate() === today.getDate() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getFullYear() === today.getFullYear()
          ) {
            counts.myday++
          }
        }
      }
    })

    // return counts
    return {
      ...counts,
      planned: plannedCount,
    }
  }

  // Add a new todo
  const handleAddTodo = (title: string, dueDate: Date | null, priority: Priority, category: TodoCategory) => {
    const newTodo = createTodo(title, dueDate, priority, category)
    setTodos([...todos, newTodo])
  }

  // Add a new custom category
  const handleAddCustomCategory = (name: string, icon: string) => {
    const newCategory = createCustomCategory(name, icon)
    setCustomCategories([...customCategories, newCategory])
    // Optionally switch to the new category
    setActiveCategory(newCategory.id)
  }

  // Toggle todo completion status
  const handleToggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Toggle star status
  const handleToggleStar = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isStarred: !todo.isStarred } : todo)))
  }

  // Delete a todo
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Update a todo
  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  // Reorder todos (for drag and drop)
  const handleReorderTodos = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setTodos((prevTodos) => {
        const result = Array.from(prevTodos)
        const [removed] = result.splice(dragIndex, 1)
        result.splice(hoverIndex, 0, removed)
        return result
      })
    },
    [setTodos],
  )

  // Handle date selection from calendar
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      setActiveFilter("all") // Reset other filters when date is selected
    }
  }

  // Handle category change
  const handleCategoryChange = (category: TodoCategory) => {
    setActiveCategory(category)
    setSelectedDate(null) // Clear date filter when changing categories
  }

  // Toggle calendar visibility on mobile
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  // Filter todos based on active filter, search term, selected date, and category
  const getFilteredTodos = () => {
    return todos.filter((todo) => {
      // First check category
      if (activeCategory === "important") {
        if (!todo.isStarred) return false
      } else if (activeCategory === "planned") {
        if (!todo.dueDate) return false
      } else if (activeCategory === "myday") {
        const today = new Date()
        if (!todo.dueDate) return false
        const dueDate = new Date(todo.dueDate)
        if (
          dueDate.getDate() !== today.getDate() ||
          dueDate.getMonth() !== today.getMonth() ||
          dueDate.getFullYear() !== today.getFullYear()
        ) {
          return false
        }
      } else if (activeCategory !== "tasks" && todo.category !== activeCategory) {
        return false
      }

      // Then check if we're filtering by creation date
      if (selectedDate) {
        const todoDate = new Date(todo.createdAt)
        const isSameDate =
          todoDate.getDate() === selectedDate.getDate() &&
          todoDate.getMonth() === selectedDate.getMonth() &&
          todoDate.getFullYear() === selectedDate.getFullYear()

        if (!isSameDate) return false
      }

      // Then apply search filter
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.notes.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      // Then apply category filter
      switch (activeFilter) {
        case "active":
          return !todo.completed
        case "completed":
          return todo.completed
        case "starred":
          return todo.isStarred
        case "high-priority":
          return todo.priority === "high"
        case "today":
          if (!todo.dueDate) return false
          const today = new Date()
          const dueDate = new Date(todo.dueDate)
          return (
            dueDate.getDate() === today.getDate() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getFullYear() === today.getFullYear()
          )
        case "all":
        default:
          return true
      }
    })
  }

  const filteredTodos = getFilteredTodos()
  const categoryCounts = getCategoryCounts()

  // Handle pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // User authentication handlers
  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage?.(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [message, setMessage])


  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error, errorInfo) => {
        console.error("Error:", error)
        console.error("Error Info:", errorInfo)
      }}
      onReset={() => {
        // Reset logic here if needed
        // For example, you might want to reset some state or navigate to a different route
      }}
    >
      <Routes>
        {/* Define normal route */}
        <Route path="/" element={
    <div className={styles.app}>
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        notifications={notifications}
        activeCategory={activeCategory}
        customCategories={customCategories}
      />

      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categoryCount={categoryCounts}
        isMobile={isMobile}
        customCategories={customCategories}
        onAddCustomCategory={handleAddCustomCategory}
      />

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.todoSection}>
                  <AddTodo
                    onAddTodo={handleAddTodo}
                    activeCategory={activeCategory}
                    message={message}
                    setMessage={setMessage}
                  />

            <div className={styles.filterRow}>
              <Filters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onSearchChange={setSearchTerm}
                searchTerm={searchTerm}
              />

              {isMobile && (
                <button className={styles.calendarToggle} onClick={toggleCalendar}>
                  {showCalendar ? "Hide Calendar" : "Show Calendar"}
                </button>
              )}
            </div>

            <TodoList
              todos={filteredTodos}
              onToggleComplete={handleToggleComplete}
              onToggleStar={handleToggleStar}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
              onReorder={handleReorderTodos}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>

          {(showCalendar || !isMobile) && (
            <div className={styles.calendarSection}>
              <Calendar todos={todos} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
            </div>
          )}
        </div>
            </main>
       
          
      
          </div>
        } />
        <Route path="*" element={<Custom404 />} />
      </Routes>
      <Dialog
        hidden={!message}
        onDismiss={() => setMessage?.(null)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Notification",
          subText: message || "",
        }}
        modalProps={{
          isBlocking: false,
          styles: {
            main: {
              top: "10px", // Push dialog to the top
              position: "absolute",
              margin: "0 auto",
              width: 'fit-content',
              backgroundColor: "#fff9e5",
              border: "1px solid #ffd966",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      />
    </ErrorBoundary>
      
  )
}

export default App
