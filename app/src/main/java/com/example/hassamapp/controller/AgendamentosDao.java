package com.example.hassamapp.controller;

import androidx.annotation.NonNull;
import com.example.hassamapp.http.HttpHelper;
import com.example.hassamapp.model.Agendamentos;
import com.example.hassamapp.model.Usuarios;
import com.google.gson.Gson;

public class AgendamentosDao {

    public String toJson(Agendamentos agendamento) {
        Gson gson = new Gson();
        String agendamentoJson = gson.toJson(agendamento);
        return agendamentoJson;
    }

    public String createAgendamento(@NonNull Agendamentos agendamento) {
        String agendamentoJson = this.toJson(agendamento);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/agendamentos-dao/createAgendamento",
                        agendamentoJson);
        return response;
    }

    public String getAllAgendamento(@NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "/api.hassam/agendamentos-dao/getAllAgendamento?id_usuario=" +
                                usuario.getId_usuario());
        return  response;
    }

    // Requer
    public String getAgendamentoByNome(@NonNull Agendamentos agendamento, @NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoByNome?nome_cliente=" +
                                agendamento.getNome_cliente() +
                                "&id_usuario=" +
                                usuario.getId_usuario());              ;
        return response;
    }

    public String getAgendamentoByData(@NonNull Agendamentos agendamento, @NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoByData?data_agendamento=" +
                                agendamento.getData_agendamento() +
                                "&id_usuario=" +
                                usuario.getId_usuario());              ;
        return response;
    }

    public String getAgendamentoByBetweenData(@NonNull Agendamentos agendamento, @NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoByBetweenData?data_agendamento=" +
                                agendamento.getData_agendamento() +
                                "&data_agendamento_between=" +
                                agendamento.getData_agendamento_between() +
                                "&id_usuario=" +
                                usuario.getId_usuario());              ;
        return response;
    }

    public String getAgendamentoByHora(@NonNull Agendamentos agendamento, @NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoByHora?data_agendamento=" +
                                agendamento.getData_agendamento() +
                                "&id_usuario=" +
                                usuario.getId_usuario() +
                                "&hora_agendamento=" +
                                agendamento.getHora_agendamento());              ;
        return response;
    }

    public String getAgendamentoByBetweenHora(@NonNull Agendamentos agendamento, @NonNull Usuarios usuario) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoByBetweenHora?data_agendamento=" +
                                agendamento.getData_agendamento() +
                                "&hora_agendamento_between=" +
                                agendamento.getHora_agendamento_between() +
                                "id_usuario=" +
                                usuario.getId_usuario() +
                                "&hora_agendamento=" +
                                agendamento.getHora_agendamento());              ;
        return response;
    }

    public String updateAgendamento(@NonNull Agendamentos agendamento) {
        String agendamentoJson = this.toJson(agendamento);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/agendamentos-dao/updateAgendamento",
                        agendamentoJson);
        return  response;
    }

    public String inativarAgendamento(@NonNull Agendamentos agendamento) {
        String agendamentoJson = this.toJson(agendamento);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/agendamentos-dao/inativarAgendamento",
                        agendamentoJson);
        return  response;
    }

    /*public String deleteAgendamentoInativo(@NonNull Usuarios usuario) { //// Se você está usando esse método
        String usuarioJson = this.toJson(servico);                  // você está fazendo algo errado
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/servicos-dao/deleteServicoInativo",
                        usuarioJson);
        return  response;
    }*/
}