const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_vernacular', {
    vernacularId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    taxonId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'val_species',
        key: 'taxonId'
      },
      unique: "unique_taxonid_vernacularname"
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vernacularName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "unique_taxonid_vernacularname"
    },
    lifeStage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferred: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_vernacular',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "unique_taxonid_vernacularname",
        unique: true,
        fields: [
          { name: "taxonId" },
          { name: "vernacularName" },
        ]
      },
      {
        name: "val_vernacular_pkey",
        unique: true,
        fields: [
          { name: "vernacularId" },
        ]
      },
    ]
  });
};
