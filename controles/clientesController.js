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
//inicio alteração
router.get("/forms/formCliente",(req,res)=>{
    var nomeErro = req.flash("nomeErro");
    res.render("forms/formCliente", {
        nomeErro:nomeErro

    });
});
//fim
router.get("/clienteEspe/:id",(req,res)=>{
    var id = req.params.id;
    CreatCliente.findOne({where : {id:id}
    }).then(specific =>{
        if(specific != undefined){
            res.render("clienteEspe",{
                specific:specific
            });
        }
        else{
           res.redirect("/lists/listarClientes");
        }
    })
});
router.get("/edit/editCliente/:id",(req,res)=>{
    var id = req.params.id;
    CreatCliente.findByPk(id).then(cliente =>{
        if(isNaN(id)){
            res.redirect("/lists/listarClientes");

        }
        if(cliente != undefined){
            res.render("edit/editCliente",{cliente:cliente});
        }else{
            res.redirect("/lists/listarClientes");
        }
        
    }).catch(erro =>{
        res.redirect("/lists/listarClientes");
    });
});
//inicio alteração 15/11
router.post("/saveCliente",(req,res)=>{
    var{nome,cidade,cpf,bairro,rua,numbCasa} = req.body;
    var nomeErro;
    if (nome == undefined || nome == ""){
        nomeErro = "Campo vazio"
        req.flash("nomeErro",nomeErro);
        res.redirect("forms/formCliente");
    }else{
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
    }
    
});
//fim
router.post("/updateCliente",(req,res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var cidade = req.body.cidade;
    var cpf = req.body.cpf;
    var bairro = req.body.bairro;
    var rua = req.body.rua;
    var numbCasa = req.body.numbCasa;

    CreatCliente.update({
        nome:nome,
        cidade:cidade,
        cpf:cpf,
        bairro:bairro,
        rua:rua,
        numbCasa:numbCasa},{where:{id:id}

    }).then(()=>{
        res.redirect("/lists/listarClientes");
    });
});
router.post("/deleteCliente",(req,res)=>{
    var id = req.body.id;
    CreatCliente.destroy({
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/lists/listarClientes")
    })
});
module.exports = router; 