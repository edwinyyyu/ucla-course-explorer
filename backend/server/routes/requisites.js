const express = require('express');
const { ObjectId } = require('mongodb');

const { getDb } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  getDb().collection('requisites')
  .find()
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/id/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    getDb().collection('requisites')
    .findOne({
      _id: ObjectId(req.params.id)
    })
    .then(doc => {res.status(200).json(doc)})
    .catch(err => {res.status(500).json({ error: 'Could not fetch doc' })});
  } else {
    res.status(500).json({ error: 'Invalid doc id' });
  }
});

router.get('/source/subject/:subject', (req, res) => {
  getDb().collection('requisites')
  .find({
    source_subject: req.params.subject.replaceAll('_', ' ')
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/source/subject/:subject/number/:number', (req, res) => {
  getDb().collection('requisites')
  .find({
    source_subject: req.params.subject.replaceAll('_', ' '),
    source_number: req.params.number
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/target/subject/:subject', (req, res) => {
  getDb().collection('requisites')
  .find({
    target_subject: req.params.subject.replaceAll('_', ' ')
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

router.get('/target/subject/:subject/number/:number', (req, res) => {
  getDb().collection('requisites')
  .find({
    target_subject: req.params.subject.replaceAll('_', ' '),
    target_number: req.params.number
  })
  .toArray()
  .then(docs => {res.status(200).json(docs)})
  .catch(err => {res.status(500).json({ error: 'Could not fetch docs' })});
});

module.exports = router;
