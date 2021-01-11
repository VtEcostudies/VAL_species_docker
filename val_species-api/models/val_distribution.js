const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_distribution', {
    distributionId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    taxonId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stateRank: {
      type: DataTypes.STRING,
      allowNull: true
    },
    federalListing: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sgcn: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    locationType: {
      type: DataTypes.ENUM("state", "county", "town", "village", "biophysical_region"),
      allowNull: true
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lifeStage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    occurrenceStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    threatStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    establishmentMeans: {
      type: DataTypes.STRING,
      allowNull: true
    },
    appendixCITES: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    startDayOfYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    endDayOfYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    occurrenceRemarks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datasetId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_distribution',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "val_distribution_pkey",
        unique: true,
        fields: [
          { name: "distributionId" },
        ]
      },
    ]
  });
};
