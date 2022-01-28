const { Response, Request } = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

let pedidos=[];
//let nombrePedido='';
exports.pedidosPendientes = async (req, res) => {
    let body = req.body;
    //nombrePedido = body.pedido
    pedidos.push({id:body.id,pedido:body.pedido,entregadoR:false,recibidoR:false})
    //console.log("-------------------")
    //console.log(pedidos)
    //console.log("-------------------")
    res.send({
        'status':200,
        'msj': 'Su pedido se ha almacenado con exito',
        'data': []
    });
}

exports.recibirPedido = async (req, res) => {
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
                pedidos[i].entregadoR=false;
                pedidos[i].recibidoR=true;
                axios
                .post(`http://localhost:9001/cliente/recibirEstadoRT`,pedidos[i])
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

exports.informarEstado  = async (req, res) => {
    let body = req.body;
    res.send({
        'status':200,
        'msj': 'Usuario Registrado con exito',
        'data': []
    });
}

exports.avisarRepartidor = async (req, res) => {
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
            console.log("<AvisarRepartidor>Se informo al repartidor que esta listo");
            //console.log(pedidos)
            //console.log("----------")
            for (i = 0; i < pedidos.length; i++) { 
                //pedidos[i].entregadoR=false;
                //pedidos[i].recibidoR=true;
                if(pedidos[i].recibidoR==true && pedidos[i].entregadoR==false){
                    axios
                    .post(`http://localhost:9003/repartidor/recibirPedido`,pedidos[i])
                    .then(response2=>{
                        //pedidos.push({id:body.id,pedido:body.pedido,entregadoR:false,recibidoR:true})
                        pedidos.splice(i,1)
                        res.send(response2.data)
                    })
                    console.log(pedidos)
                    console.log("----------")   
                }
                
                //console.log(pedidos[i])
            }
            
            /*res.send({
                pedidos:JSON.stringify(pedidos)
            });*/
        }else{
            console.log("<AvisarRepartidorFallido>El tipo de usuario no es valido, por lo que no se puede acceder a los pedidos");
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