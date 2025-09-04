"use strict";

const { massLoader } = require("../services/bulkDataHandler");
const { DirectHeritage, Heritage } = require("../models");
const universalheritagesJSON = require("../datadumps/universalHeritage.json");
const directheritagesJSON = require("../datadumps/directHeritage.json");

const loadHeritage = async (transaction) => {
  //   await massLoader(DirectHeritage, directheritagesJSON, transaction);
  await massLoader(Heritage, universalheritagesJSON, transaction);
};

module.exports = loadHeritage;
