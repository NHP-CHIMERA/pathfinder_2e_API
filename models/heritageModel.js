/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Heritage = sequelize.define(
    "Heritage",
    {
      heritageName: {
        type: DataTypes.STRING,
      },
      heritageDescription: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
  return Heritage;
};
