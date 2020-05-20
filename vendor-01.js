'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let orders = [];

socket.emit('subscribe', 'flower-shop');

socket.on('delivered', (payload) => {
  console.log(`Thank you for delivering order ${payload.orderId}`);
  socket.emit('received', payload);
});

socket.on('orderQueue', (payload) => {
  orders = payload;
});

socket.emit('getAll', 'flower-shop');

setInterval(() => {
  if (orders.length > 0) {
    let order = orders.shift();
    console.log(`Thank you for delivering order ${order.orderId}`);
    socket.emit('received', order);
  }
}, 3000);
