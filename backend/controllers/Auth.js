const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(supportedTypes, type) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.signUp = async (req, res) => {
    try {
        const { userName, firstName, lastName, email } = req.body;

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const image = req.files.imageFile;
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = image.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(supportedTypes, fileType)) {
            return res.status(400).json({ success: false, message: "File format not supported" });
        }

        const response = await uploadFileToCloudinary(image, "profile_images");

        if (!userName || !firstName || !lastName || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUserByUsername = await User.findOne({ userName });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already taken" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "User already exists, please log in" });
        }

        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            image: response.secure_url
        });

        res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Error while user signup", error: e.message });
    }
};

exports.loginUsingEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email does not exist, sign up first" });
        }

        const payload = {
            userName: user.userName,
            email: user.email,
            id: user._id
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        const options = { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true };

        res.cookie("token", token, options).status(200).json({ success: true, token, user, message: "Logged in successfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Login failed, please try again", error: e.message });
    }
};

exports.loginUsingUserName = async (req, res) => {
    try {
        const { userName } = req.body;
        if (!userName) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ success: false, message: "Username does not exist, sign up first" });
        }

        const payload = {
            userName: user.userName,
            email: user.email,
            id: user._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        const options = { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true };

        res.cookie("token", token, options).status(200).json({ success: true, token, user, message: "Logged in successfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Login failed, please try again", error: e.message });
    }
};



exports.getAllUserNames = async (req, res) => {
    try {
        const users = await User.find({}, "userName").lean(); 
        const usernameList = users.map(user => user.userName); 

        res.json({ success: true, usernames: usernameList });
    } catch (e) {
        console.error("Error fetching usernames:", e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};