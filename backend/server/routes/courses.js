const express = require('express');
const { ObjectId } = require('mongodb');

const { getDb } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  getDb().collection('courses')
  .find()
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/id/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    getDb().collection('courses')
    .findOne({
      _id: ObjectId(req.params.id)
    })
    .then(doc => {res.status(200).json(doc)})
    .catch(err => {res.status(500).json({ error: 'Could not fetch doc' })});
  } else {
    res.status(500).json({ error: 'Invalid doc id' });
  }
});

router.get('/level/:level', (req, res) => {
  getDb().collection('courses')
  .find({
    level: req.params.level.replaceAll('_', ' ')
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/subject/:subject', (req, res) => {
  getDb().collection('courses')
  .find({
    subject: req.params.subject.replaceAll('_', ' ')
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/subject/:subject/level/:level', (req, res) => {
  getDb().collection('courses')
  .find({
    subject: req.params.subject.replaceAll('_', ' '),
    level: req.params.level.replaceAll('_', ' ')
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/subject/:subject/number/:number', (req, res) => {
  getDb().collection('courses')
    .findOne({
      subject: req.params.subject.replaceAll('_', ' '),
      number: req.params.number
    })
    .then(doc => {res.status(200).json(doc)})
    .catch(err => {res.status(500).json({ error: 'Could not fetch doc' })});
});

module.exports = router;
