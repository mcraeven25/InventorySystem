const Device = require("../store/device");

module.exports.index = async (req, res, next) => {
  const name = "Devices";
  if (!req.session.user_id) {
    res.redirect("login");
  } else {
    const devices = await Device.find({});
    const user = req.session.position
    res.render("devices", { name, devices: JSON.stringify(devices),user });
  }
}