const WebSocket = require('ws');
let WebSocketServer = WebSocket.Server;
let port = 3001;
let ws = new WebSocketServer ({
    port: port
});

let messages = [];
console.log('websockets server started');
ws.on('connection', (socket) => {
    console.log('client connection established');
    messages.forEach(function(msg) {
        socket.send(msg);
    })
    socket.on('message', (data) => {
        console.log('message received: ' + data);
        ws.clients.forEach(function(clientSocket) {
            clientSocket.send(data);
        });
        // socket.send(data);
    })
});

