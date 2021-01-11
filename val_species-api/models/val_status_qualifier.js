const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_status_qualifier', {
    statusQualifierId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    statusQualifierName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusQualifierDesc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_status_qualifier',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "val_status_qualifier_pkey",
        unique: true,
        fields: [
          { name: "statusQualifierId" },
        ]
      },
    ]
  });
};
