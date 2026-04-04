const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
  return [
    body("inv_make").trim().isLength({ min: 3 }).withMessage("Please provide a valid make."),
    body("inv_model").trim().isLength({ min: 3 }).withMessage("Please provide a valid model."),
    body("inv_year").isNumeric().withMessage("Year must be a number."),
    body("inv_price").isDecimal().withMessage("Price must be a decimal number."),
    body("classification_id").isNumeric().withMessage("Please select a classification.")
    // Add rules for description, miles, color, etc.
  ]
}


/* ******************************
 * Check data and return errors or continue to add inventory
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    // This is where you get the nav and select list for the re-render
    const utilities = require(".") 
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
    })
    return
  }
  next()
}

/* ***************************
 *  Check data for updating inventory
 * ************************** */
const checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    res.render("./inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect,
      errors,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

module.exports = {
  inventoryRules: validate.inventoryRules,
  checkInventoryData: validate.checkInventoryData,
  checkUpdateData
}