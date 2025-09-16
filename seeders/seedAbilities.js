"use strict";

const { massLoader } = require("../services/bulkDataHandler");
const { Ability } = require("../models");
const abilitiesJSON = require("../datadumps/ability.json");
const { abilityController } = require("../controllers/abilityController");

const loadAbilities = async (transaction) => {
  const abilityLoader = new abilityController(transaction);
  await abilityLoader.createMultiple(abilitiesJSON);
  console.log("loaded abilities");
  // await massLoader(Ability, abilitiesJSON, transaction);
};

module.exports = loadAbilities;
