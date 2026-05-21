# TaskFlow - Modern To-Do List Application

A fully functional, modern task management application with MongoDB backend, Express.js API, and a beautiful frontend built with HTML5, CSS3, and Vanilla JavaScript. Features cloud database persistence, dark mode, and comprehensive task management capabilities.

![TaskFlow Banner](https://via.placeholder.com/900x300/6366f1/ffffff?text=TaskFlow+-+Modern+Task+Management)

## 🚀 Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete tasks
- 💾 **MongoDB Persistence** - Cloud database storage with MongoDB Atlas
- 🔍 **Live Search** - Real-time task filtering as you type
- 🎯 **Smart Filtering** - Filter by All, Active, or Completed tasks
- ✏️ **Inline Editing** - Edit tasks directly with keyboard shortcuts
- 🗑️ **Bulk Actions** - Clear all completed tasks at once
- 🌐 **RESTful API** - Complete backend API with Express.js

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
- 🚀 **Node.js Backend** - Express.js server with RESTful API
- 🗄️ **MongoDB Database** - Cloud or local database storage
- 🔒 **XSS Protection** - HTML escaping for user input
- ⚡ **Performance Optimized** - Event delegation and efficient DOM updates
- 🎯 **Clean Code** - Well-commented, modular JavaScript
- 🔄 **State Management** - Centralized application state
- 📡 **Async Operations** - Modern fetch API with async/await

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Custom properties (variables), Grid, Flexbox, animations
- **Vanilla JavaScript** - ES6+ features, async/await, fetch API

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (cloud or local)
- **Mongoose** - MongoDB object modeling

### Additional
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
project-folder/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling with dark mode
├── script.js           # Frontend with MongoDB API integration
├── script-local.js     # Original localStorage version (backup)
├── server.js           # Express.js backend server
├── package.json        # Node.js dependencies and scripts
├── .env               # Environment variables (MongoDB connection)
├── .gitignore         # Git ignore patterns
├── README.md          # Project documentation
└── SETUP.md           # Detailed setup instructions
```

## 🚀 How to Run

### Prerequisites
- Node.js installed (v14 or higher)
- MongoDB Atlas account (free) OR local MongoDB installation

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure MongoDB**
   - See [SETUP.md](SETUP.md) for detailed MongoDB setup
   - Update `.env` file with your MongoDB connection string

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Open the Application**
   - Go to: http://localhost:3000
   - Start managing your tasks!

### Detailed Setup Instructions
See [SETUP.md](SETUP.md) for complete MongoDB Atlas setup guide and troubleshooting.

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
- Tasks array (synced with MongoDB)
- Current filter selection
- Search query
- Editing state

### API Integration
- RESTful API calls using fetch API
- Async/await for clean asynchronous code
- Error handling with user-friendly messages
- Automatic UI updates after API operations

### DOM Caching
All DOM elements cached on initialization for optimal performance.

### Event Delegation
Efficient event handling using delegation pattern for dynamic task elements.

### Database Schema
Tasks stored in MongoDB with Mongoose schema:
```javascript
{
  text: String (required, trimmed),
  completed: Boolean (default: false),
  priority: String (enum: low/medium/high),
  dueDate: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
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
- **Environment Variables** - Sensitive data stored in .env file
- **CORS Enabled** - Controlled cross-origin access

## 🌐 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Get All Tasks
```http
GET /api/tasks
```
Returns array of all tasks.

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "text": "Task description",
  "priority": "medium",
  "dueDate": "2026-05-25"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "text": "Updated text",
  "completed": true
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

#### Delete All Completed Tasks
```http
DELETE /api/tasks/completed/all
```

#### Health Check
```http
GET /api/health
```

### Task Schema
```javascript
{
  _id: "MongoDB ObjectId",
  text: "Task description",
  completed: false,
  priority: "low" | "medium" | "high",
  dueDate: "2026-05-25" | null,
  createdAt: "2026-05-21T10:30:00.000Z",
  updatedAt: "2026-05-21T10:30:00.000Z"
}
```

## ⚡ Performance Optimizations

- DOM element caching
- Event delegation for dynamic elements
- Efficient filtering algorithms
- Minimal reflows and repaints
- CSS transitions over JavaScript animations

## 🎓 Learning Highlights

This project demonstrates:
- **Backend Development**: Node.js, Express.js, RESTful API design
- **Database Integration**: MongoDB, Mongoose ODM
- **Frontend-Backend Communication**: Fetch API, async/await
- **Modern JavaScript**: ES6+ features, promises, error handling
- **DOM Manipulation**: Best practices and patterns
- **Event Handling**: Delegation and efficient listeners
- **State Management**: Without frameworks
- **API Design**: RESTful principles
- **Environment Configuration**: dotenv usage
- **Responsive CSS Design**: Mobile-first approach
- **CSS Custom Properties**: Theme management
- **Accessibility**: ARIA labels and semantic HTML
- **Clean Code Principles**: Modular, commented, maintainable

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
