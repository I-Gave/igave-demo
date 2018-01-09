'use strict';

const mongoose = require('mongoose');
const Models = require('./models')(mongoose);

class DatabaseAPI {
  constructor(options) {
    if (!(this instanceof DatabaseAPI))
      return new DatabaseAPI(options);

    if (!options)
      options = {};

    this.connectionString = options.url || 'localhost';
    this.databaseName     = options.dbName || 'igave';

    this.connect();
    this.initModels();
  }

  connect() {
    mongoose.connect(this.connectionString, this.databaseName);
  }

  initModels() {
    for (const key in Models) {
      if (this[key]) {
        console.log(`${key} is already defined on db`);
      } else {
        this[key] = mongoose.model(key, Models[key]);
      }
    }
  }

  async get(model, qryObj) {
    let entries;
    if (!qryObj)
      qryObj = {};

    try {
      entries = await this[model].get(qryObj);
    } catch (e) {
      console.log(e);
    }
    return entries;
  }

  async save(model, obj) {
    await this[model].saveEntry(obj);
  }

}

module.exports = DatabaseAPI;
