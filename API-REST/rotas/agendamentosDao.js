const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const mysql = require('./mysql2').pool;

// http://localhost:3000/api.hassam/agendamentos-dao/createAgendamento
router.post('/createAgendamento', (req, res) => {
    const { id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento } = req.body;

    if (!id_usuario || !nome_cliente || !telefone_cliente || !data_agendamento || !hora_agendamento) {
        return res.status(400).send({ error: "Todos os campos são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });
        }

        conn.query(
            `INSERT INTO agendamentos (id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento, status_agendamento) 
             VALUES (?, ?, ?, ?, ?, 'ativo');`,
            [id_usuario, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento],
            (error, resultado) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: "Erro ao criar agendamento." });
                }

                res.status(201).send({
                    message: "Agendamento cadastrado com sucesso!",
                    id_agendamento: resultado.insertId
                });
            }
        );
    });
});

// http://localhost:3000/api.hassam/agendamentos-dao/getAllAgendamento?id_usuario=1
router.get('/getAllAgendamento', (req, res) => {
    const { id_usuario } = req.query;

    if (!id_usuario) {
        return res.status(400).send({ error: "O parâmetro 'id_usuario' é obrigatório." });
    }

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });

        conn.query(
            `SELECT id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento 
             FROM agendamentos 
             WHERE id_usuario = ? AND status_agendamento = "ativo";`,
            [id_usuario],
            (error, resultado) => {
                conn.release();
                if (error) return res.status(500).send({ error: "Erro ao buscar agendamentos." });

                if (resultado.length === 0) return res.status(404).send({ message: "Nenhum agendamento encontrado." });

                res.status(200).send({ response: resultado });
            }
        );
    });
});


// http://localhost:3000/api.hassam/agendamentos-dao/getAgendamentoByNome?nome_cliente=João&id_usuario=1
router.get('/getAgendamentoByNome', (req, res) => {
    const { nome_cliente, id_usuario } = req.query;

    if (!nome_cliente || !id_usuario) {
        return res.status(400).send({ error: "Os parâmetros 'nome_cliente' e 'id_usuario' são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });

        conn.query(
            `SELECT id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento 
             FROM agendamentos 
             WHERE nome_cliente LIKE CONCAT("%", ?, "%") 
             AND id_usuario = ? AND status_agendamento = "ativo";`,
            [nome_cliente, id_usuario],
            (error, resultado) => {
                conn.release();
                if (error) return res.status(500).send({ error: "Erro ao buscar agendamentos." });

                if (resultado.length === 0) return res.status(404).send({ message: "Nenhum agendamento encontrado para esse nome." });

                res.status(200).send({ response: resultado });
            }
        );
    });
});


// http://localhost:3000/api.hassam/agendamentos-dao/getAgendamentoByData?data_agendamento=2025-02-20&id_usuario=1
router.get('/getAgendamentoByData', (req, res) => {
    const { data_agendamento, id_usuario } = req.query;

    if (!data_agendamento || !id_usuario) {
        return res.status(400).send({ error: "Os parâmetros 'data_agendamento' e 'id_usuario' são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });

        conn.query(
            `SELECT id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento 
             FROM agendamentos 
             WHERE data_agendamento = ? AND id_usuario = ? AND status_agendamento = "ativo";`,
            [data_agendamento, id_usuario],
            (error, resultado) => {
                conn.release();
                if (error) return res.status(500).send({ error: "Erro ao buscar agendamentos." });

                if (resultado.length === 0) return res.status(404).send({ message: "Nenhum agendamento encontrado para essa data." });

                res.status(200).send({ response: resultado });
            }
        );
    });
});


// http://localhost:3000/api.hassam/agendamentos-dao/getAgendamentoByBetweenData?data_agendamento=2025-02-20&data_agendamento_between=2025-02-25&id_usuario=1
router.get('/getAgendamentoByBetweenData', (req, res) => {
    const { data_agendamento, data_agendamento_between, id_usuario } = req.query;

    if (!data_agendamento || !data_agendamento_between || !id_usuario) {
        return res.status(400).send({ error: "Os parâmetros 'data_agendamento', 'data_agendamento_between' e 'id_usuario' são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });

        conn.query(
            `SELECT id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento 
             FROM agendamentos 
             WHERE data_agendamento BETWEEN ? AND ? AND id_usuario = ? 
             AND status_agendamento = "ativo";`,
            [data_agendamento, data_agendamento_between, id_usuario],
            (error, resultado) => {
                conn.release();
                if (error) return res.status(500).send({ error: "Erro ao buscar agendamentos." });

                if (resultado.length === 0) return res.status(404).send({ message: "Nenhum agendamento encontrado no intervalo de datas." });

                res.status(200).send({ response: resultado });
            }
        );
    });
});


// http://localhost:3000/api.hassam/agendamentos-dao/getAgendamentoByHora?hora_agendamento=15:30&data_agendamento=2025-02-20&id_usuario=1
router.get('/getAgendamentoByHora', (req, res) => {
    const { hora_agendamento, data_agendamento, id_usuario } = req.query;

    if (!hora_agendamento || !data_agendamento || !id_usuario) {
        return res.status(400).send({ error: "Os parâmetros 'hora_agendamento', 'data_agendamento' e 'id_usuario' são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });

        conn.query(
            `SELECT id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento 
             FROM agendamentos 
             WHERE hora_agendamento = ? AND data_agendamento = ? AND id_usuario = ? 
             AND status_agendamento = "ativo";`,
            [hora_agendamento, data_agendamento, id_usuario],
            (error, resultado) => {
                conn.release();
                if (error) return res.status(500).send({ error: "Erro ao buscar agendamentos." });

                if (resultado.length === 0) return res.status(404).send({ message: "Nenhum agendamento encontrado para essa hora." });

                res.status(200).send({ response: resultado });
            }
        );
    });
});


// http://localhost:3000/api.hassam/agendamentos-dao/getAgendamentoByBetweenHora?hora_agendamento=08:00&hora_agendamento_between=18:00&data_agendamento=2025-02-20&id_usuario=1
router.get('/getAgendamentoByBetweenHora', (req, res) => {
    const { hora_agendamento, hora_agendamento_between, data_agendamento, id_usuario } = req.query;

    if (!hora_agendamento || !hora_agendamento_between || !data_agendamento || !id_usuario) {
        return res.status(400).send({ error: "Os parâmetros 'hora_agendamento', 'hora_agendamento_between', 'data_agendamento' e 'id_usuario' são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });
        }

        const sql = `
            SELECT id_agendamento, nome_cliente, telefone_cliente, data_agendamento, hora_agendamento 
            FROM agendamentos 
            WHERE hora_agendamento BETWEEN ? AND ? 
            AND data_agendamento = ? 
            AND id_usuario = ? 
            AND status_agendamento = "ativo";
        `;

        conn.query(sql, [hora_agendamento, hora_agendamento_between, data_agendamento, id_usuario], (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({ error: "Erro ao buscar agendamentos no intervalo de horários." });
            }

            if (resultado.length === 0) {
                return res.status(404).send({ message: "Nenhum agendamento encontrado no intervalo de horários informado." });
            }

            res.status(200).send({ response: resultado });
        });
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