const express = require("express"); //chamando a biblioteca
const app = express();//para rodar a biblioteca
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const connection = require("./banco/conector");

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })
const CreatModelo = require("./criarTabelas/CreatModelo");
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static("views"));
app.listen(8000,()=>{ console.log("Programa em execução")});

app.get("/", (req,res)=>{
    res.render("index",{

    });
});
app.get("/listarModelo", (req,res)=>{
    CreatModelo.findAll({raw: true, order: [['marca', 'DESC']]}).then(modelo=>{
            res.render("listarModelo", {
                modelo:modelo
            });
        });  
});
app.get("/formModelo",(req,res)=>{
    res.render("formModelo", {

    });
});
app.get("/modeloEspe/:marca",(req,res)=>{
    var marca = req.params.marca;
    CreatModelo.findOne({where : {marca:marca}
    }).then(mostrarEspe =>{
        if(mostrarEspe != undefined){
            res.render("modeloEspe",{
                mostrarEspe:mostrarEspe
            });
        }else{
            //res.redirect("/")
            res.send("Não achei")
        }
    })
});
app.post("/salvar",(req,res)=>{
    var marca = req.body.marca;
    var cor = req.body.cor;
    var preco = req.body.preco;
    var tipo = req.body.tipo;
    CreatModelo.create({
        marca:marca,
        cor:cor,
        preco:preco,
        tipo:tipo
    }).then(()=>{
        res.redirect("/");
    })
})