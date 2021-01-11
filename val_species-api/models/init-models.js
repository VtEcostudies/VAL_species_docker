var DataTypes = require("sequelize").DataTypes;
var _val_collection = require("./val_collection");
var _val_conservation_status = require("./val_conservation_status");
var _val_distribution = require("./val_distribution");
var _val_gbif_taxon_id = require("./val_gbif_taxon_id");
var _val_institution = require("./val_institution");
var _val_reject = require("./val_reject");
var _val_species = require("./val_species");
var _val_status_level = require("./val_status_level");
var _val_status_qualifier = require("./val_status_qualifier");
var _val_status_scope = require("./val_status_scope");
var _val_vernacular = require("./val_vernacular");

function initModels(sequelize) {
  var val_collection = _val_collection(sequelize, DataTypes);
  var val_conservation_status = _val_conservation_status(sequelize, DataTypes);
  var val_distribution = _val_distribution(sequelize, DataTypes);
  var val_gbif_taxon_id = _val_gbif_taxon_id(sequelize, DataTypes);
  var val_institution = _val_institution(sequelize, DataTypes);
  var val_reject = _val_reject(sequelize, DataTypes);
  var val_species = _val_species(sequelize, DataTypes);
  var val_status_level = _val_status_level(sequelize, DataTypes);
  var val_status_qualifier = _val_status_qualifier(sequelize, DataTypes);
  var val_status_scope = _val_status_scope(sequelize, DataTypes);
  var val_vernacular = _val_vernacular(sequelize, DataTypes);

  val_collection.belongsTo(val_institution, { foreignKey: "institutionCode"});
  val_institution.hasMany(val_collection, { foreignKey: "institutionCode"});
  val_conservation_status.belongsTo(val_species, { foreignKey: "taxonId"});
  val_species.hasOne(val_conservation_status, { foreignKey: "taxonId"});
  val_vernacular.belongsTo(val_species, { foreignKey: "taxonId"});
  val_species.hasMany(val_vernacular, { foreignKey: "taxonId"});

  return {
    val_collection,
    val_conservation_status,
    val_distribution,
    val_gbif_taxon_id,
    val_institution,
    val_reject,
    val_species,
    val_status_level,
    val_status_qualifier,
    val_status_scope,
    val_vernacular,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
