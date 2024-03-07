const io = require('socket.io')();

io.on('connection', (client) => {
    let counter = 0;
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            counter++;
            client.emit('timer', counter);
        }, 1000);
    });
});


const port = 8001;
io.listen(port);
console.log('listening on port ', port);