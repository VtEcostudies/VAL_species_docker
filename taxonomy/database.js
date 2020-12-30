// database.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || 'EatArugula',
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
        allowNull: false
    },
    scientificName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taxonRank: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
module.exports = {
    sequelize: sequelize,
    Taxa: Taxa
};
