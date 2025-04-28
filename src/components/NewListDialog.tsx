"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogType,
  DialogFooter,
  TextField,
  PrimaryButton,
  DefaultButton,
  type IChoiceGroupOption,
} from "@fluentui/react"
import {
  List24Regular,
  Star24Regular,
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
} from "@fluentui/react-icons"
import styles from "./NewListDialog.module.css"

interface NewListDialogProps {
  isOpen: boolean
  onDismiss: () => void
  onCreateList: (name: string, icon: string) => void
}

const NewListDialog: React.FC<NewListDialogProps> = ({ isOpen, onDismiss, onCreateList }) => {
  const [listName, setListName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("List24Regular")

  const handleSubmit = () => {
    if (listName.trim()) {
      onCreateList(listName.trim(), selectedIcon)
      setListName("")
      setSelectedIcon("List24Regular")
      onDismiss()
    }
  }

  const iconOptions: IChoiceGroupOption[] = [
    { key: "List24Regular", text: "List", iconProps: { iconName: "List" } },
    { key: "Star24Regular", text: "Star", iconProps: { iconName: "FavoriteStar" } },
    { key: "Heart24Regular", text: "Heart", iconProps: { iconName: "Heart" } },
    { key: "Bookmark24Regular", text: "Bookmark", iconProps: { iconName: "Bookmark" } },
    { key: "Flag24Regular", text: "Flag", iconProps: { iconName: "Flag" } },
    { key: "Note24Regular", text: "Note", iconProps: { iconName: "Note" } },
    { key: "Book24Regular", text: "Book", iconProps: { iconName: "ReadingMode" } },
    { key: "Lightbulb24Regular", text: "Idea", iconProps: { iconName: "Lightbulb" } },
    { key: "Gift24Regular", text: "Gift", iconProps: { iconName: "Gift" } },
    { key: "Trophy24Regular", text: "Trophy", iconProps: { iconName: "Trophy" } },
    { key: "Rocket24Regular", text: "Rocket", iconProps: { iconName: "Rocket" } },
    { key: "Tag24Regular", text: "Tag", iconProps: { iconName: "Tag" } },
  ]

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: "Create New List",
        subText: "Add a name and choose an icon for your new list.",
      }}
      modalProps={{
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
      }}
    >
      <TextField
        label="List name"
        value={listName}
        onChange={(_, newValue) => setListName(newValue || "")}
        required
        placeholder="Enter list name"
        className={styles.nameInput}
      />

      <div className={styles.iconSelector}>
        <label className={styles.iconLabel}>Choose an icon</label>
        <div className={styles.iconGrid}>
          {iconOptions.map((option) => (
            <button
              key={option.key}
              className={`${styles.iconButton} ${selectedIcon === option.key ? styles.selectedIcon : ""}`}
              onClick={() => setSelectedIcon(option.key)}
              type="button"
              aria-label={`Select ${option.text} icon`}
            >
              {renderIcon(option.key)}
            </button>
          ))}
        </div>
      </div>

      <DialogFooter>
        <PrimaryButton onClick={handleSubmit} text="Create" disabled={!listName.trim()} />
        <DefaultButton onClick={onDismiss} text="Cancel" />
      </DialogFooter>
    </Dialog>
  )
}

// Helper function to render the selected icon
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

export default NewListDialog
