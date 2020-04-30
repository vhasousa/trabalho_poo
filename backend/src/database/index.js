import Sequelize from 'sequelize';

import Book from '../app/models/Book';

import databaseConfig from '../config/database';

const models = [Book];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
