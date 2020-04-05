const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  //   console.log(req.body);

  const queryString = `INSERT INTO "weekend-to-do-app" ("taskDo") VALUES ($1);`;
  //unsure why this isn't appending
  console.log(req.body.task);

  pool
    .query(queryString, [req.body.taskDo])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.get('/', (req, res) => {
  const queryString = `SELECT * FROM "taskDo"`;

  pool
    .query(queryString)
    .then((response) => {
      console.log(response.rows);

      res.sendStatus(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;
//import this router
