const express = require("express"); //chamando a biblioteca
const app = express();//para rodar a biblioteca
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const connection = require("./banco/conector");
const modeloController = require("./controles/modelosController");
const clienteController = require("./controles/clientesController");
const usuarioController = require ("./controles/usuarioController");
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static("views"));

app.use("/", modeloController);
app.use("/",clienteController);
app.use("/",usuarioController);
app.listen(8000,()=>{ console.log("Programa em execução")});

app.get("/", (req,res)=>{
    res.render("index",{

    });
});

