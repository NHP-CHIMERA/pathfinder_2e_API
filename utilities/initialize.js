const db = require("../models/index");
const loadAbilities = require("../seeders/seedAbilities");
const loadSkills = require("../seeders/seedSkills");
const loadTraits = require("../seeders/seedTraits");
const loadAncestries = require("../seeders/seedAncestries");
const loadHeritages = require("../seeders/seedHeritages");

const initializeDb = async () => {
  try {
    await db.sequelize.query(`DROP SCHEMA IF EXISTS public CASCADE;`);
    await db.sequelize.query(`CREATE SCHEMA IF NOT EXISTS public;`);
    await db.sequelize.query(`GRANT ALL ON SCHEMA public TO postgres;`);
    await db.sequelize.query(`GRANT ALL ON SCHEMA public TO public;`);
    await db.sequelize.sync({ force: true });
    await db.sequelize.transaction(async (t) => {
      // await loadAbilities(t);
      await loadSkills(t);
      // await loadTraits(t);
      // await loadAncestries(t);
      // await loadHeritages(t);
    });
  } catch (error) {
    console.error("Failed to load data", error);
  } finally {
    await db.sequelize.close();
  }
};

module.exports = initializeDb;
