const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
const className = data[0] ? data[0].classification_name : "Vehicles"
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}



/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  let data = await invModel.getVehicleByInvId(inv_id);
  let vehicle = data[0];

  if (!vehicle) {
    req.flash("notice", "Sorry, that vehicle could not be found.");
    return res.redirect("/inv/type/1");
  }

  let nav = await utilities.getNav();   // ← THIS WAS MISSING

  res.render("./inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,           // ← add this
    vehicle: vehicle
  });
};

module.exports = invCont