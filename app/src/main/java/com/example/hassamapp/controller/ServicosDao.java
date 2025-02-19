package com.example.hassamapp.controller;

import androidx.annotation.NonNull;
import com.example.hassamapp.http.HttpHelper;
import com.example.hassamapp.model.Servicos;
import com.example.hassamapp.model.Usuarios;
import com.google.gson.Gson;

public class ServicosDao {

    public String toJson(Servicos servico) {
        Gson gson = new Gson();
        String servicoJson = gson.toJson(servico);
        return servicoJson;
    }

    public String createServico(@NonNull Servicos servico) {
        String servicoJson = this.toJson(servico);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/servicos-dao/createServico",
                        servicoJson);
        return response;
    }

    // Requer desc_servico, id_usuario
    public String getServicoByDesc(@NonNull Servicos servico, @NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get( ///api.hassam/servicos-dao/getServicoByDesc?id_usuario=2&desc_servico="corte de lapurasu"
                        "api.hassam/servicos-dao/getServicoByDesc?id_usuario=" +
                                usuario.getId_usuario() +
                        "&desc_servico=" +
                                servico.getDesc_servico());                ;
        return response;
    }

    // Requer id_usuario
    public String getAllServico(@NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "/api.hassam/servicos-dao/getAllServico?id_usuario=" +
                                usuario.getId_usuario());
        return  response;
    }

    // Requer id_servico, desc_servico, valor_servico
    public String updateServico(@NonNull Servicos servico) {
        String servicoJson = this.toJson(servico);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/servicos-dao/updateServico",
                        servicoJson);
        return  response;
    }

    // Requer id_servico
    public String inativarServico(@NonNull Servicos servico) {
        String servicoJson = this.toJson(servico);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/servicos-dao/inativarServico",
                        servicoJson);
        return  response;
    }

}