const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_status_scope', {
    statusScopeId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    statusScopeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusScopeDesc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'val_status_scope',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "val_status_scope_pkey",
        unique: true,
        fields: [
          { name: "statusScopeId" },
        ]
      },
    ]
  });
};
