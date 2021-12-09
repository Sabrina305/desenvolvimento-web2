const express = require('express');
const CreatConsulta = require('../criarTabelas/CreatConsulta');
const router = express.Router();
const Cliente = require('../criarTabelas/CreatCliente');

router.get("/lists/listarConsulta", (req,res)=>{
    CreatConsulta.findAll({raw: true, order: [['data', 'ASC']]}).then(consulta=>{
        include : [{model : Cliente, required:true}]
        res.render("lists/listarConsulta", {
            consulta:consulta
            }) 
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
            Cliente.findAll().then(cliente=>{
                res.render("edit/editConsulta",{
                    consulta:consulta,
                    cliente:cliente
                });
            }) 
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
            paciente:cliente
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
//aqui abaixo
router.post("/updateConsulta",(req,res)=>{
    var id = req.body.id;
    var data = req.body.data;
    var hora = req.body.hora;
    var tipo = req.body.tipo;
    var periodo = req.body.periodo;
    var cliente = req.body.cliente;

    CreatConsulta.update({
        data:data,
        hora:hora,
        tipo:tipo,
        periodo:periodo,
        paciente:cliente},{where:{id:id}

    }).then(()=>{
        res.redirect("/lists/listarConsulta");
    });
});
module.exports = router; 