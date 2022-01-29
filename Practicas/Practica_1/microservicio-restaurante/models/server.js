// LIBRERIAS PARA EL MANEJO DEL SERVER
const express = require('express');
const cors = require('cors');
var routerCliente = require('../routes/restaurante.route')

class Server {
    
    constructor(){
        // CONFIGURACIÓN GENERAL DEL SERVIDOR
        this.app = express();
        this.port = 9002;
        this.carpetaPath = "/restaurante";
        
        this.app.use(cors())
        this.app.use(express.json({limit:'5mb'}))
        this.app.use(express.urlencoded({extended:false, limit:'5mb'}))

        // RUTAS DEL SERVER
        this.routes();
    }

    routes(){
       this.app.use(this.carpetaPath, routerCliente);
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor nodeJS corriendo en puerto: ', this.port );
        });
    }

}

module.exports = Server;