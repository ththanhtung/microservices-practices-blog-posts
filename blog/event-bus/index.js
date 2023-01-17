const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const events = [];

const port = process.env.PORT || 4005;

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});