const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_status_level', {
    statusLevelId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    statusLevelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusLevelDesc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_status_level',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "val_status_level_pkey",
        unique: true,
        fields: [
          { name: "statusLevelId" },
        ]
      },
    ]
  });
};
