const server = require('net').createServer();
const fs = require('fs');
const path = require('path');

let counter = 0;

let sockets = {}

const fileName = `chat_log_${new Date().toDateString()}.txt`
const fileNamePath = path.join('chat_logs', fileName)
const writeStream = fs.createWriteStream(fileNamePath);

//TODO: MD file



server.on('connection', (socket) => {
    socket.id = counter++
    sockets[socket.id] = socket

    socket.write('welcome new client !!')

    socket.on('data', data => {
        for (const [id, sock] of Object.entries(sockets)) {
            if (id === socket.id) {return};
            const message = `\n${socket.id}  :  ${data}`
            sock.write(message);
            writeStream.write(message)
        }
    })

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log("Client disconnected");
    })
    writeStream.on('error', function (err) {
        console.log(err);
    });
})


server.listen(4000, () => {
    console.log("Server listing")
})