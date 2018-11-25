import express from 'express';
import path from 'path';

const port = parseInt(process.env.PORT, 10) || 3000;
const app = express();

app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
