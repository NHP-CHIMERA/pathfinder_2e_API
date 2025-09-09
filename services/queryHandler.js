"use strict";

const util = require("node:util");
/**
 * @async
 * @function findEvery
 * @param {typeof import('sequelize').Model} model
 * @param {Object} attrs - the specific attributes to return
 * @param {Object} conditions - the conditions of the selection
 * @returns {Promise<import('sequelize').Model[]>}
 */
const findEvery = async (model, attrs, conditions) => {
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
};
/**
 * @async
 * @function findOne
 * @param {typeof import('sequelize').Model} model
 * @param {Object} attrs - the specific attributes to return
 * @param {Object} conditions - the conditions of the selection
 * @returns {Promise<import('sequelize').Model>}
 */
const findOne = async (model, attrs, conditions) => {
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
};

module.exports = {
  findEvery,
  findOne,
};
