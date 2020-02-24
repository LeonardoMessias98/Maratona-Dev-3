// Projeto Maratona DEV 3, realizado pela https://rocketseat.com.br/ 

const express  = require("express");
const server = express();

// Dizend ao meu server para usar a pasta public
// que é o local onde esta o meu Front end
server.use(express.static('public'));

server.use(express.urlencoded({extended:true}));


// Fazendo a conexão e configuração do meu banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password:'tenzou413',
    host:'localhost',
    port:5432,
    database:'bloodDonation'
})

const nunjucks = require("nunjucks");
nunjucks.configure("./",{
    express: server,
    noCache: true,
});



server.get("/",function(req,res){

    db.query("SELECT * FROM donors", function(err,result){
        if(err) return res.send("Erro no banco de dados");

        const donors = result.rows;
        return res.render("index.html",{donors});
    })
});

// Metodo post, ontem eu envio uma requisição
// para o front end no caminho " / "
server.post("/",function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood; 
    
    // Regra de negocios, aqui eu quero que todos os campos
    // Não estejam vazios
    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios");
    }
    
    // Se todos os campos estão preenchidos, então eu adiciono
    // ao banco de dados
    const query= `INSERT INTO donors ("name","email","blood")
    VALUES ('${name}','${email}','${blood}')`;
    
    // Fazendo uma condição para caso der erro no banco de dados
    db.query(query,function(err){
        if(err){
            return res.send("erro no banco de dados.");
        }
        else{
            return res.redirect("/");
        }
    });
    

    
});

// Dizendo ao servidor qual porta ouvir
server.listen(3000,function(){
});


