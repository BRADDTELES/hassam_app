const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const mysql = require('./mysql2').pool;

/*
    id_agendamentoServico int not null,
    id_servico int not null,
    id_agendamento int not null, 
    qt_servico int,
*/
router.post('/createAgendamentoServico', (req, res, next) => {
    const {id_servico, id_agendamento, qt_servico} = req.body
    const agendamentosServicos = {id_servico, id_agendamento, qt_servico}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'insert into agendamentosServicos(id_servico, id_agendamento, qt_servico) values (?, ?, ?) on duplicate key update qt_servico = qt_servico + 1;',
            [agendamentosServicos.id_servico, agendamentosServicos.id_agendamento, agendamentosServicos.qt_servico],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Cadastrado com sucesso!',
                    id_agendamentoServico : resultado.insertId
                });
            }
        )
    });
});

router.get('/getAgendamentoServicoByAgendamento', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param = queryParams.id_agendamento;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select * from agendamentosServicos where id_agendamento = ?;',
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

router.get('/getAgendamentoServicoByServico', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param = queryParams.id_servico;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select * from agendamentosServicos where id_servico = ?;',
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

router.post('/updateAgendamentoServico', (req, res, next) => {
    const {id_servico, id_agendamento, qt_servico, id_agendamentoServico} = req.body
    const agendamentosServicos = {id_servico, id_agendamento, qt_servico, id_agendamentoServico}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'update agendamentosServicos set id_servico = ?, id_agendamento = ?, qt_servico = ? where id_agendamentoServico = ?;',
            [agendamentosServicos.id_servico, agendamentosServicos.id_agendamento, agendamentosServicos.qt_servico, agendamentosServicos.id_agendamentoServico],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Atualizado com sucesso!', 
                    'Dados: ' : agendamentosServicos
                });
            }
        )
    });
});

module.exports = router;