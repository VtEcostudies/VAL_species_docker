const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_species', {
    gbifId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    taxonId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: "val_species_taxonId_key"
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acceptedNameUsageId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acceptedNameUsage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentNameUsageId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxonRank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxonomicStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nomenclaturalCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    scientificNameAuthorship: {
      type: DataTypes.STRING,
      allowNull: true
    },
    specificEpithet: {
      type: DataTypes.STRING,
      allowNull: true
    },
    infraspecificEpithet: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vernacularName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    taxonRemarks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datasetName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datasetId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kingdom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kingdomId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phylum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phylumId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    classId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order: {
      type: DataTypes.STRING,
      allowNull: true
    },
    orderId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    family: {
      type: DataTypes.STRING,
      allowNull: true
    },
    familyId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genusId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    },
    speciesId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bibliographicCitation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    references: {
      type: DataTypes.STRING,
      allowNull: true
    },
    institutionCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    collectionCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    establishmentMeans: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_species',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "val_species_pkey",
        unique: true,
        fields: [
          { name: "taxonId" },
        ]
      },
      {
        name: "val_species_taxonId_key",
        unique: true,
        fields: [
          { name: "taxonId" },
        ]
      },
    ]
  });
};
