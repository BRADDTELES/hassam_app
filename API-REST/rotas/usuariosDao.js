const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const mysql = require('./mysql2').pool;


// http:localhost:3000/api.hassam/usuarios-dao/createUsuario
router.post('/createUsuario', (req, res, next) => {
    const {login_usuario, senha_usuario, nome_usuario} = req.body
    const usuarios = {login_usuario, senha_usuario, nome_usuario}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'insert into usuarios (login_usuario, senha_usuario, nome_usuario) values (?, ?, ?);',
            [usuarios.login_usuario, usuarios.senha_usuario, usuarios.nome_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Usuário cadastrado com sucesso!',
                    id_usuario : resultado.insertId
                });
            }
        )
    });
});

// http:localhost:3000/api.hassam/usuarios-dao/getUsuarioById?id_usuario=1
router.get('/getUsuarioById', (req, res, next) => { 
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
            'select * from usuarios where id_usuario = ?;',
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

// http:localhost:3000/api.hassam/usuarios-dao/getUsuarios
router.get('/getUsuarios', (req, res, next) => { 
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
            'select * from usuarios;',
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

// http://localhost:3000/api.hassam/usuarios-dao/getUsuarioByLoginSenha?login_usuario=admin&senha_usuario=123
router.get('/getUsuarioByLoginSenha', (req, res) => {
    const { login_usuario, senha_usuario } = req.query;

    if (!login_usuario || !senha_usuario) {
        return res.status(400).send({ error: "Os parâmetros 'login_usuario' e 'senha_usuario' são obrigatórios." });
    }

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: "Erro ao conectar ao banco de dados." });
        }

        const sql = `SELECT id_usuario, nome_usuario, login_usuario 
                     FROM usuarios 
                     WHERE login_usuario = BINARY ? 
                     AND senha_usuario = BINARY ?;`;

        conn.query(sql, [login_usuario, senha_usuario], (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({ error: "Erro ao buscar usuário." });
            }

            if (resultado.length === 0) {
                return res.status(404).send({ message: "Usuário ou senha incorretos." });
            }

            res.status(200).send({ response: resultado[0] });
        });
    });
});


router.get('/getSenhaByLoginName', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.login_usuario;
    const param2 = queryParams.nome_usuario;
    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select senha_usuario from usuarios where login_usuario = binary ? and nome_usuario = binary ?;',
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

// http:localhost:3000/api.hassam/usuarios-dao/updateUsuario
router.post('/updateUsuario', (req, res, next) => {
    const {id_usuario, login_usuario, senha_usuario, nome_usuario} = req.body
    const usuarios = {id_usuario, login_usuario, senha_usuario, nome_usuario}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'update usuarios set login_usuario = ?, senha_usuario = ?, nome_usuario = ? where id_usuario = ?;',
            [usuarios.login_usuario, usuarios.senha_usuario, usuarios.nome_usuario, usuarios.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error : error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Usuário atualizado com sucesso!', 
                    'Dados do usuário: ' : usuarios
                });
            }
        )
    });
});

// http:localhost:3000/api.hassam/usuarios-dao/deleteUsuario
router.post('/deleteUsuario', (req, res, next) => {
    const {id_usuario} = req.body
    const usuarios = {id_usuario}

    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'delete from usuarios where id_usuario = ? ;',
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
                    response : 'Usuário excluído com sucesso.' 
                });
            }
        )
    });
});

module.exports = router;