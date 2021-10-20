const express = require('express');
const CreatModelo = require('../criarTabelas/CreatModelo');
const router = express.Router();

router.get("/lists/listarModelo", (req,res)=>{
    CreatModelo.findAll({raw: true, order: [['marca', 'ASC']]}).then(modelos=>{
            res.render("lists/listarModelo", {
                modelos:modelos
            });
        });  
});
router.get("/forms/formModelo",(req,res)=>{
    res.render("forms/formModelo", {

    });
});

router.get("/modeloEspe/:id",(req,res)=>{
    var id = req.params.id;
    CreatModelo.findOne({where : {id:id}
    }).then(specific =>{
        if(specific != undefined){
            res.render("modeloEspe",{
                specific:specific
            });
        }
        else{
           res.redirect("/lists/listarModelo")
        }
    })
});

router.post("/salvar",(req,res)=>{
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
        res.redirect("/lists/listarModelo");
    })
})

module.exports = router; 