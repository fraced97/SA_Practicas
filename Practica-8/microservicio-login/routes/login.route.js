const express = require('express')
const routerRestaurante = express.Router()
var routerRes = require('../controller/login.controller')
routerRestaurante.get('/contador', routerRes.contador);
module.exports = routerRestaurante
