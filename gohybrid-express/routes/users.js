const express = require('express'),
  router = express.Router(),
  UsersModel = require('../models/users');

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const { email } = req.body;
  const checkEmail = await UsersModel.checkUser(email);

  console.log(checkEmail)
});

module.exports = router;
