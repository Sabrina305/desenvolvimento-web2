//esse arquivo serve para criar a tabela no mysql
const Sequelize = require('sequelize');
const connection = require('../banco/conector');
const CreatUsuario = connection.define('creatUsuario',{
    nome:{
        type:Sequelize.STRING,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type:Sequelize.STRING,
        allowNull: false
    }
});
CreatUsuario .sync({force:false}).then(()=>{
    console.log("Tabela Usuário criada!");
});
module.exports = CreatUsuario;