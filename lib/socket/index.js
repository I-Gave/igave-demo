'use strict';

module.exports = function() {
  const io = require('socket.io')(4000);

  io.on('connection', (socket) => {
    console.log('connection');

    socket.on('getEntries', async () => {
      socket.emit('complete');
    });
  });
};
