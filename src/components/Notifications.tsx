import React from "react"
import type { Todo } from "../types/todo"
import { Calendar24Regular } from "@fluentui/react-icons"
import { Alert20Regular } from "@fluentui/react-icons"
// import { Bell24Regular } from "@fluentui/react-icons/lib/esm/components/Bell24Regular"
// import { Calendar24Regular } from "@fluentui/react-icons/lib/esm/components/Calendar24Regular"
import { ReminderTimeIcon } from "@fluentui/react-icons-mdl2";


import { Text, Callout, DirectionalHint } from "@fluentui/react"
import styles from "./Notifications.module.css"

interface NotificationsProps {
  notifications: Todo[]
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const [isCalloutVisible, setIsCalloutVisible] = React.useState(false)
  const notificationButtonRef = React.useRef<HTMLButtonElement>(null)

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className={styles.notifications}>
      <button
        ref={notificationButtonRef}
        className={styles.notificationButton}
        onClick={() => setIsCalloutVisible(!isCalloutVisible)}
        aria-label={`${notifications.length} task reminders`}
      >
        {/* <Bell24Regular className={styles.bellIcon} /> */}
        {/* <ReminderTimeIcon className={styles.bellIcon} /> */}
        <Alert20Regular className={styles.bellIcon} />
        <span className={styles.notificationBadge}>{notifications.length}</span>
      </button>

      {isCalloutVisible && (
        <Callout
          target={notificationButtonRef.current}
          onDismiss={() => setIsCalloutVisible(false)}
          directionalHint={DirectionalHint.bottomRightEdge}
          isBeakVisible={true}
          gapSpace={10}
        >
          <div className={styles.calloutContent}>
            <Text variant="large" className={styles.calloutTitle}>
              Task Reminders
            </Text>
            <div className={styles.remindersList}>
              {notifications.map((todo) => (
                <div key={todo.id} className={styles.reminderItem}>
                  <Calendar24Regular className={styles.calendarIcon} />
                  <div>
                    <Text className={styles.reminderTitle}>{todo.title}</Text>
                    <Text className={styles.reminderDueDate}>Due: {new Date(todo.dueDate!).toLocaleDateString()}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Callout>
      )}
    </div>
  )
}

export default Notifications
