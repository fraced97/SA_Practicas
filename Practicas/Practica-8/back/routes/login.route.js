const express = require('express')
const routerRestaurante = express.Router()
var routerRes = require('../controller/login.controller')
routerRestaurante.post('/login', routerRes.login);
routerRestaurante.get('/obtener', routerRes.obtener);

module.exports = routerRestaurante
