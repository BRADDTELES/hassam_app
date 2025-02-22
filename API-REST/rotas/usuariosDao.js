const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const mysql = require('./mysql2').pool;

//Não faço ideia do motivo, mas remover o request mesmo que não utilizado quebra o método

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

router.get('/getUsuarioByLoginSenha', (req, res, next) => { 
    const reqURL = url.parse(req.url);
    const queryParams = querystring.parse(reqURL.query);
    const param1 = queryParams.login_usuario;
    const param2 = queryParams.senha_usuario;
    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({
                error : error,
                response : null
            });
        }
        conn.query(
            'select * from usuarios where login_usuario = binary ? and senha_usuario = binary ?;',
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