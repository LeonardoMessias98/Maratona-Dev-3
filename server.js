// Projeto Maratona DEV 3, realizado pela https://rocketseat.com.br/ 

const express  = require("express");
const server = express();

server.use(express.static('public'));

server.use(express.urlencoded({extended:true}));


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


server.post("/",function(req,res){
    
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood; 
    

    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios");
    }
    

    const query= `INSERT INTO donors ("name","email","blood")
    VALUES ('${name}','${email}','${blood}')`;
    
    
    db.query(query,function(err){
        if(err){
            return res.send("erro no banco de dados.");
        }
        else{
            return res.redirect("/");
        }
    });
    

    
});


server.listen(3000,function(){
});


