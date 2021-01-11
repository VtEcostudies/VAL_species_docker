// database.js

const Sequelize = require('sequelize');
const Models = require('./models/init-models.js');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'val_species',
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
const models = Models.initModels(sequelize);

console.log('val_species-api | database.js | models.val_species', models.val_species);

module.exports = {
    sequelize: sequelize,
    models: models,
    Taxa: models.val_species,
    Common: models.val_vernacular
};
