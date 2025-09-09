const { findEvery } = require("../services/queryHandler");
const { Ability } = require("../models");
class AbilityMapper {
  static abilityMap = {};
  static async getAbilityMap() {
    if (Object.keys(this.abilityMap).length === 0) {
      console.log("abilityMap Empty");
      const abilities = await findEvery(Ability, ["id", "abilityName"]);
      abilities.forEach((ability) => {
        this.abilityMap[ability.abilityName] = ability.id;
      });
    } else {
      console.log("ability Map full");
    }
    return this.abilityMap;
  }
}
/**
 * Finds the associations of a given model, if none found, returns null
 * @function findModelAssociations
 * @param {typeof import('sequelize').Model} model
 * @returns {import('sequelize').Includeable[]|null}
 */
const findModelAssociations = (model) => {
  return Object.keys(model.associations).length > 0 ? model.associations : null;
};

const getAssociationData = (jsonData, associationName) => {
  return jsonData.map((data) => {
    return data[associationName];
  });
};

/**
 * returns info on the associations of given model
 * @param {typeof import('sequelize').Model} model
 * @param {import('sequelize').Includeable[]} associations
 */
const processAssociations = (model, associations) => {
  Object.entries(associations).forEach(([alias, association]) => {
    const loadData = getAssociationData(jsonData, alias);
    console.log(
      `${model.name} has association: ${alias}, target model: ${association.target.name}`
    );
    // console.log(`data to load in ${JSON.stringify(loadData, null, 2)}`);
  });
};

/**
 * bulkCreate but handles creating for models with associations and checks for existing duplicates
 * @function bulkCreateWithAssociationNaive
 * @param {import ('sequelize').Model} model
 * @param {*} jsonData
 * @param {import ('sequelize').Transaction} transaction
 */
const bulkCreateWithAssociationNaive = (model, jsonData, transaction) => {
  switch (model.name) {
    case skill:
      bulkCreateSkill(model, jsonData, transaction);
      break;

    default:
      break;
  }
};

const bulkCreateSkill = (model, skillJSON, transaction) => {
  const abilityMap = new Map();
  const abilityNames = new Set();
  for (const skill of skillJSON) {
    abilityNames.add(skill.ability.abilityName);
  }
  const abilityQueryConditions = { where: { abilityName: [...abilityNames] } };
  const existingAbilities = findEvery(Ability, null, abilityQueryConditions);

  existingAbilities.forEach((a) => abilityMap.set(a.name, a));

  const newAbilities = [...abilityNames].filter(
    (aName) => !abilityMap.has(aName)
  );
};
module.exports = {
  AbilityMapper,
  findModelAssociations,
  processAssociations,
  bulkCreateWithAssociationNaive,
};
