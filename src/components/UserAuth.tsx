import type React from "react"
import { useState } from "react"
import {
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  TextField,
  PersonaSize,
  Persona,
  Stack,
} from "@fluentui/react"
import type { User } from "../types/user"
import styles from "./UserAuth.module.css"

interface UserAuthProps {
  user: User | null
  onLogin: (user: User) => void
  onLogout: () => void
}

const UserAuth: React.FC<UserAuthProps> = ({ user, onLogin, onLogout }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleLogin = () => {
    if (name && email) {
      onLogin({
        id: Date.now().toString(),
        name,
        email,
      })
      setIsDialogOpen(false)
      setName("")
      setEmail("")
    }
  }

  if (user) {
    return (
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center" className={styles.userInfo}>
        <Persona text={user.name} secondaryText={user.email} size={PersonaSize.size32} />
        <DefaultButton onClick={onLogout} text="Sign Out" />
      </Stack>
    )
  }

  return (
    <>
      <PrimaryButton onClick={() => setIsDialogOpen(true)} text="Sign In" className={styles.signInButton} />

      <Dialog
        hidden={!isDialogOpen}
        onDismiss={() => setIsDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Sign In",
          subText: "Enter your information to sign in to the Todo app.",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(_, newValue) => setName(newValue || "")}
          required
          className={styles.dialogInput}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(_, newValue) => setEmail(newValue || "")}
          required
          className={styles.dialogInput}
        />
        <DialogFooter>
          <PrimaryButton onClick={handleLogin} text="Sign In" disabled={!name || !email} />
          <DefaultButton onClick={() => setIsDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default UserAuth
