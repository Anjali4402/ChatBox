
import express from 'express';
import { getMessages, getUsersForSiderbar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';
import { proctedRoute } from '../middleware/auth.js';



const messageRouter = express.Router();

messageRouter.get('/users', proctedRoute, getUsersForSiderbar);
messageRouter.get("/:id", proctedRoute, getMessages);
messageRouter.put("mark/:id", proctedRoute, markMessageAsSeen);
messageRouter.post("/send/:id", proctedRoute, sendMessage )


export default messageRouter;