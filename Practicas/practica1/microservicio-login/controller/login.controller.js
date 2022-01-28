const { Response, Request } = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const {usuarios,llave} = require('../../model/models')
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    let body = req.body;

    var usuario = usuarios.find(function(usuario,index){
        if(body.user === usuario.user && body.password === usuario.password && body.type === usuario.type){
            return true
        }
    });
    if(usuario){
        console.log("<InicioSesion>El usuario '"+body.user+"' ha iniciado sesión");
        const payload = {
            id:usuario.id,
            user:usuario.user,
            type:usuario.type
        };
        
        const token = jwt.sign(payload, llave, {
            expiresIn: 1440
        });
        res.send({
            'status':200,
            'msj': 'Usuario logueado con exito',
            'data': token
        });
    }else{
        res.send({ 
            'status':400,
            'msj': 'Error usuario no existe',
            'data': []
        });
    }
}

exports.validar  = async (req, res) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, llave, (err, decoded) => {      
          if (err) {
            console.log("<ValidacionFallida>El usuario no ha podido ser validado");
            return res.json({ 
                mensaje: 'Token inválida',
                valido: false
            });
          } else {
            req.decoded = decoded;
            console.log("<ValidacionExitosa>El es valido en el sistema.");
            res.send({
                valido:true,
                user_id:decoded.id,
                type:decoded.type,
                user:decoded.user,
                mensaje:'Token valido'
            });
          }
        });
      } else {
        console.log("<ValidacionFallida>Se requiere el token de validación");
        res.send({ 
            valido:false,
            mensaje: 'Token no proveída.' 
        });
      }
}

exports.validarR  = async (req, res) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, llave, (err, decoded) => {      
          if (err) {
            console.log("<ValidacionFallida>El usuario no ha podido ser validado");
            return res.json({ 
                mensaje: 'Token inválida',
                valido: false
            });
          } else {
            req.decoded = decoded;
            console.log("<ValidacionExitosa>El es valido en el sistema.");
            res.send({
                valido:true,
                user_id:decoded.id,
                type:decoded.type,
                user:decoded.user,
                pedido:decoded.pedido,
                estadoRT:decoded.estadoRT,
                estadoRP:decoded.estadoRP,
                mensaje:'Token valido'
            });
          }
        });
      } else {
        console.log("<ValidacionFallida>Se requiere el token de validación");
        res.send({ 
            valido:false,
            mensaje: 'Token no proveída.' 
        });
      }
}

