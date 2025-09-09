const { create } = require("../services/dataHandler");
const { Ability } = require("../models");
class abilityController {
  createAbility(abilityData) {
    createBulk(Ability, abilityData);
  }
}
