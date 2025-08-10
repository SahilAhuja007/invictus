const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    researchPapers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResearchPaper"
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
