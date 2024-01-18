const Code = require("../store/code");
const Sale = require("../store/sale");
const User = require("../store/user");
const Brand = require("../store/brand");

module.exports.employee = async (req, res, next) => {
  const name = "Dashboard";
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const sales = await Sale.find({});
    const users = await User.find({});
    const codes = await Code.find({});
    const user = req.session.user
     const {id} = req.session.user
    res.render("employees/user-dashboard", {codes, name, sales: JSON.stringify(sales), user, id, users: JSON.stringify(users) });
    
  }
}

module.exports.index =  async (req, res, next) => {
  const name = "Home";
  if (!req.session.user_id) {
    res.redirect("login");
  } else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  }
  else {
    
    const sales = await Sale.find({});
    const brands = await Brand.find({});
    const stocks = await Phone.find({});
   
    res.render("dashboard", {
      name, brands, sales: JSON.stringify(sales),
      branding: JSON.stringify(brands), stocks: JSON.stringify(stocks)
    });
  }
}