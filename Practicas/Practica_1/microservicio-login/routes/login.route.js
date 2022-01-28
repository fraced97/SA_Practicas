const express = require('express')
const routerRestaurante = express.Router()
var routerRes = require('../controller/login.controller')
routerRestaurante.post('/login', routerRes.login);
routerRestaurante.post('/validar', routerRes.validar);
routerRestaurante.post('/validarR', routerRes.validarR);
module.exports = routerRestaurante
