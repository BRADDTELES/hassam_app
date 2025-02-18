const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const mysql = require('./mysql2').pool;

router.post('/createAgendamento', (req, res, next) => {
    const {id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento} = req.body
    const agendamentos = {id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'insert into agendamentos (id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento, status_agendamento) values (?, ?, ?, ?, ?, \'ativo\');',
            [agendamentos.id_usuario, agendamentos.nome_cliente, agendamentos.telefone_cliente, agendamentos.data_agendamento, agendamentos.hora_agendamento],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Agendamento cadastrado com sucesso!',
                    id_agendamento : resultado.insertId
                });
            }
        )
    });
});

router.get('/getAllAgendamento', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param = queryParams.id_usuario;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select * from agendamentos where id_usuario = ? and status_agendamento = \"ativo\";',
            [param],
            (error, resposta, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : resposta
                });
            }
        )
    });
});

router.get('/getAgendamentoByNome', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.nome_cliente;
    const param2 = queryParams.id_usuario;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento from agendamentos where nome_cliente like concat(\"%\", ?, \"%\") and id_usuario = ? and status_agendamento = \"ativo\";',
            [param1, param2],
            (error, resposta, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : resposta
                });
            }
        )
    });
});

router.get('/getAgendamentoByData', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.data_agendamento;
    const param2 = queryParams.id_usuario;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento from agendamentos where data_agendamento = ? and id_usuario = ? and status_agendamento = \"ativo\";',
            [param1, param2],
            (error, resposta, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : resposta
                });
            }
        )
    });
});

router.get('/getAgendamentoByBetweenData', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.data_agendamento;
    const param2 = queryParams.data_agendamento_between;
    const param3 = queryParams.id_usuario;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento from agendamentos where data_agendamento between ? and ? and id_usuario = ? and status_agendamento = \"ativo\";',
            [param1, param2, param3],
            (error, resposta, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : resposta
                });
            }
        )
    });
});

router.get('/getAgendamentoByHora', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.hora_agendamento;
    const param2 = queryParams.data_agendamento;
    const param3 = queryParams.id_usuario;

    console.log(param1);

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento from agendamentos where hora_agendamento = ? and data_agendamento = ? and id_usuario = ? and status_agendamento = \"ativo\";',
            [param1, param2, param3],
            (error, resposta, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : resposta
                });
            }
        )
    });
});

router.get('/getAgendamentoByBetweenHora', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.hora_agendamento;
    const param2 = queryParams.hora_agendamento_between;
    const param3 = queryParams.data_agendamento;
    const param4 = queryParams.id_usuario;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento from agendamentos where hora_agendamento between ? and ? and data_agendamento = ? and id_usuario = ? and status_agendamento = \"ativo\";',
            [param1, param2, param3, param4],
            (error, resposta, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : resposta
                });
            }
        )
    });
});

router.post('/updateAgendamento', (req, res, next) => {
    const {id_agendamento, id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento} = req.body
    const agendamentos = {id_agendamento, id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'update agendamentos set nome_cliente = ?, telefone_cliente = ?, data_agendamento = ?, hora_agendamento = ? where id_agendamento = ? and status_agendamento = \"ativo\";',
            [agendamentos.nome_cliente, agendamentos.telefone_cliente, agendamentos.data_agendamento, agendamentos.hora_agendamento, agendamentos.id_agendamento, agendamentos.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Agendamento atualizado com sucesso!', 
                    'Dados do agendamento: ' : agendamentos
                });
            }
        )
    });
});

router.post('/inativarAgendamento', (req, res, next) => {
    const {id_agendamento, id_usuario} = req.body
    const agendamentos = {id_agendamento, id_usuario}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'update agendamentos set status_agendamento = \"inativo" where id_agendamento = ? and status_agendamento = \"ativo\";',
            [agendamentos.id_agendamento, agendamentos.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Agendamento inativado com sucesso!', 
                    'Dados do agendamento: ' : agendamentos
                });
            }
        )
    });
});

router.post('/deleteAgendamentoInativo', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        const {id_usuario} = req.body
        const agendamentos = {id_usuario}

        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'delete from agendamentos where status_agendamento = \"inativo\" and id_usuario = ?;',
            [agendamentos.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Agendamento(s) excluído(s) com sucesso.' 
                });
            }
        )
    });
});

module.exports = router;