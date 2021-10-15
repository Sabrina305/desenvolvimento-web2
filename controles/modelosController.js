const express = require('express');
const CreatModelo = require('../criarTabelas/CreatModelo');
const router = express.Router();

router.get("/lists", (req,res)=>{
    CreatModelo.findAll({raw: true, order: [['marca', 'ASC']]}).then(modelos=>{
            res.render("lists/listarModelo", {
                modelos:modelos
            });
        });  
});
router.get("/forms",(req,res)=>{
    res.render("forms/formModelo", {

    });
});
//não esta pegando
router.get("/modeloEspe/:marca",(req,res)=>{
    var marca = req.params.marca;
    CreatModelo.findOne({where : {marca:marca}
    }).then(mostrarEspe =>{
        if(mostrarEspe != undefined){
            res.render("modeloEspe",{
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
        res.redirect("/");
    })
})

module.exports = router; 