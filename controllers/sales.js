const Code = require("../store/code");
const Sale = require("../store/sale");
const User = require("../store/user");

module.exports.employee = async (req, res, next) => {
  const name = "Sales";
  if (!req.session.user_id) {
    res.redirect("login");
  }else {
     const sales = await Sale.find({});
    const users = await User.find({});
    const codes = await Code.find({});
    const {filter, brand} = req.query
    const position = req.session.position
    const user = req.session.user
   
    res.render("sales", {
      name,users,
      sales: JSON.stringify(sales),
      messages: req.flash("success"),
      exists:req.flash("exists"),
      noResults: req.flash("null"),
      filter,user,
      brand ,position,codes
    }); 
   
  } 
}

module.exports.index = async (req, res, next) => {
  const name = "Sales";
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const sales = await Sale.find({});
    const users = await User.find({});
    const codes = await Code.find({});
    const { filter, brand } = req.query
    const position = req.session.position
    
    res.render("sales", {
      name, users,
      sales: JSON.stringify(sales),
      messages: req.flash("success"),
      exists: req.flash("exists"),
      noResults: req.flash("null"),
      filter,
      brand, position, codes,
    });
  }
}


module.exports.show =  async (req, res, next) => {
    const { id } = req.params
  const users = await User.findOne({ id: id });
  const name = `${users.firstName}'s Sales`
  const css ='User-sales'
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const codes = await Code.find({});
    const sales = await Sale.find({});
    const brands = await Brand.find({});
    const { user } = req.session;

    res.render("employee-sales", {
      id,css,
      name,codes,
      user: JSON.stringify(users),
      brands: JSON.stringify(brands),
      sales: JSON.stringify(sales),
      user: JSON.stringify(users),
      messages: req.flash("success"),
      fail: req.flash("fail"),
      messages: req.flash("success"),
      noResults: req.flash("null"),
    });
  }
}

module.exports.edit = async (req, res, next) => {
  const { id } = req.params
  const sales = await Sale.findOne({ imei: id });
  console.log(sales)
  const css = 'sales-edit'
  const name = "Sales"
  const { position } = req.session.user;
  if (!req.session.user_id) {
    res.redirect("login");
  }else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  } else {
    res.render("edits/edit-sale", { position, sales, css, name, updated: req.flash("update-sales")})
  }
}

module.exports.post = async (req, res) => {
  let today = new Date();
  const { code, imei, firstName, lastName, number, address, sellerID } = req.body;

  const find = await Phone.findOne({code:code});
 const found = await Code.findOne({code:code})

  const imeiCheck = await Sale.findOne({
      imei
    });
  if (find) {
    if (!imeiCheck) {
      const { brand, model, variant, color } = await Phone.findOne({
        code
      });
      const sale = new Sale({
        imei,
        firstName,
        lastName,
        number,
        address,
        brand,
        model,
        variant,
        color,
        date: today,
        sellerID,
      });
      await sale.save();
      await Phone.deleteOne({ code: code });
      if (req.session.position === "Manager") {
        req.flash("success", "Successfully Added!");
        res.redirect("sale");
      } else if (req.session.position === "Employee") {
        req.flash("success", "Successfully Added!");
        res.redirect("employee-sale");
      }
    } else {
     
    req.flash("exists", `Phone with an IMEI of ${imei} has already been sold`);
    res.redirect("sale");
    }
  } else {
    req.flash("null", `${found.brand} ${found.model} ${found.variant} ${found.color} is out of Stock`);
    res.redirect("sale");
  }
}

module.exports.employeePost = async (req, res) => {
  let today = new Date();
  const { code, imei, firstName, lastName, number, address, sellerID } = req.body;

  const find = await Phone.findOne({code:code});
 const found = await Code.findOne({code:code})

  const imeiCheck = await Sale.findOne({
      imei
    });
  if (find) {
    if (!imeiCheck) {
      const { brand, model, variant, color } = await Phone.findOne({
        code
      });
      const sale = new Sale({
        imei,
        firstName,
        lastName,
        number,
        address,
        brand,
        model,
        variant,
        color,
        date: today,
        sellerID,
      });
      await sale.save();
      await Phone.deleteOne({ imei: imei });
      if (req.session.position === "Manager") {
        req.flash("success", "Successfully Added!");
        res.redirect("sale");
      } else if (req.session.position === "Employee") {
        req.flash("success", "Successfully Added!");
        res.redirect("employee-sale");
      }
    } else {
     
    req.flash("exists", `Phone with an IMEI of ${imei} has already been sold`);
    res.redirect("sale");
    }
  } else {
    req.flash("null", `${found.brand} ${found.model} ${found.variant} ${found.color} is out of Stock`);
    res.redirect("sale");
  }
}

module.exports.update = async (req, res) => {
  
  const { imei,current} = req.body;
  const sale = await Sale.findOneAndUpdate({ imei: current }, { $set: { ...req.body } })
  const code = await Returned.findOneAndUpdate({ imei: current }, { $set: { imei: imei } })
  const codes = await Returned.findOneAndUpdate({ replace: current }, { $set: { replace: imei } })
  console.log(codes)
     req.flash("update-sales", `Sale has been updated!`);
    res.redirect(`/sales/${imei}`)
}