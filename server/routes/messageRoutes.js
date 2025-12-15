
import express from 'express';
import { getMessages, getUsersForSiderbar, markMessageAsSeen } from '../controllers/messageController.js';
import { proctedRoute } from '../middleware/auth.js';



const messageRouter = express.Router();

messageRouter.get('/users', proctedRoute, getUsersForSiderbar);
messageRouter.get("/:id", proctedRoute, getMessages);
messageRouter.put("mark/:id", proctedRoute, markMessageAsSeen);


export default messageRouter;