const URL_BASE = '/api.hassam';
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Rotas
const usuariosDao = require('./rotas/usuariosDao');
app.use(URL_BASE + '/usuarios-dao', usuariosDao);

const servicosDao = require('./rotas/servicosDao');
app.use(URL_BASE + '/servicos-dao', servicosDao);

//const clientesDao = require('./rotas/clientesDao');
//app.use(URL_BASE + '/clientes-dao', clientesDao); 

//const telefonesDao = require('./rotas/telefonesDao');
//app.use(URL_BASE + '/telefones-dao', telefonesDao);

const agendamentosDao = require('./rotas/agendamentosDao');
app.use(URL_BASE + '/agendamentos-dao', agendamentosDao);

const agendamentosServicosDao = require('./rotas/agendamentosServicosDao');
app.use(URL_BASE + '/agendamentosServicos-dao', agendamentosServicosDao);

module.exports = app;