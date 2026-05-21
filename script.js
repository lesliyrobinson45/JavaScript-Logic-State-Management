// ============================================
// TaskFlow - Modern To-Do List Application
// ============================================

// Application State
const AppState = {
    tasks: [],
    currentFilter: 'all',
    searchQuery: '',
    editingTaskId: null
};

// DOM Elements Cache
const DOM = {
    taskForm: null,
    taskInput: null,
    prioritySelect: null,
    dueDateInput: null,
    tasksList: null,
    emptyState: null,
    searchInput: null,
    filterButtons: null,
    clearCompletedBtn: null,
    themeToggle: null,
    totalTasksEl: null,
    activeTasksEl: null,
    completedTasksEl: null
};

// ============================================
// Initialization
// ============================================

/**
 * Initialize the application
 */
function init() {
    cacheDOMElements();
    loadTasksFromStorage();
    loadThemeFromStorage();
    attachEventListeners();
    renderTasks();
    updateStatistics();
    setMinDate();
}

/**
 * Cache all DOM elements for better performance
 */
function cacheDOMElements() {
    DOM.taskForm = document.getElementById('taskForm');
    DOM.taskInput = document.getElementById('taskInput');
    DOM.prioritySelect = document.getElementById('prioritySelect');
    DOM.dueDateInput = document.getElementById('dueDateInput');
    DOM.tasksList = document.getElementById('tasksList');
    DOM.emptyState = document.getElementById('emptyState');
    DOM.searchInput = document.getElementById('searchInput');
    DOM.filterButtons = document.querySelectorAll('.filter-btn');
    DOM.clearCompletedBtn = document.getElementById('clearCompleted');
    DOM.themeToggle = document.getElementById('themeToggle');
    DOM.totalTasksEl = document.getElementById('totalTasks');
    DOM.activeTasksEl = document.getElementById('activeTasks');
    DOM.completedTasksEl = document.getElementById('completedTasks');
}

/**
 * Set minimum date for due date input to today
 */
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    DOM.dueDateInput.setAttribute('min', today);
}

// ============================================
// Event Listeners
// ============================================

/**
 * Attach all event listeners
 */
function attachEventListeners() {
    // Form submission
    DOM.taskForm.addEventListener('submit', handleTaskSubmit);
    
    // Search input
    DOM.searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    DOM.filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // Clear completed button
    DOM.clearCompletedBtn.addEventListener('click', handleClearCompleted);
    
    // Theme toggle
    DOM.themeToggle.addEventListener('click', toggleTheme);
    
    // Event delegation for task actions
    DOM.tasksList.addEventListener('click', handleTaskAction);
    DOM.tasksList.addEventListener('change', handleTaskCheckbox);
    DOM.tasksList.addEventListener('keydown', handleTaskEditKeydown);
}

/**
 * Handle task form submission
 */
function handleTaskSubmit(e) {
    e.preventDefault();
    
    const taskText = DOM.taskInput.value.trim();
    
    // Validation
    if (!taskText) {
        return;
    }
    
    // Create new task object
    const newTask = {
        id: generateId(),
        text: taskText,
        completed: false,
        priority: DOM.prioritySelect.value,
        dueDate: DOM.dueDateInput.value || null,
        createdAt: new Date().toISOString()
    };
    
    // Add task to state
    AppState.tasks.unshift(newTask);
    
    // Save and render
    saveTasksToStorage();
    renderTasks();
    updateStatistics();
    
    // Reset form
    DOM.taskForm.reset();
    DOM.taskInput.focus();
}

/**
 * Handle search input
 */
function handleSearch(e) {
    AppState.searchQuery = e.target.value.toLowerCase().trim();
    renderTasks();
}

/**
 * Handle filter button clicks
 */
function handleFilterChange(e) {
    const filter = e.target.dataset.filter;
    
    if (!filter) return;
    
    // Update active state
    DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update filter state
    AppState.currentFilter = filter;
    
    // Re-render tasks
    renderTasks();
}

