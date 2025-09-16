const { create, createBulk } = require("../services/dataHandler");
const { Ability } = require("../models");
const { modelController } = require("../utilities/modelController");
const { findEvery, findOne } = require("../services/queryHandler");

class abilityController extends modelController {
  /**
   *
   * @param {import('sequelize').Transaction} transactionT - Transaction instance to assign to this controller
   */
  constructor(transactionT) {
    /**
     * @type {typeof import('sequelize').Model}
     */
    super(transactionT);
    this.abilityModel = Ability;
  }
  /**
   *
   * @param {Object} abilitesData - array of map of unique abilities
   * @param {Object} options - the options to pass to createBulk
   */
  async createMultiple(abilitesData, options) {
    //abilitiesData is array of map of unique abilities -> {abilityName: name of ability}

    const abilities = {};
    // extract data into mapping
    abilitesData.forEach((ability) => {
      const aName = ability.abilityName;
      if (!abilities[aName]) {
        abilities[aName] = ability;
      }
    });
    const abilityNames = Object.keys(abilities);

    //get all abilities already existing
    const existingAbilities = await this.getAll({
      attributes: { abilityName: abilityNames },
    });

    const exisitngMap = {};
    existingAbilities.map((ability) => {
      exisitngMap[ability.abilityName];
    });

    // create any abilities that dont yet exist
    const toCreate = abilityNames.filter((aName) => !exisitngMap[aName]);
    const toCreateFormatted = toCreate.map((abilityName) => ({ abilityName }));

    options["bulkTransaction"] = this.transaction;
    options["isReturning"] = true;

    return await createBulk(this.abilityModel, toCreateFormatted, options);
  }
}

module.exports = {
  abilityController,
};
