const server = require('net').createServer();

let counter = 0;

let sockets = {}

server.on('connection', (socket) => {
    socket.id = counter++
    sockets[socket.id] = socket

    socket.write('welcome new client !!')

    socket.on('data', data => {
        for (const [id, sock] of Object.entries(sockets)) {
            if (id === socket.id) return;
            sock.write(`\n${socket.id}  : `);
            sock.write(data)
        }
    })

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log("Client disconnected");
    })
})


server.listen(4000, () => console.log("Server listing"))