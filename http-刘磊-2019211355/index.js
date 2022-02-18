const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const getModel = require("./model");
const cookieParser = require("cookie-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const User = getModel("User");

function isLogin(req, res, next) {
    const { username } = req.cookies;
    if (username) {
        next();
    } else {
        res.redirect("/login");
    }
}
app.get("/login", function (req, res) { //登录
    res.render("login");
})

app.post("/login", function (req, res) {
    let { username, password } = req.body;
    User.findOne({ username }, function (err, doc) {
        if (err) {
        }
        if (doc) {
            if (doc.password == password) {
                res.cookie("username", username);
                res.redirect("/main");
                res.end();
            } else {
                res.render("error");
            }
        } else {
            res.redirect("/register");
        }
    })
})

app.get("/register", function (req, res) {
    res.render("register");
})
app.post("/register", function (req, res) {
    let { username, password } = req.body;
    User.create({ username, password }, function (err, doc) {
        if (err) {
        }
        if (doc) { //注册成功
            res.cookie("username", username);
            res.redirect("/login");
            res.end();
        }
    })
})

app.get("/main", isLogin, function (req, res) {
    const { username } = req.cookies;
    res.render("main", { username })
})

app.get("/", isLogin, function (req, res) {
    res.redirect("/login")
})

app.listen(8000, () => {
    console.log("http://localhost:8000 已打开");
})