const io = require('socket.io')(3001);

let queue = {
  flowerShop: [],
  candyShop: [],
};

io.on('connection', (socket) => {
  console.log('connected to', socket.id);

  socket.on('subscribe', (payload) => {
    if (payload === 'flower-shop') {
      socket.join('flower-shop');
    } else if (payload === 'candy-shop') {
      socket.join('candy-shop');
    }

  });

  socket.on('getAll', (payload) => {
    if (payload === 'flower-shop') {
      io.to('flower-shop').emit('orderQueue', queue.flowerShop);
    } else if (payload === 'candy') {
      io.to('candy-shop').emit('orderQueue', queue.candyShop);
    }
  });

  socket.on('delivered', (payload) => {
    if (payload.vendor === 'flower-shop') {
      queue.flower.push(payload);
      io.to('flower-shop').emit('delivered', payload);
    } else if (payload.vendor === 'candy-shop') {
      queue.candy.push(payload);
      io.to('candy-shop').emit('delivered', payload);
    }
  });

  socket.on('received', (payload) => {
    if (payload.vendor === 'flower-shop') {
      queue.flower.shift();
      io.to('flower-shop').emit('orderQueue', queue.flowerShop);
    } else if (payload.vendor === 'candy-shop') {
      queue.candy.shift();
      io.to('candy-shop').emit('orderQueue', queue.candyShop);
    }
  });
});
