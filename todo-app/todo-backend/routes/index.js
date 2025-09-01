const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')
// redis.setAsync("counter", 0)

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const counter = await redis.getAsync("counter")
  res.send({
    added_todos: counter
  })
})

module.exports = router;
