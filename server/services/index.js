const services = require('./services');
const express = require('express');
const router = express.Router();

router.get('/calculate/:from_cepcode/:to_cepcode', app.parser.cep, services.calculate);
module.exports = router;