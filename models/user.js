const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: { 
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//Criar a tabela
User.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
User.sync({ alter: true })

module.exports = User;