const express = require("express"); //chamando  biblioteca
const app = express();//para rodar a biblioteca
const bodyParser = require("body-parser");
const session = require("express-session");//usado no login
const auth = require ("./middleware/userAuth");//usado no login
const flash = require("express-flash");
const cookieParser = require("cookie-parser");//usado no login

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
    cookie : { maxAge : 2000000 },
    resave: true,
    saveUninitialized: true
})); //usado no login

app.use(cookieParser());//usado no login
app.use(flash());//usado no login

app.use("/",clienteController);
app.use("/",usuarioController);
app.use("/", consultaController);
app.listen(8000,()=>{ console.log("Programa em execução")});

app.get("/",auth, (req,res)=>{
    //o auth, serve para a tela de login aparecer
    res.render("index",{

    });
});

