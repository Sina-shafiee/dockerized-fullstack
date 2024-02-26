const express = require('express');

const { getDatabaseTime } = require('./db');

const app = express();

app.get('/', async (req, res) => {
  const time = await getDatabaseTime();
  res.json({ time, hi: 'hello' });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
  console.log({ node_env: process.env.NODE_ENV });
});
