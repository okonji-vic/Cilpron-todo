# Task Manager - Todo Application

A comprehensive Todo application built with React and TypeScript, featuring a modern UI inspired by Outlook's Todo interface.

## Features

- ✅ Add, edit, delete, and complete tasks
- 🌟 Star important tasks
- 🚩 Set priority levels (low, medium, high)
- 📅 Add due dates to tasks
- 🔍 Search and filter tasks
- 📱 Responsive design
- 🔄 Drag and drop to reorder tasks
- 💾 Local storage persistence
- 🔔 Task notifications for upcoming due dates
- 👤 User authentication (mock implementation)

## Technologies Used

- React 18
- TypeScript
- Fluent UI React components
- CSS Modules for styling
- React DnD for drag and drop functionality
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/okonji-vic/Cilpron-todo.git
cd Cilpron-todo
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

\`\`\`
src/
├── components/         # UI components
│   ├── TodoItem.tsx    # Individual todo item
│   ├── TodoList.tsx    # List of todos with drag and drop
│   ├── AddTodo.tsx     # Form to add new todos
│   ├── Filters.tsx     # Search and filter functionality
│   ├── UserAuth.tsx    # User authentication UI
│   └── Notifications.tsx # Task reminders
├── types/              # TypeScript interfaces
│   ├── todo.ts         # Todo item structure
│   └── user.ts         # User data structure
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts # Persist data in localStorage
│   └── useNotifications.ts # Task reminders logic
├── services/           # API integration (mock)
│   ├── todoService.ts  # Todo CRUD operations
│   └── authService.ts  # Authentication service
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
\`\`\`

## Usage

- **Adding a task**: Use the form at the top to add a new task. You can set a due date and priority level.
- **Completing a task**: Click the checkbox next to a task to mark it as complete.
- **Editing a task**: Click the edit icon to modify a task's details.
- **Deleting a task**: Click the trash icon to remove a task.
- **Starring a task**: Click the star icon to mark a task as important.
- **Filtering tasks**: Use the filter tabs to view specific categories of tasks.
- **Searching tasks**: Use the search box to find specific tasks.
- **Reordering tasks**: Drag and drop tasks to change their order.

## Future Enhancements

- Backend integration for data persistence across devices
- User authentication with JWT
- Task categories and labels
- Recurring tasks
- Sharing tasks with other users
- Mobile app using React Native

## License

This project is licensed under the MIT License - see the LICENSE file for details.
