const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    label: [{ type: String }],
    projectId: { type: mongoose.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Issue", IssueSchema);
