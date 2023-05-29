const http = require('http');//permite resolver e fazer parse de uma aplicação
const url = require('url');//permite extrair informações de uma URL
const fs = require('fs');//permite fazer arquivos estáticos
const path =require('path');//permite fazer o caminho e nomear arquivos
const { log } = require('console');
//permite criar estruturas de dados com informações sobre o arquivo

const mymeTypes = {
    html:'text/html',
    css:'text/css',
    js:'text/javascript',
    png: 'image/png',
    jpg:'image/jpg',
    woff:'font/woff',
} 

const hostname='127.0.0.1';
const port =3000;

const server = http.createServer((req, res) => {
    
    let acesso_uri = url.parse(req.url, true).pathname;
    let caminho_completo_recurso=path.join(process.cwd(),decodeURI(acesso_uri));
    console.log(caminho_completo_recurso);
    let recurso_carregado; 
    try{
        //Código apresentado na aula apresenta um erro de tentativa de escrito depois
        //de um res.end() invocado no catch(error){ ... }
        //Erro na resposta: Error [ERR_STREAM_WRITE_AFTER_END]: write after end
        recurso_carregado = fs.lstatSync(caminho_completo_recurso);
        if(recurso_carregado.isFile()){
            let mimeType = mymeTypes[path.extname(caminho_completo_recurso).substring(1)];
            console.log(mimeType);    
            res.writeHead(200, { 'Content-Type': mimeType });
            let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso);
            fluxo_arquivo.pipe(res);
            //res.end();
            //tirei pois fluxo_arquivo.pipe(res); é assincrono e impede de carregar a pagina 
        }else{
            if(recurso_carregado.isDirectory()){
                console.log('É um diretorio');
                let indexFile = path.join(caminho_completo_recurso, 'index.html');
                if (fs.existsSync(indexFile)) {
                    let mimeType = mymeTypes['html'];
                    console.log(mimeType);
                    res.writeHead(302, { 'Location': `index.html` });
                    res.end();
                }else{
                    console.log('Arquivo index.html não encontrado');
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write("404: Arquivo não encontrado!");
                    res.end();
                }
               
            }else{
                console.log('É nada foi encontrado');
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write("500: error interno desconhecido");
                res.end();
            }
        }
    }catch(error){
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("404:Arquivo não encontrado!");
        res.end();
    }
    
    
}).listen(port,hostname,()=>{
    console.log(`Servidor está executado http://${hostname}:${port}/`);
});