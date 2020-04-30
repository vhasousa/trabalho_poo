import { Router } from 'express';

import BookController from './app/controllers/BookController';

const routes = new Router();

routes.get('/books', BookController.index);
routes.get('/books/:id', BookController.show);
routes.post('/books', BookController.store);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

export default routes;
