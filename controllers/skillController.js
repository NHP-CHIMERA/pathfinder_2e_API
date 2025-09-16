const { createBulk } = require("../services/dataHandler");

const { Skill, Ability } = require("../models");
const { findOne, findEvery } = require("../services/queryHandler");
const { modelController } = require("../utilities/modelController");
const { abilityController } = require("./abilityController");
class skillController extends modelController {
  constructor(transactionT) {
    super(Skill, transactionT);
  }

  async createAbilities(skillsData) {
    const abilitiesToCreate = skillsData.map((skill) => {
      return skill["ability"];
    });
    console.log(abilitiesToCreate);
    //extracting unique

    //get unique abilities from data

    // const abilityNames = Object.keys(uniqueAbilities);

    // const abilityLoader = new abilityController(this.transaction);

    // const existingAbilities = await abilityLoader.getAll({
    //   attributes: { abilityName: abilityNames },
    // });
    // const exisitngMap = {};
    // existingAbilities.map((ability) => {
    //   exisitngMap[ability.abilityName];
    // });

    // create any abilities that dont yet exist
    // create bulkFindCreate function in dataHandler.js
    // const toCreate = abilityNames.filter((aName) => !exisitngMap[aName]); //abilities to create as they do not exist yet
    // const toCreateFormatted = toCreate.map((abilityName) => ({ abilityName }));

    // const newAbilitiesOptions = { isReturning: true };
    // const newAbilitiesOptions = { returning: true };
    // const newAbilities = await abilityLoader.createMultiple(
    //   toCreateFormatted,
    //   newAbilitiesOptions
    // );
    // const newAbilities = await abilityLoader.createMultiple(toCreateFormatted);
    // //adding newly created abilites to map of existing abilities
    // newAbilities.forEach((ability) => {
    //   exisitngMap[ability.abilityName] = ability.id;
    // });

    return abilitiesToCreate;
  }
  /**
   *
   * @param {Object} skillsData - the data
   */
  async createMultiple(skillsData) {
    // const exisitngMap = await this.createAbilities(skillsData);
    const abilitiesToCreate = skillsData.map((skill) => {
      return skill["ability"];
    });

    const abilityLoader = new abilityController(this.transaction);
    //fix this somehow, get rid of {} being load bearing
    const createdAbilities = await abilityLoader.createMultiple(
      abilitiesToCreate,
      {}
    );

    // console.log(createdAbilities);
    const exisitngMap = {};
    createdAbilities.forEach((ability) => {
      exisitngMap[ability.abilityName] = ability.id;
    });

    const skillsToCreate = skillsData.map((skill) => ({
      skillName: skill.skillName,
      abilityId: exisitngMap[skill.ability.abilityName],
    }));
    return await createBulk(this.model, skillsToCreate, {
      bulkTransaction: this.transaction,
    });
  }
}
module.exports = {
  skillController,
};
