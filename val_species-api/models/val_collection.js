const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_collection', {
    collectionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    collectionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collectionDesc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    collectionUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    institutionCode: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'val_institution',
        key: 'institutionCode'
      }
    }
  }, {
    sequelize,
    tableName: 'val_collection',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "val_collection_pkey",
        unique: true,
        fields: [
          { name: "collectionCode" },
        ]
      },
    ]
  });
};
