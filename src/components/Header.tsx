"use client"

import type React from "react"
import { Text } from "@fluentui/react"
import Notifications from "./Notifications"
import UserAuth from "./UserAuth"
import type { User } from "../types/user"
import type { Todo, TodoCategory, CustomCategory } from "../types/todo"
import { SYSTEM_CATEGORY_LABELS } from "../types/todo"
import styles from "./Header.module.css"

interface HeaderProps {
  user: User | null
  onLogin: (user: User) => void
  onLogout: () => void
  notifications: Todo[]
  activeCategory: TodoCategory
  customCategories: CustomCategory[]
}

const Header: React.FC<HeaderProps> = ({
  user,
  onLogin,
  onLogout,
  notifications,
  activeCategory,
  customCategories,
}) => {
  // Get the category label (either from system categories or custom categories)
  const getCategoryLabel = () => {
    // Check if it's a system category
    if (activeCategory in SYSTEM_CATEGORY_LABELS) {
      return SYSTEM_CATEGORY_LABELS[activeCategory as keyof typeof SYSTEM_CATEGORY_LABELS]
    }

    // Check if it's a custom category
    const customCategory = customCategories.find((cat) => cat.id === activeCategory)
    if (customCategory) {
      return customCategory.name
    }

    return "Tasks" // Default fallback
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Text
          // variant="xxLarge"
          className={styles.headerTitle}
        >
          {getCategoryLabel()}
        </Text>
        <div className={styles.headerActions}>
          <Notifications notifications={notifications} />
          <UserAuth user={user} onLogin={onLogin} onLogout={onLogout} />
        </div>
      </div>
    </header>
  )
}

export default Header
