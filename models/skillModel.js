/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      skillName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue("skillName", value.toLowerCase());
        },
      },
    },
    { timestamps: false }
  );
  Skill.associate = (db) => {
    Skill.belongsTo(db.Ability, { foreignKey: "abilityId", as: "ability" });
  };
  return Skill;
};
