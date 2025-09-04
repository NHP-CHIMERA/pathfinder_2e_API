/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Ability = sequelize.define(
    "Ability",
    {
      abilityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  Ability.associate = (db) => {
    Ability.hasMany(db.Skill, { foreignKey: "abilityId", as: "skills" });
    Ability.belongsToMany(db.Ancestry, {
      through: "AncestryAbility",
      foreignKey: "abilityId",
      as: "ancestries",
    });
  };
  return Ability;
};
