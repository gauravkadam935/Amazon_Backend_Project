const express = require("express");
const app = express();

const userController = require("../controllers/user");

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.userLogin);

router.post("/logout", userController.userLogout);

module.exports = router;
