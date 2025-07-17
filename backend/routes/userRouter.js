const {
  registerController,
  loginController,
} = require("../controller/userController");

const router = require("express").Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);

module.exports = router;
