const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const User = require("../models/user");
const passport = require("passport");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage })
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
// const upload = multer({ dest: 'uploads/' })

router.get('/admin', (req, res) => {
    res.redirect('/admin/login');
})
router.route('/admin/login')
    .post(admin.adminLogin)

router.route('/admin/logout')
    .get(admin.adminLogout)

router.route('/admin/register')
    .post(admin.adminRegister)

router.route('/admin/dashboard')
    .get(isLoggedIn, admin.renderAdminDashboard)

router.route('/admin/newproject')
    .get(isLoggedIn, admin.renderAdminNewProject)
    .post(isLoggedIn, upload.array('image'), catchAsync(admin.createProject))

router.route('/admin/allprojects')
    .get(isLoggedIn, catchAsync(admin.renderAdminAllProjects))

router.route('/admin/:id')
    .get(isLoggedIn, catchAsync(admin.renderAdminProjectShow))
    .put(isLoggedIn, upload.array('image'), catchAsync(admin.adminUpdateProject))
    .delete(isLoggedIn, catchAsync(admin.adminDeleteProject))

router.route('/admin/:id/edit')
    .get(isLoggedIn, catchAsync(admin.renderAdminProjectEdit))

module.exports = router;