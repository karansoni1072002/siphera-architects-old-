const User = require("../models/user");
const Project = require("../models/projects");

module.exports.renderAdminLogin = (req, res) => {
    res.render('admin/adminLogin');
}

module.exports.adminLogin = (req, res) => {
    res.redirect('/admin/dashboard');
}

module.exports.renderAdminDashboard = (req, res) => {
    res.render('admin/adminDashboard');
}

module.exports.renderAdminNewProject = (req, res) => {
    res.render('admin/adminNewProject');
}

module.exports.renderAdminAllProjects = async (req, res) => {
    const projects = await Project.find({});
    res.render('admin/adminAllProjects', { projects });
}

module.exports.createProject = async (req, res, next) => {
    res.send(req.body);
    // const projectData = new Project(req.body.project);
    // projectData.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    console.log(req.file)
    res.send(projectData);
    // await projectData.save();
    // res.redirect(`/admin/${project._id}`)
    res.redirect(`/admin/dashboard`)
}
