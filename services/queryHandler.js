"use strict";

const util = require("node:util");
const { where } = require("sequelize");
module.exports = {
  findEvery: async (model, attrs, conditions) => {
    console.log("Model: ", model);
    try {
      const results = await model.findAll({
        where: conditions,
        attributes: attrs,
      });
      return results;
    } catch (error) {
      console.error(
        `Error getting all instances of model: ${
          model.name
        } when using conditions: ${util.inspect(conditions, {
          depth: null,
          colors: true,
          showHidden: true,
        })}`
      );
    }
  },
  findOne: async (model, attrs, conditions) => {
    console.log("Models:", model);
    try {
      const result = await model.findOne({
        where: conditions,
        attributes: attrs,
      });
      return result;
    } catch (error) {
      console.error(
        `Error finding instance of model: ${
          model.name
        } when using conditions: ${util.inspect(conditions, {
          depth: null,
          colors: true,
          showHidden: true,
        })}`
      );
    }
  },
};
