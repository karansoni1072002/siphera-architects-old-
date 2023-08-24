const Project = require("../models/projects");
const { cloudinary } = require("../cloudinary");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

module.exports.renderAdminLogin = (req, res) => {
    res.render('admin/adminLogin');
}

module.exports.renderAdminRegister = (req, res) => {
    res.render('admin/adminRegister');
}

module.exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: "Please fill all the details" })
        }

        const adminLogin = await Admin.findOne({ username: username });

        if (adminLogin) {
            const isMatch = await bcrypt.compare(password, adminLogin.password);

            const token = await adminLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            } else {
                res.json({ message: "Admin signin successful!" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.adminRegister = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const adminExist = await Admin.findOne({ username: username })

        if (adminExist) {
            return res.status(422).json({ error: "Username already registered" });
        }
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        res.status(201).json({ message: "Admmin registered successfully!" });
    } catch (err) {
        console.log(err);
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