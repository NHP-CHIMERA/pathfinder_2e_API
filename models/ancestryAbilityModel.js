/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const AncestryAbility = sequelize.define("AncestryAbility", {
    ancestryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    abilityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("flaw", "boost"),
      allowNull: false,
    },
  });
  return AncestryAbility;
};
