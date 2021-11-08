const express = require('express');
const CreatProduto = require('../criarTabelas/CreatProduto');
const CreatModelo = require('../criarTabelas/CreatModelo');
const router = express.Router();

router.get("/lists/listarProduto", (req,res)=>{
    CreatProduto.findAll({raw: true, order: [['tamanho', 'ASC']]}).then(produto=>{
        include : [{model : CreatModelo}]   
        res.render("lists/listarProduto", {
                produto:produto
            });
        });  
});
router.get("/forms/formProduto",(req,res)=>{
    CreatModelo.findAll().then(modelo=> {
        res.render("forms/formProduto", {modelo : modelo});
    })
    
});

router.get("/produtoEspe/:id",(req,res)=>{
    var id = req.params.id;
    CreatProduto.findOne({where : {id:id}
    }).then(specific =>{
        if(specific != undefined){
            res.render("produtoEspe",{
                specific:specific
            });
        }
        else{
           res.redirect("/lists/listarProduto")
        }
    })
});
router.get("/edit/editProduto/:id",(req,res)=>{
    var id = req.params.id;

    CreatProduto.findByPk(id).then(produto =>{
        if(isNaN(id)){
            res.redirect("/lists/listarProduto");

        }
        if(produto != undefined){
            CreatModelo.findAll().then(modelo=>{
                 res.render("edit/editProduto",{
                    produto:produto,
                    modelo:modelo
                });
            })
           
        }else{
            res.redirect("/lists/listarProduto");
        }
        
    }).catch(erro =>{
        res.redirect("/lists/listarProduto");
    });
});

router.post("/saveProduto",(req,res)=>{
    var tamanho = req.body.tamanho;
    var estoque = req.body.estoque;
    var marca = req.body.marca;
    var cor = req.body.cor;
    var preco = req.body.preco;
    var tipo = req.body.tipo;
    var modelo = req.body.modelo;
    if (marca !=undefined){
        CreatProduto.create({
        tamanho:tamanho,
        estoque:estoque,
        marca:marca,
        cor:cor,
        preco:preco,
        tipo:tipo,
        modeloId:modelo
        }).then(()=>{
            res.redirect("/lists/listarProduto");
        })
    }else{
        res.redirect("/forms/formProduto");
    }
    
})
router.post("/updateProduto",(req,res)=>{
    var id = req.body.id;
    var tamanho = req.body.tamanho;
    var estoque = req.body.estoque;
    var marca = req.body.marca;
    var cor = req.body.cor;
    var preco = req.body.preco;
    var tipo = req.body.tipo;
    var modelo = req.body.modelo;
    CreatProduto.update({
        tamanho:tamanho,
        estoque:estoque,
        marca:marca,
        cor:cor,
        preco:preco,
        tipo:tipo,
        modeloId:modelo
        },{where:{id:id}

    }).then(()=>{
        res.redirect("/lists/listarProduto");
    });
});
router.post("/deleteProduto",(req,res)=>{
    var id = req.body.id;
    CreatProduto.destroy({
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/lists/listarProduto")
    })
});
module.exports = router; 