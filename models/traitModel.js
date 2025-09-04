/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Trait = sequelize.define(
    "Trait",
    {
      traitName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      traitDescription: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
  Trait.associate = (db) => {
    Trait.belongsToMany(db.Ancestry, {
      through: "AncestryTrait",
      foreignKey: "traitId",
      as: "ancestries",
    });
  };
  return Trait;
};
