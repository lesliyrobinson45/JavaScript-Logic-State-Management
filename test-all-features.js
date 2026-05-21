// Complete Feature Test for TaskFlow
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';
const API_URL = 'http://localhost:3000/api';

console.log('🧪 TESTING ALL TASKFLOW FEATURES\n');
console.log('='.repeat(50));

let testsPassed = 0;
let testsFailed = 0;

// Test results
const results = {
    mongodb: '⏳ Testing...',
    server: '⏳ Testing...',
    createTask: '⏳ Testing...',
    getTasks: '⏳ Testing...',
    updateTask: '⏳ Testing...',
    deleteTask: '⏳ Testing...',
    clearCompleted: '⏳ Testing...',
    health: '⏳ Testing...'
};

async function testMongoDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        const db = mongoose.connection.db;
        await db.admin().ping();
        results.mongodb = '✅ PASS - MongoDB connected';
        testsPassed++;
        return true;
    } catch (error) {
        results.mongodb = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return false;
    }
}

async function testServer() {
    try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
            results.server = '✅ PASS - Server is running';
            testsPassed++;
            return true;
        } else {
            results.server = `❌ FAIL - Server returned ${response.status}`;
            testsFailed++;
            return false;
        }
    } catch (error) {
        results.server = `❌ FAIL - Cannot connect to server`;
        testsFailed++;
        return false;
    }
}

async function testHealthEndpoint() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        if (data.status === 'OK' && data.database === 'Connected') {
            results.health = '✅ PASS - Health endpoint working';
            testsPassed++;
            return true;
        } else {
            results.health = `❌ FAIL - Health check failed`;
            testsFailed++;
            return false;
        }
    } catch (error) {
        results.health = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return false;
    }
}

async function testCreateTask() {
    try {
        const newTask = {
            text: 'Test Task - ' + Date.now(),
            priority: 'high',
            dueDate: '2026-12-31'
        };
        
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        
        const data = await response.json();
        
        if (response.ok && data._id && data.text === newTask.text) {
            results.createTask = `✅ PASS - Task created (ID: ${data._id})`;
            testsPassed++;
            return data._id;
        } else {
            results.createTask = `❌ FAIL - Could not create task`;
            testsFailed++;
            return null;
        }
    } catch (error) {
        results.createTask = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return null;
    }
}

async function testGetTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        
        if (response.ok && Array.isArray(data)) {
            results.getTasks = `✅ PASS - Retrieved ${data.length} tasks`;
            testsPassed++;
            return true;
        } else {
            results.getTasks = `❌ FAIL - Could not get tasks`;
            testsFailed++;
            return false;
        }
    } catch (error) {
        results.getTasks = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return false;
    }
}

async function testUpdateTask(taskId) {
    if (!taskId) {
        results.updateTask = '⏭️  SKIP - No task ID';
        return false;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true, text: 'Updated Test Task' })
        });
        
        const data = await response.json();
        
        if (response.ok && data.completed === true) {
            results.updateTask = `✅ PASS - Task updated successfully`;
            testsPassed++;
            return true;
        } else {
            results.updateTask = `❌ FAIL - Could not update task`;
            testsFailed++;
            return false;
        }
    } catch (error) {
        results.updateTask = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return false;
    }
}

async function testDeleteTask(taskId) {
    if (!taskId) {
        results.deleteTask = '⏭️  SKIP - No task ID';
        return false;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            results.deleteTask = `✅ PASS - Task deleted successfully`;
            testsPassed++;
            return true;
        } else {
            results.deleteTask = `❌ FAIL - Could not delete task`;
            testsFailed++;
            return false;
        }
    } catch (error) {
        results.deleteTask = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return false;
    }
}

async function testClearCompleted() {
    try {
        const response = await fetch(`${API_URL}/tasks/completed/all`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            results.clearCompleted = `✅ PASS - Cleared ${data.deletedCount} completed tasks`;
            testsPassed++;
            return true;
        } else {
            results.clearCompleted = `❌ FAIL - Could not clear completed tasks`;
            testsFailed++;
            return false;
        }
    } catch (error) {
        results.clearCompleted = `❌ FAIL - ${error.message}`;
        testsFailed++;
        return false;
    }
}

async function runAllTests() {
    console.log('\n1️⃣  Testing MongoDB Connection...');
    const mongoConnected = await testMongoDB();
    
    console.log('2️⃣  Testing Server...');
    const serverRunning = await testServer();
    
    console.log('3️⃣  Testing Health Endpoint...');
    await testHealthEndpoint();
    
    console.log('4️⃣  Testing Get Tasks...');
    await testGetTasks();
    
    console.log('5️⃣  Testing Create Task...');
    const taskId = await testCreateTask();
    
    console.log('6️⃣  Testing Update Task...');
    await testUpdateTask(taskId);
    
    console.log('7️⃣  Testing Delete Task...');
    await testDeleteTask(taskId);
    
    console.log('8️⃣  Testing Clear Completed...');
    await testClearCompleted();
    
    // Print results
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST RESULTS\n');
    
    Object.entries(results).forEach(([test, result]) => {
        console.log(`${result}`);
    });
    
    console.log('\n' + '='.repeat(50));
    console.log(`\n✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
    
    if (testsFailed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Your project is working perfectly!\n');
    } else {
        console.log('\n⚠️  Some tests failed. Check the results above.\n');
    }
    
    await mongoose.connection.close();
    process.exit(testsFailed > 0 ? 1 : 0);
}

runAllTests().catch(error => {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
});
