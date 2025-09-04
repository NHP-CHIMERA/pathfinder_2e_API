/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Background = sequelize.define("Background", {
    backgroundName: {
      type: DataTypes.STRING,
    },
    backgroundDescription: {
      type: DataTypes.TEXT,
    },
    backgroundFeats: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
  return Background;
};
