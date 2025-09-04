const { STRING } = require("sequelize");

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Ancestry = sequelize.define(
    "Ancestry",
    {
      ancestryName: {
        type: DataTypes.STRING,
      },
      ancestryDescription: {
        type: DataTypes.TEXT,
      },
      ancestryHitPoints: {
        type: DataTypes.INTEGER,
      },
      ancestrySize: {
        type: DataTypes.ENUM,
        values: ["tiny", "small", "medium", "large"],
      },
      ancestrySpeed: {
        type: DataTypes.INTEGER,
        validate: {
          min: 10,
        },
      },
      freeAttributeBoosts: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      ancestryFeatures: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
  Ancestry.associate = (db) => {
    Ancestry.hasMany(db.DirectHeritage, {
      foreignKey: "heritageId",
      as: "heritages",
    });
    Ancestry.belongsToMany(db.Ability, {
      through: "AncestryAbility",
      foreignKey: "ancestryId",
      as: "abilities",
    });
    Ancestry.belongsToMany(db.Trait, {
      through: "AncestryTrait",
      foreignKey: "ancestryId",
      as: "traits",
    });
    //Ancestry.hasMany(db.)
  };
  return Ancestry;
};
