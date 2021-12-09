const Sequelize = require('sequelize');
const connection = require('../banco/conector');
const Cliente = require('../criarTabelas/CreatCliente');
//esse arquivo serve para criar a tabela no mysql
const CreatConsulta = connection.define('creatConsulta',{
    data:{
        type:Sequelize.STRING,
        allowNull: false
    },
    hora:{
        type:Sequelize.STRING,
        allowNull: false
    },
    tipo:{
        type:Sequelize.STRING,
        allowNull: false
    },
    periodo:{
        type:Sequelize.STRING,
        allowNull: false
    },
    paciente:{
        type:Sequelize.STRING,
        allowNull: false
    }
});
Cliente.hasMany(CreatConsulta);
CreatConsulta.belongsTo(Cliente);
//os 2 itens acima estao fazendo o relacionamento com a tabela cliente
CreatConsulta.sync({force:false}).then(()=>{
    console.log("Tabela Consulta criada!");
});
module.exports = CreatConsulta;