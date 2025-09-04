"use strict";

const { massLoader } = require("../services/bulkDataHandler");
const { Ancestry } = require("../models");
const ancestryJSON = require("../datadumps/ancestry.json");
const { AbilityMapper } = require("../utilities/helpers");
const loadAncestry = async (transaction) => {
  const abilityMap = await AbilityMapper.getAbilityMap();
  // let ancestryData = ancestryJSON.map((ancestry) => {
  //   const boosts = ancestry["abilityAttributeBoosts"].map((boost) => {
  //     return abilityMap[boost];
  //   });
  //   const flaws = ancestry["abilityAttributeFlaws"].map((flaw) => {
  //     return abilityMap[flaw];
  //   });
  //   ancestry["abilities"] = [
  //     //abilityId = 1
  //     //ancestryId =
  //   ];
  //   ancestry["abilityBoosts"] = boosts;
  //   ancestry["abilityFlaws"] = flaws;

  //   return ancestry;
  // });
  const loadedAncestries = await massLoader(
    Ancestry,
    ancestryJSON,
    transaction
  );
};

module.exports = loadAncestry;
