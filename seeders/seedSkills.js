"use strict";
const { skillController } = require("../controllers/skillController");
const skillJSON = require("../datadumps/skill.json");
const { Skill, Ability } = require("../models");
const { massLoader } = require("../services/bulkDataHandler");
const { findEvery, findOne } = require("../services/queryHandler");
const { AbilityMapper } = require("../utilities/helpers");
const loadSkills = async (transaction) => {
  const skillsLoader = new skillController(transaction);
  await skillsLoader.createMultiple(skillJSON);
  console.log("loaded skills");
  // const abilityMap = await AbilityMapper.getAbilityMap();
  // let skillsData = skillJSON.map((skill) => {
  //   const loadAbility = abilityMap[skill.ability];
  //   // const cond = {
  //   //   where: { abilityName: skill.ability },
  //   // };
  //   // const dbAbility = await findOne(Ability, null, cond);
  //   return {
  //     skillName: skill.skillName,
  //     ability: skill.ability,
  //     abilityId: loadAbility,
  //   };
  // });
  // await massLoader(Skill, skillsData, transaction);
};

module.exports = loadSkills;
