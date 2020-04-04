const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
  database: 'weekend-t-do-app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('Connected to Postgresql pool');
});

pool.on('error', (error) => {
  console.log('Error with Postgresql pool', error);
});

module.exports = pool;

//base file needed for pool. database is the main item that will change here
