'use strict';
const express = require('express');

const cors = require('cors');
const app = express();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());




app.post('/delivery/:vendor/:orderId', (req, res, next) => {
  const payload = {
    vendor: req.params.vendor,
    orderId: req.params.orderId,
  };
  console.log('delivery', payload);
  if (!(payload.vendor === 'flower' || payload.vendor === 'candy')) {
    res.status(400);
    res.send('Incorrect order type');
  } else {
    socket.emit('delivered', payload);
    res.status(200);
    res.send('Sent order to queue');
  }
});

app.listen(3000, () => {
  console.log('Never Give up on 3000');
});
