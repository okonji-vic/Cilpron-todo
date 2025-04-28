// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import {
//   WeatherSunnyRegular,
//   Star24Regular,
//   Calendar24Regular,
//   Person24Regular,
//   Home24Regular,
//   Briefcase24Regular,
//   ShoppingBag24Regular,
//   Airplane24Regular,
//   MoviesAndTvRegular,
//   List24Regular,
//   Add24Regular,
//   ButtonRegular,
//     Dismiss24Regular,
//     ReadingModeMobileRegular,
// } from "@fluentui/react-icons"
// import type { TodoCategory } from "../types/todo"
// import { CATEGORY_LABELS } from "../types/todo"
// import styles from "./Sidebar.module.css"

// interface SidebarProps {
//   activeCategory: TodoCategory
//   onCategoryChange: (category: TodoCategory) => void
//   categoryCount: Record<TodoCategory, number>
//   isMobile: boolean
// }

// const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, categoryCount, isMobile }) => {
//   const [isOpen, setIsOpen] = useState(!isMobile)

//   // Update sidebar state when screen size changes
//   useEffect(() => {
//     setIsOpen(!isMobile)
//   }, [isMobile])

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   const handleCategoryClick = (category: TodoCategory) => {
//     onCategoryChange(category)
//     if (isMobile) {
//       setIsOpen(false)
//     }
//   }

//   const getCategoryIcon = (category: TodoCategory) => {
//     switch (category) {
//       case "myday":
//         return <WeatherSunnyRegular />
//       case "important":
//         return <Star24Regular />
//       case "planned":
//         return <Calendar24Regular />
//       case "assigned":
//         return <Person24Regular />
//       case "tasks":
//         return <List24Regular />
//       case "home":
//         return <Home24Regular />
//       case "work":
//         return <Briefcase24Regular />
//       case "shopping":
//         return <ShoppingBag24Regular />
//       case "travel":
//         return <Airplane24Regular />
//       case "movies":
//         return <MoviesAndTvRegular />
//       default:
//         return <List24Regular />
//     }
//   }

//   // Define the categories in the order they should appear
//   const mainCategories: TodoCategory[] = ["myday", "important", "planned", "assigned", "tasks"]
//   const listCategories: TodoCategory[] = ["home", "work", "shopping", "travel", "movies"]

//   return (
//     <>
//       <button className={styles.hamburgerButton} onClick={toggleSidebar} aria-label="Toggle sidebar menu">
//         {/* {isOpen && isMobile ? <Dismiss24Regular /> : <ButtonRegular />} */}
//         {isOpen && isMobile ? <Dismiss24Regular /> : <ReadingModeMobileRegular />}
//       </button>

//       <div
//         className={`${styles.sidebarOverlay} ${isOpen && isMobile ? styles.active : ""}`}
//         onClick={toggleSidebar}
//       ></div>

//       <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
//         <div className={styles.sidebarContent}>
//           <nav className={styles.sidebarNav}>
//             <ul className={styles.categoryList}>
//               {mainCategories.map((category) => (
//                 <li key={category} className={activeCategory === category ? styles.activeCategory : ""}>
//                   <button onClick={() => handleCategoryClick(category)} className={styles.categoryButton}>
//                     <span className={styles.categoryIcon}>{getCategoryIcon(category)}</span>
//                     <span className={styles.categoryLabel}>{CATEGORY_LABELS[category]}</span>
//                     {categoryCount[category] > 0 && (
//                       <span className={styles.categoryCount}>{categoryCount[category]}</span>
//                     )}
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <div className={styles.divider}></div>

//             <ul className={styles.categoryList}>
//               {listCategories.map((category) => (
//                 <li key={category} className={activeCategory === category ? styles.activeCategory : ""}>
//                   <button onClick={() => handleCategoryClick(category)} className={styles.categoryButton}>
//                     <span className={styles.categoryIcon}>{getCategoryIcon(category)}</span>
//                     <span className={styles.categoryLabel}>{CATEGORY_LABELS[category]}</span>
//                     {categoryCount[category] > 0 && (
//                       <span className={styles.categoryCount}>{categoryCount[category]}</span>
//                     )}
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <button className={styles.newListButton}>
//               <span className={styles.categoryIcon}>
//                 <Add24Regular />
//               </span>
//               <span className={styles.categoryLabel}>New list</span>
//             </button>
//           </nav>
//         </div>
//       </aside>
//     </>
//   )
// }

// export default Sidebar



"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  WeatherSunnyRegular,
  Star24Regular,
  Calendar24Regular,
  Person24Regular,
  Home24Regular,
  Briefcase24Regular,
  ShoppingBag24Regular,
  Airplane24Regular,
  MoviesAndTvRegular,
  List24Regular,
  Add24Regular,
  ButtonRegular,
  Dismiss24Regular,
  Heart24Regular,
  Bookmark24Regular,
  Flag24Regular,
  Note24Regular,
  Book24Regular,
  Lightbulb24Regular,
  Gift24Regular,
  Trophy24Regular,
  Rocket24Regular,
    Tag24Regular,
    ReadingModeMobileRegular,
} from "@fluentui/react-icons"
import type { TodoCategory, CustomCategory } from "../types/todo"
import { SYSTEM_CATEGORY_LABELS } from "../types/todo"
import NewListDialog from "./NewListDialog"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  activeCategory: TodoCategory
  onCategoryChange: (category: TodoCategory) => void
  categoryCount: Record<string, number>
  isMobile: boolean
  customCategories: CustomCategory[]
  onAddCustomCategory: (name: string, icon: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onCategoryChange,
  categoryCount,
  isMobile,
  customCategories,
  onAddCustomCategory,
}) => {
  const [isOpen, setIsOpen] = useState(!isMobile)
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false)

  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleCategoryClick = (category: TodoCategory) => {
    onCategoryChange(category)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const handleNewListClick = () => {
    setIsNewListDialogOpen(true)
  }

  const handleCreateList = (name: string, icon: string) => {
    onAddCustomCategory(name, icon)
  }

  const getCategoryIcon = (category: TodoCategory, iconName?: string) => {
    // For custom categories with specified icons
    if (iconName) {
      return renderIcon(iconName)
    }

    // For system categories
    switch (category) {
      case "myday":
        return <WeatherSunnyRegular />
      case "important":
        return <Star24Regular />
      case "planned":
        return <Calendar24Regular />
      case "assigned":
        return <Person24Regular />
      case "tasks":
        return <List24Regular />
      case "home":
        return <Home24Regular />
      case "work":
        return <Briefcase24Regular />
      case "shopping":
        return <ShoppingBag24Regular />
      case "travel":
        return <Airplane24Regular />
      case "movies":
        return <MoviesAndTvRegular />
      default:
        return <List24Regular />
    }
  }

  // Define the categories in the order they should appear
  const mainCategories: TodoCategory[] = ["myday", "important", "planned", "assigned", "tasks"]
  const listCategories: TodoCategory[] = ["home", "work", "shopping", "travel", "movies"]

  return (
    <>
      <button className={styles.hamburgerButton} onClick={toggleSidebar} aria-label="Toggle sidebar menu">
        {isOpen && isMobile ? <Dismiss24Regular className={styles.largeIcon}/> : <ReadingModeMobileRegular className={styles.largeIcon} />}
      </button>

      <div
        className={`${styles.sidebarOverlay} ${isOpen && isMobile ? styles.active : ""}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarContent}>
          <nav className={styles.sidebarNav}>
            <ul className={styles.categoryList}>
              {mainCategories.map((category) => (
                <li key={category} className={activeCategory === category ? styles.activeCategory : ""}>
                  <button onClick={() => handleCategoryClick(category)} className={styles.categoryButton}>
                    <span className={styles.categoryIcon}>{getCategoryIcon(category)}</span>
                    <span className={styles.categoryLabel}>
                      {SYSTEM_CATEGORY_LABELS[category as keyof typeof SYSTEM_CATEGORY_LABELS]}
                    </span>
                    {categoryCount[category] > 0 && (
                      <span className={styles.categoryCount}>{categoryCount[category]}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.divider}></div>

            <ul className={styles.categoryList}>
              {listCategories.map((category) => (
                <li key={category} className={activeCategory === category ? styles.activeCategory : ""}>
                  <button onClick={() => handleCategoryClick(category)} className={styles.categoryButton}>
                    <span className={styles.categoryIcon}>{getCategoryIcon(category)}</span>
                    <span className={styles.categoryLabel}>
                      {SYSTEM_CATEGORY_LABELS[category as keyof typeof SYSTEM_CATEGORY_LABELS]}
                    </span>
                    {categoryCount[category] > 0 && (
                      <span className={styles.categoryCount}>{categoryCount[category]}</span>
                    )}
                  </button>
                </li>
              ))}

              {/* Custom categories */}
              {customCategories.map((customCategory) => (
                <li
                  key={customCategory.id}
                  className={activeCategory === customCategory.id ? styles.activeCategory : ""}
                >
                  <button onClick={() => handleCategoryClick(customCategory.id)} className={styles.categoryButton}>
                    <span className={styles.categoryIcon}>{getCategoryIcon("", customCategory.icon)}</span>
                    <span className={styles.categoryLabel}>{customCategory.name}</span>
                    {categoryCount[customCategory.id] > 0 && (
                      <span className={styles.categoryCount}>{categoryCount[customCategory.id]}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <button className={styles.newListButton} onClick={handleNewListClick}>
              <span className={styles.categoryIcon}>
                <Add24Regular />
              </span>
              <span className={styles.categoryLabel}>New list</span>
            </button>
          </nav>
        </div>
      </aside>

      <NewListDialog
        isOpen={isNewListDialogOpen}
        onDismiss={() => setIsNewListDialogOpen(false)}
        onCreateList={handleCreateList}
      />
    </>
  )
}

// Helper function to render icons by name
function renderIcon(iconName: string) {
  switch (iconName) {
    case "List24Regular":
      return <List24Regular />
    case "Star24Regular":
      return <Star24Regular />
    case "Heart24Regular":
      return <Heart24Regular />
    case "Bookmark24Regular":
      return <Bookmark24Regular />
    case "Flag24Regular":
      return <Flag24Regular />
    case "Note24Regular":
      return <Note24Regular />
    case "Book24Regular":
      return <Book24Regular />
    case "Lightbulb24Regular":
      return <Lightbulb24Regular />
    case "Gift24Regular":
      return <Gift24Regular />
    case "Trophy24Regular":
      return <Trophy24Regular />
    case "Rocket24Regular":
      return <Rocket24Regular />
    case "Tag24Regular":
      return <Tag24Regular />
    default:
      return <List24Regular />
  }
}

export default Sidebar
