// ============================================
// TaskFlow Backend Server
// Node.js + Express + MongoDB
// ============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware
// ============================================

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// ============================================
// MongoDB Connection
// ============================================

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ============================================
// Task Schema and Model
// ============================================

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

// ============================================
// API Routes
// ============================================

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks', message: error.message });
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { text, priority, dueDate } = req.body;
        
        if (!text || !text.trim()) {
            return res.status(400).json({ error: 'Task text is required' });
        }

        const task = new Task({
            text: text.trim(),
            priority: priority || 'medium',
            dueDate: dueDate || null,
            completed: false
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task', message: error.message });
    }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        const task = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task', message: error.message });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', task });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task', message: error.message });
    }
});

// Delete all completed tasks
app.delete('/api/tasks/completed/all', async (req, res) => {
    try {
        const result = await Task.deleteMany({ completed: true });
        res.json({ 
            message: 'Completed tasks deleted successfully', 
            deletedCount: result.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete completed tasks', message: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TaskFlow API is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API available at http://localhost:${PORT}/api/tasks`);
});

// ============================================
// Error Handling
// ============================================

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});
