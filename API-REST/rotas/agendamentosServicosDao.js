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

// http://localhost:3000/api.hassam/agendamentosServicos-dao/createAgendamentoServico
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

// http://localhost:3000/api.hassam/agendamentosServicos-dao/getAgendamentoServicoByAgendamento?id_agendamento=1
router.get('/getAgendamentoServicoByAgendamento', (req, res) => {
    const { id_agendamento } = req.query;

    if (!id_agendamento) {
        return res.status(400).send({ error: "O parâmetro 'id_agendamento' é obrigatório." });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });
        }

        conn.query(
            `SELECT ags.id_agendamentoServico, ags.id_servico, s.desc_servico, s.valor_servico, ags.qt_servico
             FROM agendamentosServicos ags
             JOIN servicos s ON ags.id_servico = s.id_servico
             WHERE ags.id_agendamento = ?;`,
            [id_agendamento],
            (error, resultado) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: "Erro ao buscar os serviços do agendamento." });
                }

                if (resultado.length === 0) {
                    return res.status(404).send({ message: "Nenhum serviço encontrado para este agendamento." });
                }

                res.status(200).send({ response: resultado });
            }
        );
    });
});

// http://localhost:3000/api.hassam/agendamentosServicos-dao/getAgendamentoServicoByServico?id_servico=1
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

// http://localhost:3000/api.hassam/agendamentosServicos-dao/getServicosByClienteDataHora?nome_cliente=João&data_agendamento=2025-02-20&hora_agendamento=15:30&id_usuario=1
router.get('/getServicosByClienteDataHora', (req, res) => {
    const { nome_cliente, data_agendamento, hora_agendamento, id_usuario } = req.query;

    if (!nome_cliente || !data_agendamento || !hora_agendamento || !id_usuario) {
        return res.status(400).send({ error: "Todos os campos (nome_cliente, data_agendamento, hora_agendamento, id_usuario) são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });
        }

        const sql = `
            SELECT DISTINCT s.id_servico, s.desc_servico, s.valor_servico, a.data_agendamento, a.hora_agendamento
            FROM agendamentosServicos asg
            INNER JOIN agendamentos a ON asg.id_agendamento = a.id_agendamento
            INNER JOIN servicos s ON asg.id_servico = s.id_servico
            WHERE a.nome_cliente = ? 
            AND a.data_agendamento = ?
            AND a.hora_agendamento = ?
            AND a.id_usuario = ?
            AND a.status_agendamento = "ativo";
        `;

        conn.query(sql, [nome_cliente, data_agendamento, hora_agendamento, id_usuario], (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({ error: "Erro ao buscar serviços agendados." });
            }

            if (resultado.length === 0) {
                return res.status(404).send({ message: "Nenhum serviço encontrado para esse cliente na data e hora informadas." });
            }

            res.status(200).send({ response: resultado });
        });
    });
});


module.exports = router;