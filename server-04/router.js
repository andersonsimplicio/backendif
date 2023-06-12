const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log('Login: ' + req.body.login_campo + ' Senha: ' + req.body.login_passwd);
  const username  = req.body.login_campo
  res.render('welcome',{username});
});

module.exports = router;