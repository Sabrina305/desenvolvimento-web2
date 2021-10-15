const express = require('express');
const CreatCliente = require('../criarTabelas/CreatCliente');
const router = express.Router();

router.get("/lists/listarClientes", (req,res)=>{
    CreatCliente.findAll({raw: true, order: [['nome', 'ASC']]}).then(clientes=>{
            res.render("lists/listarClientes", {
                clientes:clientes
            });
        });  
});
router.get("/forms/formCliente",(req,res)=>{
    res.render("forms/formCliente", {

    });
});
//não esta pegando
router.get("/clienteEspe/:id",(req,res)=>{
    var id = req.params.id;
    CreatCliente.findOne({where : {id:id}
    }).then(mostrarEspe =>{
        if(mostrarEspe != undefined){
            res.render("clienteEspe",{
                mostrarEspe:mostrarEspe
            });
        }
        else{
           //res.redirect("/listarModelo")
            res.send("Não achei!")
        }
    })
});
//não esta pegando
router.post("/salvarCliente",(req,res)=>{
    var nome = req.body.nome;
    var cidade = req.body.cidade;
    var cpf = req.body.cpf;
    var bairro = req.body.bairro;
    var rua = req.body.rua;
    var numbCasa = req.body.numbCasa;
    CreatCliente.create({
        nome:nome,
        cidade:cidade,
        cpf:cpf,
        bairro:bairro,
        rua:rua,
        numbCasa:numbCasa
    }).then(()=>{
        res.redirect("/lists/listarClientes");
    })
})

module.exports = router; 