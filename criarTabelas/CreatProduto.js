const Sequelize = require('sequelize');
const connection = require('../banco/conector');
const Modelo = require("../criarTabelas/CreatModelo");

const CreatProduto = connection.define('creatProduto',{
    tamanho:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    estoque:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
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
Modelo.hasMany(CreatProduto);
CreatProduto.belongsTo(Modelo);

CreatProduto .sync({force:false}).then(()=>{
    console.log("Tabela Produto criada!");
});
module.exports = CreatProduto;