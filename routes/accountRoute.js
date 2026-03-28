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

module.exports = router