/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const DirectHeritage = sequelize.define(
    "DirectHeritage",
    {
      directHeritageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      directHeritageDescription: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
  DirectHeritage.associate = (db) => {
    DirectHeritage.belongsTo(db.Ancestry, { foreignKey: "ancestryId" });
  };
  return DirectHeritage;
};
