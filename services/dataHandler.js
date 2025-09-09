/**
 * @async
 * @function findCreate
 * @param {typeof import('sequelize').Model} model
 * @param {Object} conditions - the conditions of the selection to find possibly already existing model instance
 * @param {Object} inputInfo - the data to use to create a new instance of the model
 * @returns {(Promise<import('sequelize').Model>|null)}
 */
const findCreate = async (model, conditions, inputInfo, returnRecord) => {
  try {
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
/**
 * @async
 * @function create
 * @param {typeof import('sequelize').Model} model
 * @param {Object} data - the data to be inserted into the database
 * @param {Object} inputInfo - the data to use to create a new instance of the model
 * @returns {(Promise<import('sequelize').Model>|null)}
 */
const create = async (model, data) => {
  try {
    result = model.create(data);
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

/**
 * @async
 * @function bulkCreate
 * @param {typeof import('sequelize').Model} model
 * @param {Object} data - the data to be inserted into the database
 * @param {Object} inputInfo - the data to use to create a new instance of the model
 * @returns {(Promise<import('sequelize').Model>|null)}
 */
const createBulk = async (model, data) => {
  try {
    model.bulkCreate(data);
  } catch (error) {
    console.error(
      `Error loading mass of massData: ${util.inspect(massData, {
        depth: null,
        colors: true,
        showHidden: true,
      })} for ${model.name}. Error: `,
      error
    );
  }
};
module.exports = {
  findCreate,
  create,
};
