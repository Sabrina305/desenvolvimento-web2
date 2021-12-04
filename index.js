const express = require("express"); //chamando a biblioteca
const app = express();//para rodar a biblioteca
const bodyParser = require("body-parser");
const session = require("express-session");
const auth = require ("./middleware/userAuth");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const connection = require("./banco/conector");
const clienteController = require("./controles/clientesController");
const usuarioController = require ("./controles/usuarioController"); 
const consultaController = require("./controles/consultaController");
const CreatUsuario = require('./criarTabelas/CreatUsuario');
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
app.use(session({
    secret : "shoesstore",
    cookie : { maxAge : 1000000 },
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(flash());

app.use("/",clienteController);
app.use("/",usuarioController);
app.use("/", consultaController);
app.listen(8000,()=>{ console.log("Programa em execução")});

app.get("/", (req,res)=>{
    //colocar o auth, depois
    res.render("index",{

    });
});

