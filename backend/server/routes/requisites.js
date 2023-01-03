const express = require('express');
const { ObjectId } = require('mongodb');

const { getDb } = require('../db');

const router = express.Router();

const db = getDb();

router.get('/', (req, res) => {
  res.send('requisites');
});

router.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    getDb().collection('requisites')
    .findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {res.status(200).json(doc)})
    .catch(err => {res.status(500).json({ error: 'Could not fetch doc' })});
  } else {
    res.status(500).json({ error: 'Invalid doc id' });
  }
});

module.exports = router;
