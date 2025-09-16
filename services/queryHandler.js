"use strict";

const util = require("node:util");
/**
 * @async
 * @function findEvery
 * @param {typeof import('sequelize').Model} model
 * @param {Object} [options]  - the options to modify the selection
 * @param {Object} [options.attributes]  - the attributes to return from the model
 * @param {Object} [options.conditions]  - the conditions to apply to the selection
 * @returns {Promise<import('sequelize').Model[]>}
 */
const findEvery = async (model, options) => {
  try {
    const { attributes, conditions } = options;
    const results = await model.findAll({
      where: conditions,
      attributes: attributes,
    });
    return results;
  } catch (error) {
    console.error(
      `Error getting all instances of model: ${
        model.name
      } when using search conditions: ${util.inspect(conditions, {
        depth: null,
        colors: true,
        showHidden: true,
      })} and calling for attributes: ${util.inspect(attributes, {
        depth: null,
        colors: true,
        showHidden: true,
      })}`
    );
  }
};
/**
 * @async
 * @function findOne
 * @param {typeof import('sequelize').Model} model
 * @param {Object} options - the options to modify the selection
 * @param {Object} [options.attributes]  - the attributes to return from the model
 * @param {Object} [options.conditions]  - the conditions to apply to the selection
 * @returns {Promise<import('sequelize').Model>}
 */
const findOne = async (model, options) => {
  try {
    const { attributes, conditions } = options;
    const result = await model.findOne({
      where: conditions,
      attributes: attributes,
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
};

module.exports = {
  findEvery,
  findOne,
};
