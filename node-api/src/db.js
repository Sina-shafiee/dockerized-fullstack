const { Pool } = require('pg');
const fs = require('fs');

databaseUrl =
  process.env.DB_URL || fs.readFileSync(process.env.DB_URL_FILE, 'utf8');

const pool = new Pool({
  connectionString: databaseUrl
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function getDatabaseTime() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW() as now;');
    return res.rows[0];
  } catch (err) {
    console.error('Error fetching time from database:', err);
  } finally {
    await client.release();
  }
}
module.exports = { getDatabaseTime };
