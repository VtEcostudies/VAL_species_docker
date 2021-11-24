// database.js

const Sequelize = require('sequelize');
const Models = require('./models/init-models.js');

const dbSchema = process.env.DB_SCHEMA || 'val_species';
const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASSWORD || 'EatArugula'; //'postgres';
const dbHost = process.env.DB_HOST || 'localhost'; //'postgres';
const dbPort = process.env.DB_PORT || 5433; //5432
const dbDialect = 'postgres';
const dbSSL = process.env.DB_SSL == "true";

const sequelize = new Sequelize(dbSchema,
                                dbUser,
                                dbPass,
                                {
                                    host: dbHost,
                                    port: dbPort,
                                    dialect: dbDialect,
                                    dialectOptions: {
                                        ssl: dbSSL
                                    }
                                });
const models = Models.initModels(sequelize);

console.log(`-----------------------val_species-api::database.js POSTGRES DATABASE CONNECTION PARAMETERS----------------`);
console.log('DB_SCHEMA:', dbSchema);
console.log('DB_USER:', dbUser);
console.log('DB_PASSWORD:', dbPass);
console.log('DB_HOST:', dbHost);
console.log('DB_PORT:', dbPort);
console.log('DB_SSL:', dbSSL);
console.log(`-----------------------------------------------------------------------------------------------------------`);

console.log('val_species-api | database.js | models.val_species', models.val_species);

module.exports = {
    sequelize: sequelize,
    models: models,
    Taxa: models.val_species,
    Common: models.val_vernacular
};
