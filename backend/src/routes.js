import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import BookController from './app/controllers/BookController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/books', BookController.index);
routes.get('/books/:id', BookController.show);
routes.post('/books', BookController.store);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

routes.get('/files', FileController.index);
routes.get('/files/:id', FileController.show);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
