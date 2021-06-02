const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('<h1>XD</h1>');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
