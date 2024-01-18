const Sale = require("../store/sale");
const User = require("../store/user");
const Brand = require("../store/brand");
const Model = require("../store/model");

module.exports.index = async (req, res, next) => {
  const name = "Reports";
  if (!req.session.user_id) {
    res.redirect("login");
  } else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  }else {
    const sales = await Sale.find({});
    const models = await Model.find({});
    const brands = await Brand.find({});
    const employees = await User.find({});
    res.render("report", {
      name,
      models: JSON.stringify(models),
      sales: JSON.stringify(sales),
      brands,
      employees: JSON.stringify(employees)
    });
  }
}