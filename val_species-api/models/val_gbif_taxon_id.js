const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('val_gbif_taxon_id', {
    gbifId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'val_gbif_taxon_id',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "val_gbif_taxon_id_pkey",
        unique: true,
        fields: [
          { name: "gbifId" },
        ]
      },
    ]
  });
};
