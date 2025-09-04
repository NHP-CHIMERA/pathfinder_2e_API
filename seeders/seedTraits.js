"use strict";

const { massLoader } = require("../services/bulkDataHandler");
const { Trait } = require("../models");
const traitsJSON = require("../datadumps/trait.json");

const loadTraits = async (transaction) => {
  await massLoader(Trait, traitsJSON, transaction);
};

module.exports = loadTraits;