/**
 * Handle clear completed button
 */
function handleClearCompleted() {
    const completedCount = AppState.tasks.filter(task => task.completed).length;
    
    if (completedCount === 0) {
        return;
    }
    
    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        AppState.tasks = AppState.tasks.filter(task => !task.completed);
        saveTasksToStorage();
        renderTasks();
        updateStatistics();
    }
}

/**
 * Handle task actions using event delegation
 */
function handleTaskAction(e) {
    const target = e.target;
    const taskCard = target.closest('.task-card');
    
    if (!taskCard) return;
    
    const taskId = taskCard.dataset.taskId;
    
    // Delete button
    if (target.closest('.delete-btn')) {
        deleteTask(taskId);
    }
    
    // Edit button
    if (target.closest('.edit-btn')) {
        startEditTask(taskId, taskCard);
    }
    
    // Save edit button
    if (target.closest('.save-btn')) {
        saveEditTask(taskId, taskCard);
    }
}

/**
 * Handle task checkbox change
 */
function handleTaskCheckbox(e) {
    if (e.target.classList.contains('task-checkbox')) {
        const taskCard = e.target.closest('.task-card');
        const taskId = taskCard.dataset.taskId;
        toggleTaskComplete(taskId);
    }
}

/**
 * Handle keyboard events during task editing
 */
function handleTaskEditKeydown(e) {
    if (e.target.classList.contains('task-text-input')) {
        const taskCard = e.target.closest('.task-card');
        const taskId = taskCard.dataset.taskId;
        
        // Save on Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEditTask(taskId, taskCard);
        }
        
        // Cancel on Escape
        if (e.key === 'Escape') {
            cancelEditTask(taskCard);
        }
    }
}

// ============================================
// Task Operations
// ============================================

/**
 * Toggle task completion status
 */
function toggleTaskComplete(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateStatistics();
    }
}

/**
 * Delete a task
 */
function deleteTask(taskId) {
    if (confirm('Delete this task?')) {
        AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
        saveTasksToStorage();
        renderTasks();
        updateStatistics();
    }
}

/**
 * Start editing a task
 */
function startEditTask(taskId, taskCard) {
    // Cancel any existing edit
    if (AppState.editingTaskId) {
        const existingEditCard = document.querySelector(`[data-task-id="${AppState.editingTaskId}"]`);
        if (existingEditCard) {
            cancelEditTask(existingEditCard);
        }
    }
    
    AppState.editingTaskId = taskId;
    
    const task = AppState.tasks.find(t => t.id === taskId);
    const taskTextEl = taskCard.querySelector('.task-text');
    const editBtn = taskCard.querySelector('.edit-btn');
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-text-input';
    input.value = task.text;
    
    // Replace text with input
    taskTextEl.replaceWith(input);
    input.focus();
    input.select();
    
    // Change edit button to save button
    editBtn.innerHTML = '💾';
    editBtn.classList.remove('edit-btn');
    editBtn.classList.add('save-btn');
}

/**
 * Save edited task
 */
function saveEditTask(taskId, taskCard) {
    const input = taskCard.querySelector('.task-text-input');
    const newText = input.value.trim();
    
    if (!newText) {
        alert('Task cannot be empty');
        input.focus();
        return;
    }
    
    const task = AppState.tasks.find(t => t.id === taskId);
    
    if (task) {
        task.text = newText;
        saveTasksToStorage();
        AppState.editingTaskId = null;
        renderTasks();
    }
}

/**
 * Cancel task editing
 */
function cancelEditTask(taskCard) {
    AppState.editingTaskId = null;
    renderTasks();
}

// ============================================
// Rendering
// ============================================

/**
 * Render all tasks based on current filter and search
 */
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        DOM.tasksList.innerHTML = '';
        DOM.emptyState.classList.add('show');
        return;
    }
    
    DOM.emptyState.classList.remove('show');
    
    // Render tasks
    DOM.tasksList.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
}

