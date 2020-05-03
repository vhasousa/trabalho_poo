import Book from '../models/Book';
import File from '../models/File';

class BookController {
  async store(req, res) {
    const {
      title, description, author, page_number, year, publishing_company, price, isbn, avatar,
    } = await Book.create(req.body, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      title,
      description,
      author,
      page_number,
      year,
      publishing_company,
      price,
      isbn,
      avatar,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const book = await Book.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [
        ['updated_at', 'DESC'],
      ],
    });

    return res.json(book);
  }

  async show(req, res) {
    const book = await Book.findByPk(req.params.id);

    return res.json(book);
  }

  async update(req, res) {
    const bookUpdate = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json(bookUpdate);
  }

  async delete(req, res) {
    await Book.destroy({ where: { id: req.params.id } });

    return res.send();
  }
}

export default new BookController();
