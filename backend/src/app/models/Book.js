import Sequelize, { Model } from 'sequelize';

class Book extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      author: Sequelize.STRING,
      page_number: Sequelize.INTEGER,
      year: Sequelize.INTEGER,
      publishing_company: Sequelize.STRING,
      price: Sequelize.DECIMAL(10, 2),
      isbn: Sequelize.INTEGER,
    },
    {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }
}

export default Book;
