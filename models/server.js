//Servidor de Express
const express = require('express');
//servidor de socket
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conectar a DB
        dbConnection();

        //Http server
        this.server = http.createServer(this.app);

        //Configuración del socket server
        this.io = socketio(this.server, {
            /* Configuraciones */
        });
    }

    middlewares() {
        //Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../', 'public')));

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Api Endpoints
        this.app.use('/api/auth', require('../router/auth'));

    }

    configSockets() {
        new Sockets(this.io);
    }

    execute() {

        //Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.configSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log(`Servidor on, url: http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;