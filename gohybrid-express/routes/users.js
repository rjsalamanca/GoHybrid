const express = require('express'),
  router = express.Router(),
  UsersModel = require('../models/users');

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const checkEmail = await UsersModel.checkUser(email);

  //Error Codes:
  //1: Not found
  //2: Wrong Password or Username

  if (checkEmail.rowCount === 1) {
    let user = checkEmail.rows[0];

    if (user.password === password) {
      user['login'] = true;
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

module.exports = router;
