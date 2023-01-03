const express = require('express');

const credentials = require('./credentials');

const app = express();

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.get('/mongo', (request, response) => {
  response.send('test');
});

app.use((request, response) => {
  response.status(404).send('<p>404 Not Found</p>');
});
