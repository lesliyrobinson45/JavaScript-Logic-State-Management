# TaskFlow - MongoDB Setup Guide

## 🚀 Quick Start

### Option 1: MongoDB Atlas (Free Cloud Database - Recommended)

1. **Sign up for MongoDB Atlas** (100% Free)
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region (closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `taskflow_user`
   - Password: Create a strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://taskflow_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env File**
   - Open `.env` file in your project
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://taskflow_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority`

### Option 2: Local MongoDB (For Offline Development)

1. **Install MongoDB Community Edition**
   - Windows: https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: Follow official docs

2. **Start MongoDB Service**
   - Windows: MongoDB runs as a service automatically
   - Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`

3. **Use Default Connection**
   - The `.env` file is already configured for local MongoDB
   - No changes needed!

## 🏃 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
📊 API available at http://localhost:3000/api/tasks
```

### 3. Open the Application
- Open your browser
- Go to: http://localhost:3000
- Start managing tasks!

## 🔧 Troubleshooting

### Error: "Failed to load tasks from server"
- **Solution**: Make sure the server is running (`npm start`)
- Check if you see the server messages in terminal

### Error: "MongoDB connection error"
- **Solution 1**: Check your `.env` file has correct connection string
- **Solution 2**: Verify your MongoDB Atlas IP whitelist
- **Solution 3**: Check username/password are correct

### Error: "EADDRINUSE: address already in use"
- **Solution**: Port 3000 is already in use
- Change PORT in `.env` file to 3001 or another port

### Tasks not saving
- **Solution**: Check browser console (F12) for errors
- Verify server is running and connected to MongoDB

## 📁 Project Structure

```
project-folder/
│
├── index.html          # Frontend HTML
├── style.css           # Frontend styles
├── script.js           # Frontend with API integration
├── script-local.js     # Original localStorage version (backup)
├── server.js           # Backend Express server
├── package.json        # Node.js dependencies
├── .env               # Environment variables (MongoDB connection)
├── .gitignore         # Git ignore file
├── README.md          # Project documentation
└── SETUP.md           # This setup guide
```

## 🔄 Switching Between localStorage and MongoDB

### Use MongoDB Version (Current)
```html
<!-- In index.html -->
<script src="script.js"></script>
```

### Use localStorage Version (Offline)
```html
<!-- In index.html -->
<script src="script-local.js"></script>
```

## 🌐 API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `DELETE /api/tasks/completed/all` - Delete all completed tasks
- `GET /api/health` - Check server status

## 🎯 Testing the API

### Using Browser
Visit: http://localhost:3000/api/health

### Using curl
```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"text":"Test task","priority":"high"}'
```

## 💡 Tips

1. **Keep server running** - Don't close the terminal while using the app
2. **Check server logs** - Errors will appear in the terminal
3. **Use MongoDB Atlas** - Free tier is perfect for this project
4. **Backup data** - MongoDB Atlas has automatic backups

## 🆘 Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Express.js Docs: https://expressjs.com/
- Mongoose Docs: https://mongoosejs.com/

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] MongoDB Atlas cluster created OR local MongoDB running
- [ ] `.env` file configured with connection string
- [ ] Server starts without errors (`npm start`)
- [ ] Browser shows the app at http://localhost:3000
- [ ] Can create, edit, and delete tasks
- [ ] Tasks persist after page refresh

---

**You're all set! Enjoy TaskFlow with MongoDB! 🎉**
