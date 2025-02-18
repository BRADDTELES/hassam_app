package com.example.hassamapp.controller;

import androidx.annotation.NonNull;
import com.example.hassamapp.http.HttpHelper;
import com.example.hassamapp.model.Agendamentos;
import com.example.hassamapp.model.AgendamentosServicos;
import com.example.hassamapp.model.Servicos;
import com.google.gson.Gson;

public class AgendamentosServicosDao {

    public String toJson(AgendamentosServicos agendamentoServico) {
        Gson gson = new Gson();
        String agendamentoServicoJson = gson.toJson(agendamentoServico);
        return agendamentoServicoJson;
    }

    public String createAgendamentoServico(@NonNull AgendamentosServicos agendamentoServico) {
        String agendamentoServicoJson = this.toJson(agendamentoServico);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/agendamentosServicos-dao/createAgendamentoServico",
                        agendamentoServicoJson);
        return response;
    }

    public String getAgendamentoServicoByAgendamento(@NonNull Agendamentos agendamento) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoServicoByAgendamento?id_agendamento=" +
                                agendamento.getId_agendamento());              ;
        return response;
    }

    public String getAgendamentoServicoByServico(@NonNull Servicos servico) {
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.get(
                        "api.hassam/Agendamentos-dao/getAgendamentoServicoByServico?id_servico=" +
                                servico.getId_servico());
        return response;
    }

    public String updateAgendamentoServico(@NonNull AgendamentosServicos agendamentoServico) {
        String agendamentoServicoJson = this.toJson(agendamentoServico);
        HttpHelper httpHelper = new HttpHelper();
        String response =
                httpHelper.post(
                        "/api.hassam/agendamentosServicos-dao/updateAgendamentoServico",
                        agendamentoServicoJson);
        return  response;
    }
}