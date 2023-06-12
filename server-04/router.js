const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log('Login: ' + req.body.login_campo + ' Senha: ' + req.body.login_passwd);
  res.redirect('/');
});

module.exports = router;