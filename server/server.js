

import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io'


// Create Express app and HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize socker.io server
export const io = new Server(server, {
    cors : {origin : "*"} // allow for all origin
});

// Store online users
export const userSockerMap = {}; // {userId : socketId}


// Socket.io connection handler
io.on("connection", (socket)=> {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if(userId) userSockerMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSockerMap));


    socket.on('disconnect', ()=>{
        console.log("User Disconnected", userId);
        delete userSockerMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSockerMap))
    })
})



// Middleware setup
app.use(express.json({limit : "4mb"}));
app.use(cors());


// Route setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use('/api/auth', userRouter)
app.use('/api/messages', messageRouter)

// connect to mongodb
await connectDB();


const PORT = process.env_PORT || 5000;
server.listen(PORT, ()=> console.log("Server is running on PORT : " + PORT));

