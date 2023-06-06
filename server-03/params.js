let express = require('express');
let router = express.Router();


router.get('/:p',(req,res)=>{
    res.send('<h6>expressão Regular</h6>'+req.params.p);

});

router.get('/user/:u/nome/:n',(req,res)=>{
    res.send('User:'+req.params.u+' nome:'+req.params.n);
});


module.exports =  router;