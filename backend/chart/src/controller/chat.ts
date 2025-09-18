import { Response } from "express";
import TryCatch from "../config/TryCatch.js";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
import { Chat } from "../models/Chat.js";


export const createNewChat = TryCatch(async(req: AuthenticatedRequest, res)=>{
    const userId = req.user?._id;
    const {otherUserId} = req.body;

    if (!otherUserId) {
        res.status(400).json({
            message: "Other userid is required", 
        });
        return
    }

    const existingChat = await Chat.findOne({
        users: {$all:[userId, otherUserId], $size: 2},
    });

    if (existingChat) {
        res.json({
            message: "Chat already exists",
            chatId: existingChat._id,
        });
        return
    }

    const newChat = await Chat.create({
        users: [userId, otherUserId],
    })

    res.status(201).json({
        message: "New Chat Created",
        chatId: newChat._id
    })
})