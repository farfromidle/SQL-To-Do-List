const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  //   console.log(req.body);

  const queryString = `INSERT INTO "task" ("taskDo") VALUES ($1);`;
  //unsure why this isn't appending
  console.log(req.body.task);

  pool
    .query(queryString, [req.body.task])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.get('/', (req, res) => {
  const queryString = `SELECT * FROM "task"`;

  pool
    .query(queryString)
    .then((response) => {
      console.log(response.rows);
      //response object is big. Pulls from the data inside this object
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.put('/:id', (req, res) => {
  //  console.log(req.params.id);
  //  console.log(req.body);
  //const newTask = !req.body.taskComplete;
  //   console.log(req.body.taskComplete);
  let newTask = true;

  if (req.body.taskComplete == 'true') {
    newTask = false;
  } else {
    newTask = true;
  }
  const queryString = `UPDATE 'task' SET 'taskComplete'=$1 WHERE id=$2;`;

  pool
    .query(queryString, [newTask, req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  const queryString = `DELETE FROM 'task' WHERE id=$1;`;

  pool
    .query(queryString, [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
  res.send(200);
});

module.exports = router;
//import this router
