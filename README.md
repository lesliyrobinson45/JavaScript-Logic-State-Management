# TaskFlow - Modern To-Do List Application

A fully functional, modern task management application built with pure HTML5, CSS3, and Vanilla JavaScript. Features a beautiful UI, dark mode, local storage persistence, and comprehensive task management capabilities.

![TaskFlow Banner](https://via.placeholder.com/900x300/6366f1/ffffff?text=TaskFlow+-+Modern+Task+Management)

## 🚀 Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete tasks
- 💾 **Local Storage Persistence** - All tasks automatically saved to browser storage
- 🔍 **Live Search** - Real-time task filtering as you type
- 🎯 **Smart Filtering** - Filter by All, Active, or Completed tasks
- ✏️ **Inline Editing** - Edit tasks directly with keyboard shortcuts
- 🗑️ **Bulk Actions** - Clear all completed tasks at once

### Task Management
- 📊 **Priority Levels** - High, Medium, and Low priority tags
- 📅 **Due Dates** - Set and track task deadlines
- ⏰ **Overdue Detection** - Visual indicators for overdue tasks
- ✓ **Completion Tracking** - Mark tasks as complete/incomplete
- 📝 **Task Metadata** - Created date and due date display

### User Experience
- 🌓 **Dark/Light Mode** - Toggle between themes with preference persistence
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI Design** - Clean, professional interface with smooth animations
- ♿ **Accessibility** - ARIA labels and keyboard navigation support
- 📈 **Statistics Dashboard** - Real-time task statistics (Total, Active, Completed)
- 🎭 **Empty State** - Friendly message when no tasks exist

### Technical Features
- 🚫 **No Backend Required** - Runs entirely in the browser
- 🔒 **XSS Protection** - HTML escaping for user input
- ⚡ **Performance Optimized** - Event delegation and efficient DOM updates
- 🎯 **Clean Code** - Well-commented, modular JavaScript
- 🔄 **State Management** - Centralized application state

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Custom properties (variables), Grid, Flexbox, animations
- **Vanilla JavaScript** - ES6+ features, no frameworks or libraries
- **localStorage API** - Client-side data persistence

## 📁 Project Structure

```
project-folder/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling with dark mode
├── script.js           # Application logic and state management
└── README.md           # Project documentation
```

## 🚀 How to Run

1. **Clone or Download** the project files
2. **Open** `index.html` in any modern web browser
3. **Start managing** your tasks immediately!

No installation, no build process, no dependencies required.

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## 💡 Usage Guide

### Adding Tasks
1. Type your task in the input field
2. Select a priority level (Low, Medium, High)
3. Optionally set a due date
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the ✏️ edit button, modify text, then click 💾 or press Enter
- **Delete**: Click the 🗑️ delete button
- **Search**: Type in the search box to filter tasks
- **Filter**: Use All/Active/Completed buttons to view specific tasks

### Keyboard Shortcuts
- **Enter** - Save edited task
- **Escape** - Cancel editing

### Theme Toggle
Click the 🌙/☀️ button in the header to switch between dark and light modes. Your preference is automatically saved.

## 🎨 Features Breakdown

### Statistics Dashboard
Real-time counters showing:
- Total number of tasks
- Active (incomplete) tasks
- Completed tasks

### Priority System
Three priority levels with color coding:
- 🔴 **High** - Red badge
- 🟡 **Medium** - Orange badge
- 🟢 **Low** - Green badge

### Date Management
- **Created Date** - Automatically recorded when task is added
- **Due Date** - Optional deadline with visual overdue indicators
- **Date Validation** - Cannot set due dates in the past

### Filtering System
- **All** - Shows all tasks
- **Active** - Shows only incomplete tasks
- **Completed** - Shows only completed tasks

### Search Functionality
- Real-time filtering as you type
- Case-insensitive search
- Searches through task text

## 🎯 Code Architecture

### State Management
Centralized `AppState` object manages:
- Tasks array
- Current filter selection
- Search query
- Editing state

### DOM Caching
All DOM elements cached on initialization for optimal performance.

### Event Delegation
Efficient event handling using delegation pattern for dynamic task elements.

### Local Storage Schema
Tasks stored as JSON array with structure:
```javascript
{
  id: "unique-id",
  text: "Task description",
  completed: false,
  priority: "medium",
  dueDate: "2026-05-25",
  createdAt: "2026-05-21T10:30:00.000Z"
}
```

## 📸 Screenshots

### Light Mode
![Light Mode Screenshot](https://via.placeholder.com/900x600/ffffff/6366f1?text=Light+Mode+View)

### Dark Mode
![Dark Mode Screenshot](https://via.placeholder.com/900x600/1f2937/6366f1?text=Dark+Mode+View)

### Mobile View
![Mobile View Screenshot](https://via.placeholder.com/400x800/6366f1/ffffff?text=Mobile+Responsive)

## 🔒 Security Features

- **XSS Prevention** - All user input is escaped before rendering
- **Input Validation** - Empty tasks and invalid dates are rejected
- **Safe HTML** - No `innerHTML` with unescaped user content

## ⚡ Performance Optimizations

- DOM element caching
- Event delegation for dynamic elements
- Efficient filtering algorithms
- Minimal reflows and repaints
- CSS transitions over JavaScript animations

## 🎓 Learning Highlights

This project demonstrates:
- Modern JavaScript ES6+ features
- DOM manipulation best practices
- Event handling patterns
- State management without frameworks
- localStorage API usage
- Responsive CSS design
- CSS custom properties (variables)
- Accessibility considerations
- Clean code principles

## 🤝 Contributing

This is a standalone educational project. Feel free to:
- Fork and modify for your own use
- Use as a learning resource
- Extend with additional features

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

Built with ❤️ using pure web technologies - no frameworks, no dependencies, just clean code.

---

**TaskFlow** - Simple, Fast, Effective Task Management
