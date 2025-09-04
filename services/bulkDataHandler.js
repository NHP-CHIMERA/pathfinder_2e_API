"use strict";
const util = require("node:util");
module.exports = {
  massLoader: async (model, data, transaction) => {
    console.log("Model:", model);
    console.log("Data:", data);
    try {
      const results = await model.bulkCreate(data, transaction);
      if (Object.keys(model.associations).length > 0) {
        Object.entries(model.associations).forEach(([name, association]) => {
          console.log(
            `${model.name} has association: ${name}, target: ${association.target.name}`
          );
        });
      }
      return results;
    } catch (error) {
      console.error(
        `Error loading mass of data: ${util.inspect(data, {
          depth: null,
          colors: true,
          showHidden: true,
        })} for ${model.name}. Error: `,
        error
      );
    }
  },
};
