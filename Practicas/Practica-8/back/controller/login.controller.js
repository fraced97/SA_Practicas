const { Response, Request } = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

let contador = 0;
exports.login = async (req, res) => {
    contador++;
    res.send({
      'status':200,
      'msj': 'Numero de veces que ha hecho la peticion',
      'data': [{
        "contador":contador
      }]
  });
}

exports.obtener = async (req, res) => {
  contador++;
  res.send({
    'status':200,
    'msj': 'Numero de veces que ha hecho la peticion',
    'data': [{
      "contador":contador
    }]
});
}
