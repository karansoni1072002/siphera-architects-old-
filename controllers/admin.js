const User = require("../models/user");
const Project = require("../models/projects");
const { cloudinary } = require("../cloudinary");

module.exports.renderAdminLogin = (req, res) => {
    res.render('admin/adminLogin');
}

module.exports.adminLogin = (req, res) => {
    res.redirect('/admin/dashboard');
}

module.exports.renderAdminRegister = (req, res) => {
    res.render('admin/adminRegister');
}

module.exports.adminRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/admin/dashboard');
        })
    } catch (e) {
        res.redirect('/register');
    }
}

module.exports.adminLogout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
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
    const projectData = new Project(req.body.project);
    projectData.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    console.log(projectData);
    await projectData.save();
    res.redirect(`/admin/${projectData._id}`)
    // res.redirect(`/admin/dashboard`)
}

module.exports.renderAdminProjectShow = async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.render('admin/adminProjectShow', { project })
}

module.exports.renderAdminProjectEdit = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.render('admin/adminUpdateProject', { project })
}

module.exports.adminUpdateProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, { ...req.body.project });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    project.images.push(...imgs);
    await project.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await project.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    res.redirect(`/admin/${project._id}`)
}

module.exports.adminDeleteProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project.images) {
        for (let image of project.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
    }
    await Project.findByIdAndDelete(id);
    res.redirect('/admin/dashboard');
}