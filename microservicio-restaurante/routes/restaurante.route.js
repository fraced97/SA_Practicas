const express = require('express')
const routerRestaurante = express.Router()
var routerRes = require('../controller/restaurante.controller')
routerRestaurante.post('/pedidosPendientes', routerRes.pedidosPendientes);
routerRestaurante.post('/recibirPedido', routerRes.recibirPedido);
routerRestaurante.post('/informarEstado', routerRes.informarEstado);
routerRestaurante.post('/avisarRepartidor', routerRes.avisarRepartidor);

module.exports = routerRestaurante
