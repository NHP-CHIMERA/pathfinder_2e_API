"use strict";

const { massLoader } = require("../services/bulkDataHandler");
const { Ability } = require("../models");
const abilitiesJSON = require("../datadumps/ability.json");

const loadAbilities = async (transaction) => {
  await massLoader(Ability, abilitiesJSON, transaction);
};

module.exports = loadAbilities;
