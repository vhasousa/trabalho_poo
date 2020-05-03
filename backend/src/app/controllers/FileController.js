import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const images = await File.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [
        ['updated_at', 'DESC'],
      ],
    });

    return res.json(images);
  }

  async show(req, res) {
    const images = await File.findByPk(req.params.id);

    return res.json(images);
  }
}

export default new FileController();
