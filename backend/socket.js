// socket.js
const { Server } = require("socket.io");
const User = require("./models/User"); 
const Message = require('./models/Chat.model');

module.exports = function setupSocket(server) {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", async (socket) => {
        console.log("✅ User connected:", socket.id);

        // 🔹 Join a room using `userId`
        socket.on("join", async (userName) => {
            try {
                const user = await User.findOne({ userName });
                if (!user) {
                    return socket.emit("error", { success: false, message: "User not found" });
                }
                socket.join(user._id.toString()); // Join a room based on userId
                console.log(`📌 ${userName} joined room: ${user._id}`);
            } catch (error) {
                console.error("Error joining room:", error);
                socket.emit("error", { success: false, message: "Join room failed" });
            }
        });

        socket.on("sendMessage", async ({ sender, receiver, content }) => {
            try {
                // 🔹 Check if sender and receiver exist in the database
                const senderUser = await User.findOne({ userName: sender });
                const receiverUser = await User.findOne({ userName: receiver });

                if (!senderUser || !receiverUser) {
                    return socket.emit("error", {
                        success: false,
                        message: "Sender or receiver not found",
                    });
                }

                // 🔹 Store the message in the database
                const message = await Message.create({
                    sender: senderUser._id,
                    receiver: receiverUser._id,
                    content,
                });

                // 🔹 Emit the message to the receiver (ensure receiver has joined their room)
                io.to(receiverUser._id.toString()).emit("receiveMessage", {
                    sender: senderUser.userName,
                    receiver: receiverUser.userName,
                    content: message.content,
                    timestamp: message.createdAt,
                });

                // 🔹 Send confirmation back to sender
                socket.emit("messageSent", {
                    success: true,
                    message: "Message sent successfully",
                });

            } catch (error) {
                console.error("Error sending message:", error);
                socket.emit("error", {
                    success: false,
                    message: "Failed to send message",
                    error: error.message,
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
        });
    });
};
