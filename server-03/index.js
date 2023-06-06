const express = require('express');
const app = express();
let params_modules = require('./params.js');
let port =3000;


app.get('/',(req,res)=>{
    res.send('Ola mundo Express');

});
app.get('/json',(req,res)=>{

    res.status(200).json({usuario:'Anderson',id:'1236'});
});
app.get('/sobre',(req,res)=>{
    res.send('<h1>Pagina web</h1>');

});

app.get('/ab[0-9]cd',(req,res)=>{
    res.send('<h1>expressão Regular</h1>');

});

app.use('/',params_modules);

app.post('/teste_post',(req,res)=>{
    res.send('Você acessou uma pagina via metodo POST');
});



app.get('*',(req,res)=>{
    res.send('Erro 404');
});

app.listen(port,()=>console.log(`Escutando na porta ${port}`));