"use strict";
const skillJSON = require("../datadumps/skill.json");
const { Skill, Ability } = require("../models");
const { massLoader } = require("../services/bulkDataHandler");
const { findEvery } = require("../services/queryHandler");
const { AbilityMapper } = require("../utilities/helpers");
const loadSkills = async (transaction) => {
  const abilityMap = await AbilityMapper.getAbilityMap();
  let skillsData = skillJSON.map((skill) => {
    const loadAbility = abilityMap[skill.ability];
    return {
      skillName: skill.skillName,
      abilityId: loadAbility,
    };
  });
  await massLoader(Skill, skillsData, transaction);
};

module.exports = loadSkills;
