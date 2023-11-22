const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Jogo = sequelize.define('Jogo', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        short_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: 'Jogos',
        timestamps: true,
        createdAt: 'dataCriacao',
        updatedAt: 'dataAtualizacao',
        version: 'versao'
    }
    );
    return Jogo;
};