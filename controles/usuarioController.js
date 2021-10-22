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

router.get("/usuarioEspe/:id",(req,res)=>{
    var id = req.params.id;
    CreatUsuario.findOne({where : {id:id}
    }).then(specific =>{
        if(specific != undefined){
            res.render("usuarioEspe",{
                specific:specific
            });
        }
        else{
           res.redirect("/lists/listarUsuario");
        }
    })
});
router.get("/edit/editUsuario/:id",(req,res)=>{
    var id = req.params.id;

    CreatUsuario.findByPk(id).then(usuario =>{
        if(isNaN(id)){
            res.redirect("/lists/listarUsuario");

        }
        if(usuario != undefined){
            res.render("edit/editUsuario",{usuario:usuario});
        }else{
            res.redirect("/lists/listarUsuario");
        }
        
    }).catch(erro =>{
        res.redirect("/lists/listarUsuario");
    });
});

router.post("/saveUsuario",(req,res)=>{
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
router.post("/updateUsuario",(req,res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    CreatUsuario.update({
        nome:nome,
        email:email,},{where:{id:id}

    }).then(()=>{
        res.redirect("/lists/listarUsuario");
    });
});
router.post("/deleteUsuario",(req,res)=>{
    var id = req.body.id;
    CreatUsuario.destroy({
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/lists/listarUsuario")
    })
});
module.exports = router; 