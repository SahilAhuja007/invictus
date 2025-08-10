// server.js
const express = require("express");
const http = require("http");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

const setupSocket = require("./socket");
const { dbconnect } = require("./config/database");
const { connectCloudinary } = require("./config/cloudinary");
const Router = require("./routes/route");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// Database & Cloudinary Connection
(async () => {
  try {
    await dbconnect();
    console.log("✅ Database connected successfully");

    await connectCloudinary();
    console.log("✅ Cloudinary connected successfully");

    // Start the server only after successful connections
    server.listen(PORT, () =>
      console.log(`🚀 Server started at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database or Cloudinary connection failed:", error);
    process.exit(1);
  }
})();

// Routes
app.use("/papper", Router);

// Initialize Socket.IO
setupSocket(server);
