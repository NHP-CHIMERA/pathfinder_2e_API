const { findEvery, findOne } = require("../services/queryHandler");

class modelController {
  constructor(modelM, transactionT) {
    this.transaction = transactionT;
    this.model = modelM;
  }

  async getAll(options) {
    return await findEvery(this.model, options);
  }
  async getOne(options) {
    return await findOne(this.model, options);
  }
}
module.exports = { modelController };
