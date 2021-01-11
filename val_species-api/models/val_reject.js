const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_reject', {
    rejectReason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gbifId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taxonId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: true
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
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phylum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phylumId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order: {
      type: DataTypes.STRING,
      allowNull: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    family: {
      type: DataTypes.STRING,
      allowNull: true
    },
    familyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genusId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    },
    speciesId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_reject',
    schema: 'public',
    timestamps: false
  });
};
