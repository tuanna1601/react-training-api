const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

let users = [
  {
    name: 'Helen',
    birthday: '1999-01-10',
    gender: 'female'
  },
  {
    name: 'Paris',
    birthday: '1999-02-12',
    gender: 'male'
  },
  {
    name: 'Richard',
    birthday: '1999-01-19',
    gender: 'male'
  }
];

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(bodyParser());

app.get('/users', (req, res) => res.send(users));

app.post('/users', (req, res) => {
  users.push(req.body);
  console.log(users);
  res.send(req.body);
});

app.put('/users/:userId', (req, res) => {
  const { userId } = req.params;
  users[userId] = req.body;

  res.send(users[userId]);
});

app.delete('/users/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  users = [...users.slice(0, userId), ...users.slice(userId + 1)];

  res.send(users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
