const User = require("../models/user");
const bcrypt = require("bcryptjs");

// module.exports.userRegister = async (req, res) => {
//     const { firstname, lastname, mobilenumber, email, password } = req.body;
//     console.log(req.body);
//     if (!firstname || !lastname || !mobilenumber || !email || !password) {
//         return res.status(422).json({ error: "Please fill all the fields" });
//     }

//     try {
//         const userExist = await User.findOne({ email: email })

//         if (userExist) {
//             return res.status(422).json({ error: "Email already registered" });
//         }
//         const newUser = new User({ firstname, lastname, mobilenumber, email, password });
//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports.userLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(422).json({ error: "Please fill all the details" })
//         }

//         const userLogin = await User.findOne({ email: email });

//         if (userLogin) {
//             const isMatch = await bcrypt.compare(password, userLogin.password);

//             const token = await userLogin.generateAuthToken();
//             console.log(token);

//             res.cookie("jwtoken", token, {
//                 expires: new Date(Date.now() + 25892000000),
//                 httpOnly: true
//             });

//             if (!isMatch) {
//                 res.status(400).json({ error: "Invalid Credentials" });
//             } else {
//                 res.json({ message: "User signin successful!" });
//             }
//         } else {
//             res.status(400).json({ error: "Invalid Credentials" });
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports.userLogout = (req, res) => {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// }