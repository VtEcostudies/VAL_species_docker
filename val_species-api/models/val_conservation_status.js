const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_conservation_status', {
    taxonId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'val_species',
        key: 'taxonId'
      },
      unique: "unique_conservation_status_taxonId"
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SGCN: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    stateRank: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    globalRank: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    federalList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    stateList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_conservation_status',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "unique_conservation_status_taxonId",
        unique: true,
        fields: [
          { name: "taxonId" },
        ]
      },
    ]
  });
};
