import Book from '../models/Book';

class BookController {
  async store(req, res) {
    const book = await Book.create(req.body);

    return res.json(book);
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
