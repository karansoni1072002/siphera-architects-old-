require('dotenv').config();
const express = require("express")
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const path = require("path");
const methodOverride = require("method-override");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");

const app = express();



mongoose.connect('mongodb://localhost:27017/siphera-architects');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const adminRoutes = require("./routes/admin");

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", adminRoutes);

app.get("/", (req, res) => {
    res.render("home");
})

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = "Oh no, something went wrond!"
//     res.status(statusCode).render('error', { err });
// })


app.listen(3000, () => {
    console.log("serving on port 3000!");
})