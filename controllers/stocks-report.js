const Brand = require("../store/brand");
const Model = require("../store/model");
const Variant = require("../store/variant");
const Color = require("../store/color");
const Code = require("../store/code");
const Price = require("../store/price");
const Phone = require("../store/phone");
const Device = require("../store/device");

module.exports.index = async (req, res, next) => {
  const name = "Stock Reports";
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const phones = await Phone.find({});
    const brands = await Brand.find({});
    const models = await Model.find({});
    const variants = await Variant.find({});
    const colors = await Color.find({});
    const devices = await Device.find({});
    const  codes = await Code.find({});
    const user = req.session.position
    
    res.render("stock-report", {
      name,codes,
      phones: JSON.stringify(phones),
      models: JSON.stringify(models),
      brands,
      branding: JSON.stringify(brands),
      variants: JSON.stringify(variants),
      colors: JSON.stringify(colors),
      devices: JSON.stringify(devices),
      user,
      messages: req.flash("success"),
    });
  }
}