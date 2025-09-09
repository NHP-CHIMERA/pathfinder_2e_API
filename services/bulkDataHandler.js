"use strict";
const util = require("node:util");
const {
  findModelAssociations,
  processAssociations,
  bulkCreateWithAssociationNaive,
} = require("../utilities/helpers");
/**
 *
 * @param {typeof import('sequelize').Model} model
 * @param {*} massData
 * @param {*} transaction
 * @returns
 */
const massLoader = async (model, massData, transaction) => {
  console.log("Model:", model);
  console.log("Data:", massData);
  try {
    //build everything pertaining to the model from the json massData
    let results;
    // if (Object.keys(model.associations).length > 0) {
    //   //handling models with associations
    //   Object.entries(model.associations).forEach(([name, association]) => {
    //     console.log(
    //       `${model.name} has association: ${name}, target: ${association.target.name}`
    //     );
    //   });
    // }
    const modelAssociations = findModelAssociations(model);
    if (modelAssociations) {
      // processAssociations(model, modelAssociations);
      bulkCreateWithAssociationNaive(model, massData);
    }
    results = await model.bulkCreate(massData, { transaction: transaction });
    return results;
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
  massLoader,
};
