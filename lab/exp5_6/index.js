const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/home/', (req, res) => {
  res.send('at home');
});

app.get('/api/', (req, res) => {
  const obj = [{ name: "sonal", college: "upes" }];
  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});