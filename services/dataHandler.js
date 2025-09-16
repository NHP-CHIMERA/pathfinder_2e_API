const util = require("node:util");

/**
 * @async
 * @function create
 * @param {typeof import('sequelize').Model} model
 * @param {Object} data - the data to be inserted into the database
 * @param {Object} [options] - the options to pass into the sequelize create function
 * @param {Object} [options.createTransaction] - tranasction to run operation under
 * @param {Object} [options.isReturning = false] - indicates whether to return created instances, default false
 * @returns {Promise<import('sequelize').Model>}
 */
const create = async (model, data, options) => {
  const { isReturning = true, createTransaction } = options;
  try {
    return await model.create(data, {
      transaction: createTransaction,
      returning: isReturning,
    });
  } catch (error) {
    console.error(
      `Error creating instance of model: ${
        model.name
      } when using data: ${util.inspect(data, {
        depth: null,
        colors: true,
      })}, Error:`
    );
  }
};

/**
 * @async
 * @function createBulk
 * @param {typeof import('sequelize').Model} model - specific database model
 * @param {Object} data - the data to be inserted into the database
 * @param {Object} [options] - the options to be used in the creation
 * @param {Object} [options.bulkTransaction] - tranasction to run operation under
 * @param {Object} [options.isReturning = false] - indicates whether to return created instances, default false
 * @returns {Promise<import('sequelize').Model[]>}
 */
const createBulk = async (model, data, options) => {
  try {
    const { isReturning = false, bulkTransaction } = options;

    return await model.bulkCreate(data, {
      transaction: bulkTransaction,
      returning: isReturning,
    });
  } catch (err) {
    console.error(
      `Error creating multiple instances of model: ${
        model.name
      } when using data: ${util.inspect(data, {
        depth: null,
        colors: true,
      })}:`,
      err.message
    );
    throw err;
  }
};

/**
 * @async
 * @function findCreate
 * @param {typeof import('sequelize').Model} model
 * @param {Object} conditions - the conditions of the selection to find possibly already existing model instance
 * @param {Object} options - the data to use to create a new instance of the model
 * @returns {(Promise<import('sequelize').Model>|null)}
 */
const findCreate = async (model, conditions, options) => {
  try {
    const { inputInfo, returnRecord } = options;
    if (returnRecord) {
      const [record, created] = await model.findOrCreate({
        where: conditions,
        defaults: inputInfo,
      });
      if (created) {
        console.log(`instance of model with info ${defaultInfo}`);
      }
      return record;
    } else {
      await model.findOrCreate({
        where: conditions,
        defaults: inputInfo,
      });
    }
  } catch (error) {
    console.error(
      `Error finding or creating if does not exist instance of model: ${
        model.name
      } when using conditions: ${util.inspect(conditions, {
        depth: null,
        colors: true,
      })} and inputdata: ${util.inspect(inputInfo, {
        depth: null,
        colors: true,
      })}`
    );
  }
};
module.exports = {
  findCreate,
  create,
  createBulk,
};
