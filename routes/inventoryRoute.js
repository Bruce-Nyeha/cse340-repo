 // Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/inventory-validation")

/* ***************************
 *  View Routes
 * ************************** */

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Vehicle Detail Route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInvId));

// Management View Route 
router.get("/", utilities.handleErrors(invController.buildManagement));

/* ***************************
 *  Add Classification Routes 
 * ************************** */
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.post(
  "/add-classification", 
  // Add classification validation here if you have it
  utilities.handleErrors(invController.registerClassification)
);

/* ***************************
 *  Add Inventory Routes 
 * ************************** */
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

router.post(
  "/add-inventory",
  regValidate.inventoryRules(), 
  regValidate.checkInventoryData, 
  utilities.handleErrors(invController.addInventory) 
);

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

/* ***************************
 *  Deliver Edit Inventory View
 * ************************** */
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView))


/* ***************************
 *  Update Inventory Data
 * ************************** */
router.post(
  "/update/",
  regValidate.inventoryRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

module.exports = router;
