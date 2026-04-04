// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

/* ***************************
 *  Deliver login view
 * ************************** */
router.get("/login", accountController.buildLogin)

/* ***************************
 *  Deliver account management view
 * ************************** */
router.get("/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagement)
)

/* ***************************
 *  Deliver register view
 * ************************** */
router.get("/register", accountController.buildRegister)

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ***************************
 *  Deliver Account Update View
 * ************************** */
router.get("/update", utilities.handleErrors(accountController.buildUpdate))

/* ***************************
 *  Process Account Update
 * ************************** */
router.post("/update", utilities.handleErrors(accountController.updateAccount))

/* ***************************
 *  Process Password Update
 * ************************** */
router.post("/update-password", utilities.handleErrors(accountController.updatePassword))


/* ***************************
 *  Logout Route
 * ************************** */
router.get("/logout", utilities.handleErrors(accountController.logout))

module.exports = router