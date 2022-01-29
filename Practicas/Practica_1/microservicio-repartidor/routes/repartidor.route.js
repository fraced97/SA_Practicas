const express = require('express')
const routerRepartidor = express.Router()
var routerRep = require('../controller/repartidor.controller')
routerRepartidor.post('/recibirPedido', routerRep.recibirPedido);
routerRepartidor.post('/informarPedido', routerRep.informarPedido);
routerRepartidor.post('/entregado', routerRep.entregado);
routerRepartidor.post('/aceptarPedido', routerRep.aceptarPedido);

module.exports = routerRepartidor
