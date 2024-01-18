const User = require("../store/user");
const Returned = require("../store/returned");  

module.exports.index = async (req, res, next) => {
  const name = "Returned";
  if (!req.session.user_id) {
    res.redirect("login");
  }else {
   
    const users = await User.find({});
    const returned = await Returned.find({});
    const { filter, brand } = req.query
    const {position} = req.session.user

    res.render("returned", {
      name,users,returned:JSON.stringify(returned),
      messages: req.flash("update-status"),
      success: req.flash("success"),
      noResults: req.flash("null"),
      filter,position,
      brand 
    });
  }
}

module.exports.show = async (req, res) => { 
  const name = "Returned";
  const {id} = req.params
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const css = "Returned-edit";
    const returned = await Returned.findOne({imei:id})
    res.render("edit-repair", {
      returned,css,name, messages:req.flash("update-repair")
    });
  }
}


module.exports.post = async (req, res) => {
  const { toDo, repairImei } = req.body;
  let today = new Date();
   if(toDo === "Repair"){
  const { repairImei, repairReason, action } = req.body;
  const find = await Sale.findOne({ imei: repairImei });
 
  if (find) {
    const { brand, model, firstName, lastName, date, number } = await Sale.findOne({
      imei: repairImei,
    });
   
    const returned = new Returned({
      imei:repairImei,
      firstName,
      lastName,
      number,
      brand: brand,
      model: model,
      status: 'Pending',
      action: "For Repair",
      reason:repairReason,
      returnedDate: today,
      date: date,
    
    
    });

    await returned.save();
    req.flash("success", "Successfully Added!");
    res.redirect("returned");
  } else {
    req.flash("null", `Phone with the IMEI of ${repairImei} was not found`);
    res.redirect("returned");
  }

   } else if (toDo === "Replacement") {
     const { replacementImei, imei, reason } = req.body;
     const find = await Sale.findOne({ imei: imei });
     const findStock = await Phone.findOne({ imei: replacementImei });
 
     if (find) {
       if (findStock) {
         const { brand, model, firstName, lastName, date, number, variant } = await Sale.findOne({
           imei: imei,
         });
   
         const returned = new Returned({
           replace:replacementImei,
           imei,
           firstName,
           lastName,
           number,
           brand: brand,
           model: model,
           status: 'On Process',
           action: "Replacement",
           reason: reason,
           returnedDate: today,
           date: date,
         });

         await returned.save();
         const replace = await Sale.findOneAndUpdate({ imei: imei }, { $set: { imei: replacementImei, brand: brand, model: model, variant: variant } })
       
         req.flash("success", "Successfully Added!");
         res.redirect("returned");
       } else {
         req.flash("null", `Stock with the IMEI of ${imei} was not found`);
          res.redirect("returned");
       }
  } else {
    req.flash("null", `Sale with the IMEI of ${imei} was not found`);
    res.redirect("returned");
  }

     
}
}

module.exports.update = async (req, res) => {
  const { imei, status } = req.body;
  const returnedItem = await Returned.findOneAndUpdate({ imei: imei }, { status: status })
  req.flash("update-status", `Status has been updated!`);
  res.redirect(`returned`)

}

module.exports.returnedUpdate =  async (req, res) => {
  const {imei, reason, action} = req.body;
  const { id } = req.params;
  const update = await Returned.findOneAndUpdate({ imei: imei }, { $set: { action, reason } })
  req.flash("update-repair", `Info has been updated!`);
  res.redirect(`/returned/${id}`)
  
}