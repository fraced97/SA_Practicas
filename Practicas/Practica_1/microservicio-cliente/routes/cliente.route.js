const express = require('express')
const routerUsuario = express.Router()
var routerCliente = require('../controller/cliente.controller')
routerUsuario.post('/nuevoPedido', routerCliente.nuevoPedido);
routerUsuario.post('/verificarRestaurante', routerCliente.verificarRestaurante);
routerUsuario.post('/verificarRepartidor', routerCliente.verificarRepartidor);
routerUsuario.post('/recibirEstadoRT', routerCliente.recibirEstadoRT);
routerUsuario.post('/recibirEstadoRP', routerCliente.recibirEstadoRP);

module.exports = routerUsuario
