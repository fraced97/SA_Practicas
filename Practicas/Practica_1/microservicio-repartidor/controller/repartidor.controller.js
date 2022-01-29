const { Response, Request } = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
let pedidos = [];

exports.recibirPedido = async (req, res) => {
    let body = req.body;
    pedidos.push(body)
    res.send({
        'status':200,
        'msj': 'Repartidor avisado con exito',
        'data': []
    });
    console.log(pedidos)
}

exports.aceptarPedido = async (req, res) => {
    const token = req.headers['access-token'];
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
            if(valido.type === 3){
                console.log("<ObtenerPedidosExitoso>Se retorno listado de pedidos");
                //console.log(pedidos)
                //console.log("----------")
                for (i = 0; i < pedidos.length; i++) { 
                    pedidos[i].entregadoR=true;
                    pedidos[i].recibidoR=true;
                    axios
                    .post(`http://localhost:9001/cliente/recibirEstadoRP`,pedidos[i])
                    .then(response2=>{
                        pedidos.push({id:body.id,pedido:body.pedido,entregadoR:false,recibidoR:false})
                        res.send(response2.data)
                    })
                    //console.log(pedidos[i])
                }
                
                res.send({
                    pedidos:JSON.stringify(pedidos)
                });
            }else{
                console.log("<PedidoFallido>El tipo de usuario no es valido, por lo que no se puede acceder a los pedidos");
                res.send({
                    mensaje:"Usuario invalido, debe registrarse como restaurante para poder recibir pedidos"
                });
            }
            
        }else{
            console.log("<PedidoFallido>No tiene permisos para utiilzar esta api");
            res.send({
                mensaje:"Este usuario no existe o no cuenta con permisos para utilizar el api"
            });
        }
        //return JSON.stringify(response.data);
        })
        .catch(function (error) {
        console.log(error);
            res.send({
                mensaje:"Este usuario no existe"
            });
        });
}

exports.informarPedido  = async (req, res) => {
    let body = req.body;
    res.send({
        'status':200,
        'msj': 'Usuario Registrado con exito',
        'data': []
    });
}

exports.entregado = async (req, res) => {
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
            console.log("<EntregandoPedido>Marcando como entregado el pedido");
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
            if(valido.estadoRP){
                console.log("<VerificandoPedido>Pedido ya entregado");
                res.send({
                    'status':200,
                    'msj': "Pedido Ya entregado",
                    'data': token
                });
            }else{
                response.estadoRP = true;
                console.log("<VerificandoPedido>Pedido siendo entregado");
                res.send({
                    'status':200,
                    'msj': "Pedido aun no ha sido aceptado por restaurante",
                    'data': token
                });
            }
            
        }else{
            console.log("<VerificacionFallido>Entrega invalida");
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