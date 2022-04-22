const { Response, Request } = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
let contador = 0;

exports.contador = async (req, res) => {
        res.send({ 
            'contador': contador++
        });
}

