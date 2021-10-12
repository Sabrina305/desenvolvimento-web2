const Sequelize = require('sequelize');
const connection = require('../banco/conector');

const CreatModelo = connection.define('creatModelo',{
    marca:{
        type:Sequelize.STRING,
        allowNull: false
    },
    cor:{
        type:Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type:Sequelize.FLOAT,
        allowNull: false
    },
    tipo:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
CreatModelo .sync({force:false}).then(()=>{
    console.log("Tabela criada!");
});
module.exports = CreatModelo;