const express = require('express');
const { ObjectId } = require('mongodb');

const { getDb } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('courses');
});

router.get('/:subject/:number', (req, res) => {
  getDb().collection('courses')
  .findOne({
    subject: req.params.subject.replaceAll('_', ' '),
    number: req.params.number
  })
  .then(doc => {res.status(200).json(doc)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch doc' })});
});

router.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    getDb().collection('courses')
    .findOne({ _id: ObjectId(req.params.id) })
    .then(doc => {res.status(200).json(doc)})
    .catch(err => {res.status(500).json({ error: 'Could not fetch doc' })});
  } else {
    res.status(500).json({ error: 'Invalid doc id' });
  }
});

module.exports = router;
