import openSocket from 'socket.io-client';
export const socket = openSocket.connect('http://localhost:8000');

export const subscribeToTimer = (interval, cb) => {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
};