const User = require("../store/user");

module.exports.index = async (req, res, next) => {
  const name = "Employees";
  if (!req.session.user_id) {
    res.redirect("login");
  }else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  } else {
    const users = await User.find({});
    res.render("users", {
      name,
      users: JSON.stringify(users),
      messages: req.flash("success"),
      fail: req.flash("fail"),
    });
  }
}

module.exports.show = async (req, res, next) => {
   if (!req.session.user_id) {
    res.redirect("login");
   }else if (req.session.position === 'Employee') {
    res.send("Youre're not Authorized to access this page!")
  } else {
     const { id } = req.params;
     const users = await User.findOne({ id: id });
     const css = "User-edit";
     const name = users.firstName
     res.render("edits/edit-user", {
      id, users, css, name, updated:
      req.flash("update-user"), failed: req.flash("update-failed")
     })
  }
  
}

module.exports.post = async (req, res, next) => {
  const {
    firstName,
    lastName,
    password,
    confirm,
    number,
    email,
    userName,
    position,
  } = req.body;
  const counter = await Counter.findOne()

  if (confirm == password) {
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      id: counter.number,
      firstName,
      lastName,
      password: hash,
      number,
      email,
      userName,
      position,
      target:0,
    });
    await user.save();
    let newCounter = counter.number + 1
   
    const saveCounter = await Counter.updateMany ({},{number: newCounter})
    req.flash("success", "Successfully Added!");
    res.redirect("user");
  } else {
    req.flash("fail", "Unable to save! Password does not match!");
    res.redirect("user");
  }
}

module.exports.update =  async (req, res) => {
  const { firstName, lastName, email, password, number, cpassword, target } = req.body;
  const { id } = req.params;
  const hash = await bcrypt.hash(password, 12);
  if (password && cpassword && password == cpassword) {
    const users = await User.findOneAndUpdate({ id: id }, {
      firstName: firstName, lastName: lastName,
      email: email, number: number, password: hash, target: target
    })
   
    req.flash("update-user", `User info has been updated!`);
    res.redirect(`/user/${id}`)

  } else if (password && cpassword && password != cpassword) {
    req.flash("update-failed", `Password do not match!`);
    res.redirect(`/user/${id}`)
   
  } else{
    const users = await User.findOneAndUpdate({id:id},{firstName:firstName, lastName:lastName, email:email,number:number, target:target})
    req.flash("update-user", `User info has been updated!`);
    res.redirect(`/user/${id}`)
    
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const toDelete = await User.findOne({ id: id })
  const {
      firstName,
      lastName,
      password,
      number,
      email,
      userName,
      position,
    target } = toDelete
  const idToDelete = toDelete.id
  const deleteuser = await User.deleteOne({ id: id });
  const newDeleted = await new DeletedEmployee({id: idToDelete,
      firstName,
      lastName,
      password,
      number,
      email,
      userName,
      position,
      target })

  await newDeleted.save()
  res.redirect(`/user`)
}