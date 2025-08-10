const Message = require('../models/Chat.model');

exports.sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;

        if (!sender || !receiver || !content) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const message = await Message.create({ sender, receiver, content });

        res.status(201).json({ success: true, message: "Message sent", data: message });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending message", error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { user1, user2 } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort("createdAt");

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching messages", error: error.message });
    }
};
