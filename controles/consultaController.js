const express = require('express');
const CreatConsulta = require('../criarTabelas/CreatConsulta');
const router = express.Router();
const Cliente = require('../criarTabelas/CreatCliente');

router.get("/lists/listarConsulta", (req,res)=>{
    CreatConsulta.findAll({}).then(consulta=>{
        include : [{model : Cliente}]
        res.render("lists/listarConsulta", {
            consulta:consulta
            });
        });  
});
router.get("/forms/formConsulta",(req,res)=>{
    Cliente.findAll().then(cliente=>{
        res.render("forms/formConsulta",{cliente : cliente});
    })   
});
router.get("/edit/editConsulta/:id", (req,res)=>{
    var id = req.params.id;

    CreatConsulta.findByPk(id).then(consulta =>{
        if(isNaN(id)){
            res.redirect("/lists/listarConsulta");

        }
        if(consulta != undefined){
            res.render("edit/editConsulta",{consulta:consulta});
        }else{
            res.redirect("/lists/listarConsulta");
        }
        
    }).catch(erro =>{
        res.redirect("/lists/listarConsulta");
    });
});
router.post("/saveConsulta",(req,res)=>{
    var data = req.body.data;
    var hora = req.body.hora;
    var tipo = req.body.tipo;
    var periodo = req.body.periodo;
    var cliente = req.body.cliente;

    if(tipo != undefined){
        CreatConsulta.create({
            data:data,
            hora:hora,
            tipo:tipo,
            periodo:periodo,
            clienteId:cliente
        }).then(()=>{
            res.redirect("/lists/listarConsulta");
        })
    }else{
        res.redirect("/forms/formConsulta");
    }  
})

router.post("/deleteConsulta",(req,res)=>{
    var id = req.body.id;
    CreatConsulta.destroy({
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/lists/listarConsulta")
    })
});
module.exports = router; 