
import type React from "react"
import { SearchBox, Pivot, PivotItem } from "@fluentui/react"
import styles from "./Filters.module.css"

export type FilterType = "all" | "active" | "completed" | "starred" | "high-priority" | "today"

interface FiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  onSearchChange: (searchTerm: string) => void
  searchTerm: string
}

const Filters: React.FC<FiltersProps> = ({ activeFilter, onFilterChange, onSearchChange, searchTerm }) => {
  return (
    <div className={styles.filters}>
      <SearchBox
        placeholder="Search tasks..."
        onChange={(_, newValue) => onSearchChange(newValue || "")}
        value={searchTerm}
        className={styles.searchBox}
      />

      <Pivot
        selectedKey={activeFilter}
        onLinkClick={(item?: PivotItem) => {
          if (item?.props.itemKey) {
            onFilterChange(item.props.itemKey as FilterType)
          }
        }}
        className={styles.filterTabs}
      >
        <PivotItem itemKey="all" headerText="All" itemIcon="List" />
        <PivotItem itemKey="active" headerText="Active" />
        <PivotItem itemKey="completed" headerText="Completed" />
        <PivotItem itemKey="starred" headerText="Starred" />
        <PivotItem itemKey="high-priority" headerText="Important" />
        <PivotItem itemKey="today" headerText="Today" />
      </Pivot>
    </div>
  )
}

export default Filters
