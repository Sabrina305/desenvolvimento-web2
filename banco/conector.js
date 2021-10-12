const Sequelize = require ('sequelize');
const connection = new Sequelize('projeto','root','0530-jbae1997',{
    host:'localhost',
    dialect: 'mysql',
    port: 3307
    
});
module.exports = connection;