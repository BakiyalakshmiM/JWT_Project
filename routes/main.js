const express = require("express");
const router = express.Router();
const {dashboard, login, signup} = require("../controllers/main");
const {authorize} = require("../middleware/auth");

router.route('/login').post(login);

router.route('/dashboard').get(authorize, dashboard);

router.route('/signup').post(signup)

module.exports = router
