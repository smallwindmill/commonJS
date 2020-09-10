const express = require('express');
const ws =require("ws");

class TelloVideoServer{
    constructor(){
        this.HOST = "localhost";
        this.PORT = "";
        this.exp = express();
        this.server = null;
        this.wsServer = null;
    }

    startServer(port) {
        let that = this;
        this.PORT = port || 2340;
        this.server = this.exp.listen(this.PORT, this.HOST, () => {
            const host = this.server.address().address
            const port = this.server.address().port
            console.log(`Server started at http://${host}:${port}/`)
        });

        // exp.use(express.static("C:/Users/Administrator/Desktop/mindplus165/mindPlus/src/lib/video/jsmpeg.min.js"))
        this.wsServer = new ws.Server({ server: this.server });
        let wsServer = this.wsServer;
        this.exp.post(`/tellostream`, (req, res) => {
            res.connection.setTimeout(0)

            console.log(
                `Stream Connected: ${req.socket.remoteAddress}:${req.socket.remotePort}`
            )

            req.on('data', function (data) {
                // console.log(data);
                wsServer.broadcast(data);
            })

            req.on('end', function () {
                console.log(
                    `Stream Disconnected: ${req.socket.remoteAddress}:${req.socket.remotePort}`
                )
            })
        });


        this.wsServer.on('connection', (socket, upgradeReq) => {
            const remoteAddress = (upgradeReq || socket.upgradeReq).socket.remoteAddress

            console.log(
                `WebSocket Connected: ${remoteAddress} (${wsServer.clients.size} total)`
            )

            socket.on('close', (code, message) => {
                console.log(
                    `WebSocket Disonnected: ${remoteAddress} (${wsServer.clients.size} total)`
                )
            })
        })
        this.wsServer.broadcast = (data) => {
            wsServer.clients.forEach(function each(client) {
                if (client.readyState === ws.OPEN) {
                    client.send(data);
                }
            })
        }
    }

    closeServer() {
        // console.log(this.server);
        // console.log(this.wsServer);
        this.server && this.server.close();
        this.wsServer && this.wsServer.close();
        this.server = null;
        this.wsServer = null;
    }
}


var telloVideoServerInstance = new TelloVideoServer();
// telloVideoServer.startServer();
// setTimeout(()=>telloVideoServer.closeServer(), 5000);
module.exports = telloVideoServerInstance;

