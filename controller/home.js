const { default: mongoose } = require("mongoose");
const Issue = require("../models/Issue");
const Project = require("../models/Project");

//getting home page with project details
exports.getProjectList = async (req, res) => {
    const projects = await Project.find({});
    res.render("home", {
        projects,
        title: "home",
    });
};

//get create-project page
exports.getProject = async (req, res) => {
    res.render("createProject", {
        title: "Create Project",
    });
};

//post project data
exports.postProject = async (req, res) => {
    const { title, description, author } = req.body;

    const newProject = new Project({
        title,
        description,
        author,
    });

    await newProject.save();

    res.redirect("/");
};

//get project details page
exports.getProjectDetailPage = async (req, res) => {
    const id = req.params.projectId;
    const project = await Project.findOne({ _id: mongoose.Types.ObjectId(id) });
    const issues = await Issue.find({ projectId: mongoose.Types.ObjectId(id) });

    res.render("projectDetail", {
        title: "Project Details",
        project,
        issues,
    });
};

//get create issues page
exports.createIssue = async (req, res) => {
    const id = req.params.projectId;
    res.render("createIssue", {
        title: "Create Issue",
        id,
    });
};

//post issue data
exports.postIssue = async (req, res) => {
    const { title, description, author, label } = req.body;
    const id = req.params.projectId;
    const newIssue = new Issue({
        projectId: mongoose.Types.ObjectId(id),
        title,
        description,
        author,
        label,
    });

    await newIssue.save();

    res.redirect("/project-details/" + id);
};

//filter by title
exports.filterByTitle = async (req, res) => {
    const { title, description } = req.body;
    const id = req.params.projectId;
    const project = await Project.findOne({ _id: mongoose.Types.ObjectId(id) });

    const issues = await Issue.find({ projectId: mongoose.Types.ObjectId(id) });

    const filteredIssues = [];

    for (let issue of issues) {
        if (
            issue.title.toLowerCase().includes(title.toLowerCase()) &&
            issue.description.toLowerCase().includes(description.toLowerCase())
        ) {
            filteredIssues.push(issue);
        }
    }

    res.render("projectDetail", {
        title: "Project Details",
        project,
        issues: filteredIssues,
    });
};

//filter by author
exports.filterByAuthor = async (req, res) => {
    const { author } = req.body;
    const id = req.params.projectId;
    const project = await Project.findOne({ _id: mongoose.Types.ObjectId(id) });

    const issues = await Issue.find({ projectId: mongoose.Types.ObjectId(id) });

    const filteredIssues = [];

    for (let issue of issues) {
        if (issue.author.toLowerCase().includes(author.toLowerCase())) {
            filteredIssues.push(issue);
        }
    }

    res.render("projectDetail", {
        title: "Project Details",
        project,
        issues: filteredIssues,
    });
};

//filter by label
exports.filterByLabel = async (req, res) => {
    let label = req.body.label;
    const id = req.params.projectId;
    const project = await Project.findOne({ _id: mongoose.Types.ObjectId(id) });

    const issues = await Issue.find({ projectId: mongoose.Types.ObjectId(id) });

    const filteredIssues = new Set();

    let array = [];

    if (typeof label == 'string') {
        array.push(label);
        label = array;
    }

    for (let i of label) {
        for (let j of issues) {
            if (j.label.includes(i)) {
                filteredIssues.add(j);
            }
        }
    }

    res.render("projectDetail", {
        title: "Project Details",
        project,
        issues: filteredIssues,
    });
};

//clear filter
exports.clearFilter = async (req, res) => {
    const id = req.params.projectId;

    res.redirect("/project-details/" + id);
};
