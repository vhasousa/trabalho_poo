import Sequelize, { Model } from 'sequelize';

class Book extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      author: Sequelize.STRING,
      year: Sequelize.INTEGER,
      publishing_company: Sequelize.STRING,
      price: Sequelize.DECIMAL(10, 2),
    },
    {
      sequelize,
    });
  }
}

export default Book;
