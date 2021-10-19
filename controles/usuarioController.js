const express = require('express');
const CreatUsuario = require('../criarTabelas/CreatUsuario');
const router = express.Router();
const bcryp = require('bcryptjs');

router.get("/lists/listarUsuario", (req,res)=>{
    CreatUsuario.findAll({raw: true, order: [['nome', 'ASC']]}).then(usuarios=>{
            res.render("lists/listarUsuario", {
                usuarios:usuarios
            });
        });  
});
router.get("/forms/formUsuario",(req,res)=>{
    res.render("forms/formUsuario", {

    });
});
//não esta pegando
router.get("/usuarioEspe/:id",(req,res)=>{
    var id = req.params.id;
    CreatUsuario.findOne({where : {id:id}
    }).then(espeUsuario =>{
        if(espeUsuario != undefined){
            res.render("usuarioEspe",{
                espeUsuario:espeUsuario
            });
        }
        else{
           //res.redirect("/listarUsuario")
            res.send("Não achei!")
        }
    })
});
//não esta pegando

router.post("/salvarUsuario",(req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var salt = bcryp.genSaltSync(10);
    var hash = bcryp.hashSync(senha,salt);

    CreatUsuario.findOne({where : {email:email}}).then(usuario =>{
        if(usuario == undefined){
            CreatUsuario.create({
                    nome:nome,
                    email:email,
                    senha:hash
                }).then(()=>{
                    res.redirect("/lists/listarUsuario");
                })
        }else{
            res.redirect("/lists/listarUsuario");
        }
    });
    
})

module.exports = router; 