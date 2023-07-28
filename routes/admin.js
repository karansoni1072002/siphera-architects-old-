const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const User = require("../models/user");
const passport = require("passport");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage })
// const upload = multer({ dest: 'uploads/' })

router.route('/admin/login')
    .get(admin.renderAdminLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login' }), admin.adminLogin)

router.route('/admin/dashboard')
    .get(admin.renderAdminDashboard)


router.route('/admin/newproject')
    .get(admin.renderAdminNewProject)
    .post(upload.array('image'), admin.createProject)
// .post(admin.createProject)

router.route('/admin/allprojects')
    .get(admin.renderAdminAllProjects)

router.route('/admin/:id')
    .get(admin.renderAdminProjectShow)



module.exports = router;