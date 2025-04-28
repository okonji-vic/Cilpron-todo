import type { User } from "../types/user"

// This is a mock authentication service
// In a real application, this would connect to your authentication backend

export const authService = {
  // Login user
  async login(email: string, name: string): Promise<User> {
    // In a real app, this would make a POST request to your auth endpoint
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
    }

    localStorage.setItem("user", JSON.stringify(user))
    return user
  },

  // Logout user
  async logout(): Promise<void> {
    // In a real app, this would call your logout endpoint
    localStorage.removeItem("user")
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    // In a real app, this would validate the session with your backend
    const userJson = localStorage.getItem("user")
    return userJson ? JSON.parse(userJson) : null
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user !== null
  },
}
