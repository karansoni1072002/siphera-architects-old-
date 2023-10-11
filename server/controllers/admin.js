const Project = require("../models/projects");
const { cloudinary } = require("../cloudinary");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const Category = require("../models/category");
const User = require("../models/user");

//------------------authorization

module.exports.authorization = (req, res) => {
    try {
        res.status(200).json('Authorized')
    } catch (error) {
        res.status(422).json(error)
    }
}

//------------------register and login

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
        console.log(err.message);
        console.log(err);
    }
}

module.exports.adminLogout = async (req, res) => {
    try {
        console.log(req.token)
        console.log(req.rootUser);
        req.rootUser.tokens = req.rootUser.tokens.filter((currElement) => {
            return currElement.token !== req.token
        })
        res.clearCookie("jwtoken");
        console.log('logout successfully')
        await req.rootUser.save();
        res.status(200).json({ 'result': 'Logged out sucessfully!' });
    } catch (error) {
        res.status(422).json(error);
    }
}

//-------------------Dashboard------------------

module.exports.renderAdminDashboard = (req, res) => {
    res.render('admin/adminDashboard');
}

//----------------Project Functions-----------------

module.exports.renderAdminNewProject = (req, res) => {
    res.render('admin/adminNewProject');
}

module.exports.renderAdminAllProjects = async (req, res) => {
    const projects = await Project.find({});
    res.render('admin/adminAllProjects', { projects });
}

module.exports.getProjectsData = async (req, res) => {
    try {
        const projects = await Project.find({})
        res.status(201).json(projects)
    } catch (err) {
        res.status(422).json({ "message": "Error in sending the data" })
    }
}

module.exports.createProject = async (req, res, next) => {
    const projectData = new Project(req.body);

    const fileData = req.file;
    console.log(fileData);
    const fileArray = [{
        url: fileData.path, // Assuming the URL is stored in the 'path' property
        filename: fileData.filename
    }];
    projectData.images = fileArray;
    console.log(projectData);
    try {
        await projectData.save();
        res.status(201).json({ "status": true, "result": "New project successfully created!" })
    } catch (error) {
        console.log(error);
        res.status(422).json({ "status": false, "result": "New project creation failed :(" })
    }

    // res.redirect(`/admin/${projectData._id}`)
    // res.redirect(`/admin/dashboard`)
}

// module.exports.renderAdminProjectShow = async (req, res) => {
//     const project = await Project.findById(req.params.id);
//     res.render('admin/adminProjectShow', { project })
// }

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
    // const { id } = req.params;
    // const project = await Project.findById(id);
    // if (project.images) {
    //     for (let image of project.images) {
    //         await cloudinary.uploader.destroy(image.filename);
    //     }
    // }
    // await Project.findByIdAndDelete(id);
    // res.redirect('/admin/dashboard');

    const projectId = req.body.projectId;
    console.log(projectId);
    try {
        const project = await Project.findById(projectId);
        if (project.images) {
            for (let image of project.images) {
                await cloudinary.uploader.destroy(image.filename);
            }
        }
        await Project.findByIdAndDelete(projectId);
        res.status(201).json({ "result": "Project Deleted Successfully!" })
    } catch (error) {
        res.status(422).json({ "error": error });
    }
}

//------------Category Functions----------------

module.exports.getCategoriesData = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(201).json(categories)
    } catch (err) {
        res.status(422).json({ "message": "Error in sending the data" })
    }
    // res.send('Hello from backend!');
}

module.exports.createCategory = async (req, res, next) => {
    const categoryData = new Category(req.body);
    if (!req.body.title || !req.body.description) {
        return res.sendStatus(422).json({ "result": "Please fill all the details" })
    }
    const fileData = req.file;
    const fileArray = [{
        url: fileData.path, // Assuming the URL is stored in the 'path' property
        filename: fileData.filename
    }];
    console.log(fileArray);
    categoryData.images = fileArray;
    console.log(categoryData);
    try {
        await categoryData.save();
        return res.status(201).json({ "result": "New category created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(422).json({ "result": "Category creation failed" })
    }
}

module.exports.adminUpdateCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { ...req.body.category });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    category.images.push(...imgs);
    await category.save();
    if (req.body.deleteImage) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await category.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    res.redirect(`/admin/${category.title}`)
}

module.exports.adminDeleteCategory = async (req, res) => {
    const categoryId = req.body.categoryId;
    console.log(categoryId);
    try {
        const category = await Category.findById(categoryId);
        if (category.images) {
            for (let image of category.images) {
                await cloudinary.uploader.destroy(image.filename);
            }
        }
        await Category.findByIdAndDelete(categoryId);
        res.status(201).json({ "result": "Category Deleted Successfully!" })
    } catch (error) {
        res.status(422).json({ "error": error });
    }
}

