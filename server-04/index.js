const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const rotas = require('./router');
const port = 3000;

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
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/login', express.static(path.join(__dirname, 'public/login')));
app.use(rotas);

app.get('/', (req, res) => {
  res.render('index');
  console.log("Fim do middleware");
});

app.get('*',(req,res)=>{
    res.render('error');
});

app.listen(port, () => console.log(`Escutando na porta ${port}`));