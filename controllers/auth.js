const User = require("../store/user");

module.exports.post = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user) {
    const pass = await bcrypt.compare(password, user.password);
    if (pass) {
      req.session.user_id = user._id;
      req.session.position = user.position
        req.session.user = user
      if (req.session.position == "Manager") {
        res.redirect("home");
      } else {
          res.redirect("dashboard");
      }
    } else {
      req.flash("failed", "Invalid Username or Password");
      res.redirect("/login");
    }
  } else {
    req.flash("failed", "Invalid Username or Password");
    res.redirect("/login");
  }
}

module.exports.get =  (req, res) => {
  res.render("Login", { messages: req.flash("failed") });
}


module.exports.logout = (req, res) => {
  req.session.user_id = null;
  req.session.position = null;
  req.session = null;
  res.redirect("/login");
}