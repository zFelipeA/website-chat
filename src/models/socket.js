import { v4 as uuid } from "uuid";
import { WebSocketServer } from "ws";

let setup = false;

const messages = [];

function newClient(socket) {
    const ownerID = uuid();
    socket.send(
        JSON.stringify({
            type: "server-setup",
            content: {
                messages,
                owner_id: ownerID,
            },
        })
    );
}

function newMessage(server, packet) {
    messages.push({
        message: packet.content.message,
        owner: packet.content.owner_name,
        owner_id: packet.content.owner_id,
        create_at: new Date(),
    });

    notifyAllClients(server);
}

function notifyAllClients(server) {
    const clients = server.clients;
    for (const socket of clients) {
        socket.send(
            JSON.stringify({
                type: "new-server-message",
                content: {
                    messages,
                },
            })
        );
    }
}

export default async function verifySetup(res) {
    if (setup) {
        res.end();
        return;
    }

    const server = new WebSocketServer({ port: 80 });

    server.on("connection", socket => {
        newClient(socket);

        socket.on("message", data => {
            const packet = JSON.parse(data);
            if (packet && packet.type === "new-client-message") {
                newMessage(server, packet);
            }
        });
    });

    setup = true;

    res.end();
}
