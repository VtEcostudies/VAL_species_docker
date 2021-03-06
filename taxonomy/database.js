// database.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || 'postgres',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const Taxa = sequelize.define('Taxa', {
    taxonId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    scientificName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    taxonRank: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

const Users = sequelize.define('Users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {
    sequelize: sequelize,
    Taxa: Taxa,
    Users: Users
};
