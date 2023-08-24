const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verofyToken = jwt.verify(token, process.env.SECRET_KEY);

        rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) { throw new Error("User not Found") }

        req.token = token;
        req.rootUser = rootUser;
        req.User._id = rootUser._id;

        next();
    } catch (err) {
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
}