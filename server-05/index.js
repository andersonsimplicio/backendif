const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//-----------------------Configurando Banco de Dados-----------------------------//
const mongoose = require('mongoose');
const db_acess = require('./setup/db').mongoURL;
mongoose.connect(db_acess,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Conexao ao mongoDB bem sucedida!"))
.catch(err=>console.log(err) )
//------------------------------------------------------------------------------//
//-----------------------Registro-----------------------------//
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const auth = require('./routes/auth');

app.use("/auth",auth);

//---------------------------------------------------------//

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/register', express.static(path.join(__dirname, 'public/register')));

app.get('/',(req,res)=>{
    res.render('index');

});
app.get('*',(req,res)=>{
    res.render('error');
});
app.listen(port,()=>{
    console.log(`Server rodando em http://localhost:${port}`);
})