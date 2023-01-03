const express = require('express');

const coursesRoutes = require('./routes/courses');
const requisitesRoutes = require('./routes/requisites');

const { connectToDb } = require('./db');

const app = express();

connectToDb(err => {
  if (!err) {
    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/mongo', (req, res) => {
  res.send('test');
});

// Routes
app.use('/api/courses', coursesRoutes);
app.use('/api/requisites', requisitesRoutes);

// Error 404
app.use((req, res) => {
  res.status(404).send('<p>404 Not Found</p>');
});