/**
 * Get filtered tasks based on current filter and search query
 */
function getFilteredTasks() {
    let filtered = [...AppState.tasks];
    
    // Apply filter
    if (AppState.currentFilter === 'active') {
        filtered = filtered.filter(task => !task.completed);
    } else if (AppState.currentFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
    }
    
    // Apply search
    if (AppState.searchQuery) {
        filtered = filtered.filter(task => 
            task.text.toLowerCase().includes(AppState.searchQuery)
        );
    }
    
    return filtered;
}

/**
 * Create HTML for a single task
 */
function createTaskHTML(task) {
    const isEditing = AppState.editingTaskId === task.id;
    const completedClass = task.completed ? 'completed' : '';
    const priorityClass = `priority-${task.priority}`;
    
    // Format dates
    const createdDate = formatDate(task.createdAt);
    const dueDate = task.dueDate ? formatDate(task.dueDate) : null;
    const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
    
    return `
        <div class="task-card ${completedClass}" data-task-id="${task.id}">
            <div class="task-header">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
                >
                <div class="task-content">
                    ${isEditing 
                        ? `<input type="text" class="task-text-input" value="${escapeHtml(task.text)}">` 
                        : `<div class="task-text">${escapeHtml(task.text)}</div>`
                    }
                    <div class="task-meta">
                        <span class="priority-badge ${priorityClass}">
                            ${task.priority}
                        </span>
                        ${dueDate ? `
                            <span class="task-date ${isOverdue ? 'overdue' : ''}" style="${isOverdue ? 'color: var(--danger-color); font-weight: 600;' : ''}">
                                📅 Due: ${dueDate}
                            </span>
                        ` : ''}
                        <span class="task-date">
                            🕐 Created: ${createdDate}
                        </span>
                    </div>
                </div>
                <div class="task-actions">
                    <button 
                        type="button"
                        class="${isEditing ? 'task-btn save-btn' : 'task-btn edit-btn'}" 
                        aria-label="${isEditing ? 'Save task' : 'Edit task'}"
                    >
                        ${isEditing ? '💾' : '✏️'}
                    </button>
                    <button 
                        type="button"
                        class="task-btn delete-btn" 
                        aria-label="Delete task"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update statistics dashboard
 */
function updateStatistics() {
    const total = AppState.tasks.length;
    const active = AppState.tasks.filter(task => !task.completed).length;
    const completed = AppState.tasks.filter(task => task.completed).length;
    
    DOM.totalTasksEl.textContent = total;
    DOM.activeTasksEl.textContent = active;
    DOM.completedTasksEl.textContent = completed;
}

// ============================================
// Local Storage
// ============================================

/**
 * Save tasks to localStorage
 */
function saveTasksToStorage() {
    try {
        localStorage.setItem('taskflow_tasks', JSON.stringify(AppState.tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

/**
 * Load tasks from localStorage
 */
function loadTasksFromStorage() {
    try {
        const stored = localStorage.getItem('taskflow_tasks');
        if (stored) {
            AppState.tasks = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        AppState.tasks = [];
    }
}

/**
 * Save theme preference to localStorage
 */
function saveThemeToStorage(theme) {
    try {
        localStorage.setItem('taskflow_theme', theme);
    } catch (error) {
        console.error('Error saving theme to localStorage:', error);
    }
}

/**
 * Load theme from localStorage
 */
function loadThemeFromStorage() {
    try {
        const theme = localStorage.getItem('taskflow_theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    } catch (error) {
        console.error('Error loading theme from localStorage:', error);
    }
}

// ============================================
// Theme Management
// ============================================

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    saveThemeToStorage(newTheme);
    updateThemeIcon(newTheme);
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(theme) {
    const icon = DOM.themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============================================
// Utility Functions
// ============================================

/**
 * Generate unique ID for tasks
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Start Application
// ============================================

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
