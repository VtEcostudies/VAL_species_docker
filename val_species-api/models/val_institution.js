const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_institution', {
    institutionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    institutionDesc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_institution',
    schema: 'public',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "val_institution_pkey",
        unique: true,
        fields: [
          { name: "institutionCode" },
        ]
      },
    ]
  });
};
