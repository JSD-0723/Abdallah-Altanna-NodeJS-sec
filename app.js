import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import bookRoutes from './routes/bookRoutes.js';
import notFoundMiddleware from './middlewares/notFound.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', path.resolve('./dist'));

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.use(bookRoutes);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app is listening on port 3000!`);
});
