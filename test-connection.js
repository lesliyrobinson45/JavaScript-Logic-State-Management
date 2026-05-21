// Test MongoDB Connection
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', MONGODB_URI);
console.log('-----------------------------------\n');

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ SUCCESS! Connected to MongoDB\n');
        
        // Get database info
        const db = mongoose.connection.db;
        const admin = db.admin();
        
        console.log('📊 Database Information:');
        console.log('  Database Name:', db.databaseName);
        console.log('  Host:', mongoose.connection.host);
        console.log('  Port:', mongoose.connection.port);
        console.log('  Connection State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
        
        // List collections
        const collections = await db.listCollections().toArray();
        console.log('\n📁 Collections in database:');
        if (collections.length === 0) {
            console.log('  (No collections yet - database is empty)');
        } else {
            collections.forEach(col => {
                console.log(`  - ${col.name}`);
            });
        }
        
        // Count tasks
        const tasksCollection = db.collection('tasks');
        const taskCount = await tasksCollection.countDocuments();
        console.log('\n📝 Total Tasks:', taskCount);
        
        if (taskCount > 0) {
            console.log('\n📋 Sample Tasks:');
            const tasks = await tasksCollection.find().limit(3).toArray();
            tasks.forEach((task, index) => {
                console.log(`\n  Task ${index + 1}:`);
                console.log(`    Text: ${task.text}`);
                console.log(`    Priority: ${task.priority}`);
                console.log(`    Completed: ${task.completed}`);
                console.log(`    Created: ${task.createdAt}`);
            });
        }
        
        console.log('\n-----------------------------------');
        console.log('✅ MongoDB is fully connected and working!');
        
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ FAILED! Cannot connect to MongoDB');
        console.error('Error:', err.message);
        console.log('\n💡 Troubleshooting:');
        console.log('  1. Make sure MongoDB service is running');
        console.log('  2. Check your .env file has correct connection string');
        console.log('  3. Verify MongoDB is listening on port 27017');
        process.exit(1);
    });
