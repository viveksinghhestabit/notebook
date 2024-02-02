const { WebSocketServer } = require('ws');
const clients = new Map();
const socket = (server) => {
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws) => {
        ws.on('message', (messageAsString) => {
            const { type, message } = JSON.parse(messageAsString);
            if (type === "bind") {
                clients.set(ws, message);
                console.log("binded sender", message);
                return;
            }
            const sender = clients.get(ws);
            const object = {
                message,
                sender,
            }
            const outbound = JSON.stringify(object);

            [...clients.keys()].forEach((client) => {
                client.send(outbound);
            });
        });

        ws.on("close", () => {
            clients.delete(ws);
        });
    });

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = socket;
