const mongoose = require("mongoose");

const researchPaperSchema = new mongoose.Schema({
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    title: {
        type: String,
        required: true,
        trim: true
    },
    info: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    topic: {
        type: String,  // ✅ Now allows any string value
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ResearchPaper", researchPaperSchema);
