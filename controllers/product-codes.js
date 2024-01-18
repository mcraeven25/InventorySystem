const Code = require("../store/code");
const Brand = require("../store/brand");
const Model = require("../store/model");
const Variant = require("../store/variant");
const Color = require("../store/color");
const Price = require("../store/price");
const Phone = require("../store/phone");

module.exports.index = async (req, res, next) => {
  const name = "Product Codes";
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const codes = await Code.find({});
    const user = req.session.position
    res.render("codes", { name, codes: JSON.stringify(codes),user,products:codes});
  }
}
module.exports.show = async (req, res, next) => {
  const name = "Product Codes";
  if (!req.session.user_id) {
    res.redirect("login");
  }else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  } else {
    const { id } = req.params;
    const stocks = await Code.findOne({ code: id })
     const brands = await Brand.find({});
    const models = await Model.find({});
    const variants = await Variant.find({});
    const colors = await Color.find({});
    const prices = await Price.find({});
    const phones = await Phone.find({});
    const css = "stock-edit"
    res.render("edits/edit-stocks", { stocks, name, css, updated: req.flash("update-stock"), brands,
      models: JSON.stringify(models),
      variants: JSON.stringify(variants),
      colors: JSON.stringify(colors),
      prices: JSON.stringify(prices),
      phones: JSON.stringify(phones), })
  }
}