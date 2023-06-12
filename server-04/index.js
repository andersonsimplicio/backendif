const express = require('express');
const bdy = require('body-parser');
const app = express();
const path = require('path');
let port = 3000;

/*
const meu_middleware =  function(req,res,next){
    console.log("Executando o middleware");
    next();
}
const meu_middleware_2 =  function(req,res,next){
    console.log("Executando o middleware 2");
    next();
}

let get_request_time =  function(req,res,next){
    let tempo_atual = Date.now();
    let hoje = new Date(tempo_atual);
    req.request_time =  hoje.toUTCString();
    next();
}

app.use(get_request_time);



app.get('/tempo',(req,res)=>{
    res.send('Horário de brasília: '+req.request_time);
    console.log("Fim do middleware");
});



app.use('/teste',function(req,res,next){
    console.log('Incio');
    next();
});


app.use('/',(req,res,next)=>{
    console.log('Meio');
    next();
});
app.use('/teste',(req,res,next)=>{
    console.log('Fim');
    next();
});
*/
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(bdy.urlencoded({extended:false}));
app.use('/login',express.static(__dirname + '/public/login'));

app.get('/',(req,res)=>{
    res.render('index');
    console.log("Fim do middleware");
});

app.post('/login',(req,res)=>{
    console.log('Login: '+req.body.login_campo + ' Senha: '+req.body.login_passwd);
    res.redirect('/')
});

app.listen(port,()=>console.log(`Escutando na porta ${port}`));