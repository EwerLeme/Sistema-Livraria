const Sequelize = require('sequelize');
const db = require('./db');

const Livro = db.define('livro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    editora: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlImagem: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    anoPublicacao: { 
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    qtdDisponivel: { 
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

//Criar a tabela
Livro.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
Livro.sync({ alter: true })

module.exports = Livro;