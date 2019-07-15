const express = require("express"),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  SALT_ROUNDS = 10,
  UsersModel = require("../models/users");

/* GET users listing. */
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const checkEmail = await UsersModel.checkUser(email);
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  //Error Codes for login:
  //1: Not found
  //2: Wrong Password or Username

  if (checkEmail.rowCount === 1) {
    let user = checkEmail.rows[0];

    if (user.password === hashPassword) {
      user["login"] = true;
      delete user.password;
      res.json(user);
    } else {
      res.json({
        // Wrong Password
        login: false,
        errorCode: 2
      });
    }
  } else {
    res.json({
      // Not Found
      login: false,
      errorCode: 1
    });
  }
});

router.post("/register", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const userInstance = new UsersModel(null, first_name, last_name, email, null);
  const checkEmail = await UsersModel.checkUser(email);

  //Error Codes for Register:
  //1: User already created
  //2: Database write error

  if (checkEmail.rowCount === 0) {
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const createUser = await userInstance.addUser(hashPassword);

    (createUser.rowCount === 1) ?
      res.json({
        createdAccount: true,
        errorCode: 0
      })
      :
      res.json({
        createdAccount: false,
        errorCode: 2
      });
  } else {
    res.json({
      createdAccount: false,
      errorCode: 1
    });
  }
});

module.exports = router;
