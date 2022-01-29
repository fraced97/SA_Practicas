const { Response, Request } = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const axios = require('axios');
const {llave} = require('../../model/models')
let pedidos=[];
exports.nuevoPedido = async (req, res) => {
    let body = req.body;
    const token = body.token;
    //const token = req.headers['access-token'];
    
    //---------------------
    var axios = require('axios');
    var data = JSON.stringify({});
    var config = {
        method: 'post',
        url: 'http://localhost:9000/validar',
        headers: { 
            'access-token': token, 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
    var valido = response.data;
    if(valido != undefined && valido.valido){
        if(valido.type === 1){
            //console.log(valido)
            console.log("<PedidoExitoso>Se almaceno el pedido");
            const payload = {
                id:valido.user_id,
                user:valido.user,
                type:valido.type,
                pedido:body.pedido,
                estadoRT:false,
                estadoRP:false
            };
            
            const token2 = jwt.sign(payload, llave, {
                expiresIn: 1440
            });
            axios
            .post(`http://localhost:9002/restaurante/pedidosPendientes`,{id:valido.user_id,pedido:body.pedido})
            .then(response2=>{
                pedidos.push({id:valido.user_id,pedido:body.pedido,entregadoR:false,recibidoR:false})
                //res.send(response2.data)
            })

            res.send({
                'status':200,
                'msj': "Su pedido se ha almacenado con exito",
                'data': token2
            });
        }else{
            console.log("<PedidoFallido>El tipo de usuario no es valido, por lo que el pedido no se almaceno");
            res.send({
                'status':401,
                'msj': "Usuario invalido, debe registrarse como cliente para poder hacer pedidos",
                'data': []
            });
        }
        
    }else{
        console.log("<PedidoFallido>No tiene permisos para utiilzar esta api");
        res.send({
            'status':401,
            'msj': "Este usuario no existe o no cuenta con permisos para utilizar el api",
            'data': []
        });
    }
    //return JSON.stringify(response.data);
    })
    .catch(function (error) {
    console.log(error);
        res.send({
            'status':400,
            'msj': "Este usuario no existe",
            'data': []
        });
    });
}

exports.verificarRestaurante  = async (req, res) => {
    //let body = req.body;
    //const token = body.token;
    const token = req.headers['access-token'];
    
    //---------------------
    var axios = require('axios');
    var data = JSON.stringify({});
    var config = {
        method: 'post',
        url: 'http://localhost:9000/validarR',
        headers: { 
            'access-token': token, 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
    var valido = response.data;
    if(valido != undefined && valido.valido){
        if(valido.type === 1){
            console.log("<VerificandoPedido>Verificando pedido de Restaurante");
            /*const payload = {
                id:valido.user_id,
                user:valido.user,
                type:valido.type,
                pedido:body.pedido,
                estadoRT:body.estadoRT,
                estadoRP:body.estadoRP
            };
            
            const token2 = jwt.sign(payload, llave, {
                expiresIn: 1440
            });*/
            //console.log(valido)
            for (i = 0; i < pedidos.length; i++) {
                if(valido.user_id==pedidos[i].id && pedidos[i].pedido==valido.pedido){
                    if(pedidos[i].recibidoR){
                        console.log("<VerificandoPedido>Pedido Ya aceptado por restaurante");
                        res.send({
                            'status':200,
                            'msj': "Pedido Ya aceptado por restaurante",
                            'data': []
                        });
                    }else{
                        console.log("<VerificandoPedido>Pedido aun no ha sido aceptado por restaurante");
                        res.send({
                            'status':200,
                            'msj': "Pedido aun no ha sido aceptado por restaurante",
                            'data': []
                        });
                    }
                }
            }
        }else{
            console.log("<VerificacionFallido>Verificacion Invalida");
            res.send({
                'status':401,
                'msj': "Verificacion Invalida",
                'data': []
            });
        }
        
    }else{
        console.log("<PedidoFallido>No tiene permisos para utiilzar esta api");
        res.send({
            'status':401,
            'msj': "Este usuario no existe o no cuenta con permisos para utilizar el api",
            'data': []
        });
    }
    //return JSON.stringify(response.data);
    })
    .catch(function (error) {
    console.log(error);
        res.send({
            'status':400,
            'msj': "Este usuario no existe",
            'data': []
        });
    });
}

exports.verificarRepartidor = async (req, res) => {
   //let body = req.body;
    //const token = body.token;
    const token = req.headers['access-token'];
    
    //---------------------
    var axios = require('axios');
    var data = JSON.stringify({});
    var config = {
        method: 'post',
        url: 'http://localhost:9000/validarR',
        headers: { 
            'access-token': token, 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
    var valido = response.data;
    if(valido != undefined && valido.valido){
        if(valido.type === 1){
            console.log("<VerificandoPedido>Verificando pedido de Restaurante");
            /*const payload = {
                id:valido.user_id,
                user:valido.user,
                type:valido.type,
                pedido:body.pedido,
                estadoRT:body.estadoRT,
                estadoRP:body.estadoRP
            };
            
            const token2 = jwt.sign(payload, llave, {
                expiresIn: 1440
            });*/
            if(valido.estadoRT){
                console.log("<VerificandoPedido>Pedido ya aceptado por repartidor");
                res.send({
                    'status':200,
                    'msj': "Pedido Ya aceptado por restaurante",
                    'data': token
                });
            }else{
                console.log("<VerificandoPedido>Pedido aun no ha sido aceptado por restaurante");
                res.send({
                    'status':200,
                    'msj': "Pedido aun no ha sido aceptado por restaurante",
                    'data': token
                });
            }
            
        }else{
            console.log("<VerificacionFallido>Verificacion Invalida");
            res.send({
                'status':401,
                'msj': "Verificacion Invalida",
                'data': []
            });
        }
        
    }else{
        console.log("<PedidoFallido>No tiene permisos para utiilzar esta api");
        res.send({
            'status':401,
            'msj': "Este usuario no existe o no cuenta con permisos para utilizar el api",
            'data': []
        });
    }
    //return JSON.stringify(response.data);
    })
    .catch(function (error) {
    console.log(error);
        res.send({
            'status':400,
            'msj': "Este usuario no existe",
            'data': []
        });
    });
}


exports.recibirEstadoRT = async (req, res) => {
    let body = req.body;
    for (i = 0; i < pedidos.length; i++) {
        if(pedidos[i].id==body.id && pedidos[i].pedido==body.pedido){
            pedidos[i].entregadoR=body.entregadoR
            pedidos[i].recibidoR = body.recibidoR
        }
    }
    /*res.send({
        'status':200,
        'msj': 'Usuario Registrado con exito',
        'data': []
    });*/
}

exports.recibirEstadoRP = async (req, res) => {
    let body = req.body;
    for (i = 0; i < pedidos.length; i++) {
        if(pedidos[i].id==body.id && pedidos[i].pedido==body.pedido){
            pedidos[i].entregadoR=body.entregadoR
            pedidos[i].recibidoR = body.recibidoR
        }
    }
}