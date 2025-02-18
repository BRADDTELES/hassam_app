package com.example.hassamapp.controller;

import android.util.Log;

import androidx.annotation.NonNull;
import com.example.hassamapp.http.HttpHelper;
import com.example.hassamapp.http.UsuariosParser;
import com.example.hassamapp.model.Usuarios;
import com.google.gson.Gson;

import java.io.IOException;
import java.net.SocketTimeoutException;

public class UsuariosDao { //Parei na página 25 do projeto

    public String toJson(Usuarios usuario) {
        Gson gson = new Gson();
        String usuarioJson = gson.toJson(usuario);
        return usuarioJson;
    }

    public String createUsuario(@NonNull Usuarios usuario) {
        String usuarioJson = this.toJson(usuario);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/usuarios-dao/createUsuario",
                        usuarioJson);
        return response;
    }

    // Requer id_usuario
    public String getUsuarioById(@NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "/api.hassam/usuarios-dao/getUsuarioById?id_usuario=" +
                                usuario.getId_usuario());
        return response;
    }

    // Requer login_usuario, senha_usuario
    public String getUsuarioByLoginSenha(@NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get( // getUsuarioByLoginSenha?login_usuario=Fragile&senha_usuario=R4nd0mP4ssW0rd
                        "/api.hassam/usuarios-dao/getUsuarioByLoginSenha?login_usuario=" +
                                usuario.getLogin_usuario() +
                        "&senha_usuario=" +
                                usuario.getSenha_usuario());
        return response;
    }

    // Requer login_usuario, nome_usuario
    public String getSenhaByLoginName(@NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get( // getSenhaByLoginName?login_usuario=Fragile&nome_usuario=Eduardo
                        "/api.hassam/usuarios-dao/getSenhaByLoginName?login_usuario=" +
                                usuario.getLogin_usuario() +
                                "&nome_usuario=" +
                                usuario.getNome_usuario());
        return response;
    }

    // Requer id_usuario, login_usuario, senha_usuario, nome_usuario
    public String updateUsuario(@NonNull Usuarios usuario) {
        String usuarioJson = this.toJson(usuario);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/usuarios-dao/updateUsuario",
                        usuarioJson);
        return  response;
    }

    // NÃO USAR // Requer id_usuario
    public String deleteUsuario(Usuarios usuario) { // Se você está usando esse método
        String usuarioJson = this.toJson(usuario);  // você está fazendo algo errado
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/usuarios-dao/deleteUsuario",
                        usuarioJson);
        return response;
    }

    public Boolean verify_usuario(Usuarios usuario) {
        String response;
        UsuariosDao usuarioDao = new UsuariosDao();

        response = usuarioDao.getUsuarioByLoginSenha(usuario);
        if (response.contains("java.net.")) { // Esse será o maior crime que irei cometer por alguns anos;
            return false;                     // esperançosamente acharei um método mais apropriado antes do fim do projeto
        }
        else {
            return true;
        }
    }
}