const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');
const MongoStore = require('connect-mongo');
const nodemailer = require('nodemailer')
const cron = require('node-cron');
// require('dotenv').config()

const code = require('./controllers/product-codes')
const dashboard = require('./controllers/dashboard')
const device = require('./controllers/device')
const report = require('./controllers/report')
const returned = require('./controllers/returned')
const sale = require('./controllers/sales')
const settings = require('./controllers/settings')
const stock = require('./controllers/stocks')
const stockReport = require('./controllers/stocks-report')
const user = require('./controllers/user')
const auth = require('./controllers/auth')



const User = require("./store/user");
const Brand = require("./store/brand");
const Counter = require("./store/counter");
const Model = require("./store/model");
const Variant = require("./store/variant");
const Color = require("./store/color");
const Code = require("./store/code");
const Price = require("./store/price");
const Phone = require("./store/phone");
const Device = require("./store/device");
const Returned = require("./store/returned");
const Sale = require("./store/sale");
const DeletedBrand = require("./store/deleted-brand");
const DeletedModel = require("./store/deleted-model");
const DeletedVariant = require("./store/deleted-variant");
const DeletedColor = require("./store/deleted-color");
const DeletedPrice = require("./store/deleted-price");
const DeletedDevice = require("./store/deleted-device");
const DeletedEmployee = require("./store/deleted-employees");
const DeletedCode= require("./store/deleted-code");


// mongodb://localhost:27017/Store


const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

const secret = process.env.SECRET ||'secret'
app.use(
  session({secret:secret,store: MongoStore.create({ mongoUrl: url,touchAfter: 24 *60 * 60 }),
   resave: true, saveUninitialized: true })
);

app.use(flash());
app.use(methodOverride('_method'));

app.get("/", async (req, res, next) => {
  if (req.session.user_id) {
    res.redirect("login");
  }
});

app.get("/dashboard", dashboard.employee);

app.get("/product-codes", code.index);
 
app.get("/device", device.index);

app.get("/employee-devices", device.index);

app.get("/employee-sale", sale.employee);

app.get("/employee-stock", stock.employee);

app.get("/home", dashboard.index);

app.get("/login", auth.get);

app.get("/report", report.index);

app.get("/sale", sale.index);

app.get("/returned", returned.index);

app.get("/returned/:id", returned.show)

app.get("/sale/:id", sale.show)

app.get("/sales/:id", sale.edit)

app.get("/setting", settings.index);

app.get("/product-codes/:id", code.show)

app.get("/stock-report", stockReport.index)

app.get("/user", user.index );

app.get("/user/:id", user.show)

app.post("/login",auth.post);

app.post("/logout", );

app.post("/user", user.post);

app.post("/stock", stock.post); 

app.post("/returned", returned.post);

app.post("/sale", sale.post);

app.post("/employee-sale", sale.employeePost);

app.post("/setting", settings.post)

app.put("/setting", settings.update)

app.put("/returned", returned.update)

app.put("/user/:id", user.update)

app.put("/sales/edit", sale.update)

app.put("/returned/:id", returned.returnedUpdate)

app.put("/stock/:id", stock.update)

app.delete("/user/:id", user.delete)

app.delete("/setting", settings.delete)

app.use((req, res) => res.status(404).render("route-catch"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port 3000");
});
