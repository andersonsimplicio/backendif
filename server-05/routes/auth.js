const express = require('express');
const router = express.Router();

//-----------------tratando a autenticação-------------------//
const Pessoas = require('../models/pessoa');
const bcrypt = require('bcrypt');

router.post('/signup',(req,res)=>{
    console.log("Entrou");
    Pessoas.findOne({email:req.body.email})
    .then(doc_pessoa=>{
        if(doc_pessoa){
            console.log("Email já cadastrado");
            res.status(400).json({emailerror:"Email já cadastrado!"});
        }else{
            let nova_pessoa = Pessoas({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                senha: req.body.senha
            });

            //criar hash
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(nova_pessoa.senha, salt, function(err, hash) {
                    if(err) throw err;
                    nova_pessoa.senha =hash;

                    nova_pessoa
                    .save()
                    .then(res.render('welcome',{username:nova_pessoa.name}))
                    .catch(err=>console.log(err));
                        });
            });     


            
        }
    })
    .catch(err=>console.log(err));
    /*
    
    */
});

router.get('/', (req, res) => res.json({status:"Acesso permitido"}));
  
module.exports = router;