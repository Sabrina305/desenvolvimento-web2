const Sequelize = require('sequelize');
const connection = require('../banco/conector');
//esse arquivo serve para criar a tabela no mysql
const CreatCliente = connection.define('creatCliente',{
    nome:{
        type:Sequelize.STRING,
        allowNull: false
    },
    cidade:{
        type:Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type:Sequelize.STRING,
        allowNull: false
    },
    bairro:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rua:{
        type:Sequelize.STRING,
        allowNull:false
    },
    numbCasa:{
        type:Sequelize.STRING,
        allowNull: false
    }
});
CreatCliente .sync({force:false}).then(()=>{
    console.log("Tabela Cliente criada!");
});
module.exports = CreatCliente;