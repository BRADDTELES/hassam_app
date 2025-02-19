const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const mysql = require('./mysql2').pool;


// http:localhost:3000/api.hassam/servicos-dao/createServico
router.post('/createServico', (req, res, next) => {
    const {id_usuario, desc_servico, valor_servico} = req.body
    const servicos = {id_usuario, desc_servico, valor_servico}

    //
    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'insert into servicos (id_usuario, desc_servico, valor_servico, status_servico) values (?, ?, ?, \'ativo\');',
            [servicos.id_usuario, servicos.desc_servico, servicos.valor_servico],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Serviço cadastrado com sucesso!',
                    id_servico : resultado.insertId
                });
            }
        )
    });
});

// http:localhost:3000/api.hassam/servicos-dao/getServicoByDesc?desc_servico=corte&id_usuario=1
router.get('/getServicoByDesc', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.desc_servico;
    const param2 = queryParams.id_usuario;

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select id_servico, desc_servico, valor_servico from servicos where match(desc_servico) against(? in boolean mode) and id_usuario = ? and status_servico = \"ativo\";',
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

// http://localhost:3000/api.hassam/servicos-dao/getAllServico?id_usuario=1
router.get('/getAllServico', (req, res) => {
    const { id_usuario } = req.query;

    if (!id_usuario) {
        return res.status(400).send({ error: "O parâmetro 'id_usuario' é obrigatório." });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });
        }

        conn.query(
            `SELECT DISTINCT id_servico, desc_servico, valor_servico 
             FROM servicos 
             WHERE id_usuario = ? AND status_servico = "ativo";`,
            [id_usuario],
            (error, resultado) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: "Erro ao buscar os serviços." });
                }

                if (resultado.length === 0) {
                    return res.status(404).send({ message: "Nenhum serviço ativo encontrado." });
                }

                res.status(200).send({ response: resultado });
            }
        );
    });
});


router.post('/updateServico', (req, res, next) => {
    const {id_servico, id_usuario, desc_servico, valor_servico} = req.body
    const servicos = {id_servico, id_usuario, desc_servico, valor_servico}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'update servicos set desc_servico = ?, valor_servico = ? where id_servico = ? and status_servico = \"ativo\";',
            [servicos.desc_servico, servicos.valor_servico, servicos.id_servico],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Serviço atualizado com sucesso!', 
                    'Dados do serviço: ' : servicos
                });
            }
        )
    });
});

router.post('/inativarServico', (req, res, next) => {
    const {id_servico} = req.body
    const servicos = {id_servico}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'update servicos set status_servico = \"inativo" where id_servico = ? and status_servico = \"ativo\";',
            [servicos.id_servico],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Serviço inativado com sucesso!', 
                    'Dados do serviço: ' : servicos
                });
            }
        )
    });
});

router.post('/deleteServicoInativo', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        const {id_usuario} = req.body
        const usuarios = {id_usuario}

        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'delete from servicos where status_servico = \"inativo\" and id_usuario = ?;',
            [usuarios.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Serviço(s) excluído(s) com sucesso.' 
                });
            }
        )
    });
});

module.exports = router;