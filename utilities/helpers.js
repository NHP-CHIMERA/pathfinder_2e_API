const { findEvery } = require("../services/queryHandler");
const { Ability } = require("../models");
class AbilityMapper {
  static abilityMap = {};
  static async getAbilityMap() {
    if (Object.keys(this.abilityMap).length === 0) {
      const abilities = await findEvery(Ability, ["id", "abilityName"]);
      abilities.forEach((ability) => {
        this.abilityMap[ability.abilityName] = ability.id;
      });
    }
    return this.abilityMap;
  }
}

module.exports = {
  AbilityMapper,
};
