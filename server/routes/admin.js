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

//-------------Authorization Route----------------
router.route('/admin/authorization')
    .get(isLoggedIn, admin.authorization)

//-------------Dashboard Routes----------------
router.get('/admin', (req, res) => {
    res.redirect('/admin/login');
})

router.route('/admin/dashboard')
    .get(isLoggedIn, admin.renderAdminDashboard)

//--------------Login and Register Routes---------------
router.route('/admin/login')
    .post(admin.adminLogin)

router.route('/admin/logout')
    .get(isLoggedIn, catchAsync(admin.adminLogout))

router.route('/admin/register')
    .post(isLoggedIn, catchAsync(admin.adminRegister))

//---------------Project Routes------------------------

router.route('/admin/getprojects')
    .get(isLoggedIn, admin.getProjectsData)

router.route('/admin/createproject')
    .post(isLoggedIn, upload.single('image'), catchAsync(admin.createProject))

router.route('/admin/project/:project/delete')
    .post(isLoggedIn, catchAsync(admin.adminDeleteProject))
// router.route('/admin/:id')
//     .get(isLoggedIn, catchAsync(admin.renderAdminProjectShow))
//     .put(isLoggedIn, upload.array('image'), catchAsync(admin.adminUpdateProject))
//     .delete(isLoggedIn, catchAsync(admin.adminDeleteProject))

// router.route('/admin/:id/edit')
//     .get(isLoggedIn, catchAsync(admin.renderAdminProjectEdit))

//---------------Category Routes----------------
router.route('/admin/getcategories')
    .get(isLoggedIn, admin.getCategoriesData)

router.route('/admin/createcategory')
    .post(isLoggedIn, upload.single('image'), admin.createCategory)

router.route('/admin/category/:category/delete')
    .post(isLoggedIn, catchAsync(admin.adminDeleteCategory))
// .post((req, res) => {
//     // res.send(req.body);
//     console.log(req.body);
//     console.log(req.files);
// })

// router.route('/admin/:category')
//     .put(isLoggedIn, upload.single('image'), catchAsync(admin.adminUpdateCategory))
//     .delete(isLoggedIn, catchAsync(admin.adminDeleteCategory))




module.exports = router;