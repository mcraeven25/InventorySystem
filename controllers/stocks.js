const Brand = require("../store/brand");
const Model = require("../store/model");
const Variant = require("../store/variant");
const Color = require("../store/color");
const Code = require("../store/code");
const Price = require("../store/price");
const Phone = require("../store/phone");

module.exports.employee = async (req, res, next) => {
  const name = "Stocks";
  if (!req.session.user_id) {
    res.redirect("login");
  } else if(req.session.position == "Employee")  {
     const brands = await Brand.find({});
    const models = await Model.find({});
    const variants = await Variant.find({});
    const colors = await Color.find({});
    const prices = await Price.find({});
    const phones = await Phone.find({});
    const codes = await Code.find({});
    const {position} = req.session.user

    res.render("stocks", {
      name,
      brands,
      models: JSON.stringify(models),
      variants: JSON.stringify(variants),
      colors: JSON.stringify(colors),
      prices: JSON.stringify(prices),
      phones: JSON.stringify(phones),
      messages: req.flash("success"),
      duplicate: req.flash("duplicate"),
      position,codes
    });
  }
};

module.exports.post = async (req, res) => {
  const { quantity, code,code2,code3,quantity3,quantity2} = req.body;
  const codes = [code, code2, code3]
  try {
    for (let i = 0; i < codes.length; i++) {
      if (codes[i] != null) {
        const { code, brand, model, variant, color, price } = await Code.findOne({ code: codes[i] })
        let l = 0
        let counter = quantity
        if (i == 1) {
          counter = quantity2
        } else if (i == 2) {
          counter = quantity3
        }
        while (l < counter) {
          const stock = new Phone({ code, brand, model, variant, color, price })
          await stock.save()
          l++
        }
      }

    }
    req.flash("success", " Successfully Added!");
    res.redirect("stock-report");
  } catch (e){
    console.log(error)
  }
}

module.exports.update =  async (req, res) => {
  const { id } = req.params;
  const {code, code1} =req.body
  const stock = await Code.findOneAndUpdate({ code: code1 }, { $set: { code: code } })
  const stocks = await Code.findOne({ code: code })
    req.flash("update-stock", `Code has been updated!`);
    res.redirect(`/product-codes/${stocks.code}`)
}