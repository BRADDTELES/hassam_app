package com.example.hassamapp.http;

import android.util.Log;
import com.example.hassamapp.model.Agendamentos;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class AgendamentosParser {

    public Agendamentos get_agendamento_from_json(String agendamentoJson) {
        Agendamentos agendamento = new Agendamentos(0, "", "", "", "", "ativo");
        try {
            JSONObject jsonObject = new JSONObject(agendamentoJson);
            JSONArray agendamentos_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < agendamentos_obj.length(); i++) {
                JSONObject agendamento_obj = agendamentos_obj.getJSONObject(i);
                agendamento.setId_agendamento(agendamento_obj.getInt("id_agendamento"));
                agendamento.setNome_cliente(agendamento_obj.getString("nome_cliente"));
                agendamento.setTelefone_cliente(agendamento_obj.getString("telefone_cliente"));
                agendamento.setData_agendamento(agendamento_obj.getString("data_agendamento"));
                agendamento.setHora_agendamento(agendamento_obj.getString("hora_agendamento"));
                agendamento.setStatus_agendamento(agendamento_obj.getString("status_agendamento"));
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return agendamento;
    }

    public ArrayList<Agendamentos> get_agendamentos_from_json(String agendamentoJson) {
        Agendamentos agendamento = new Agendamentos(0, "", "", "", "", "ativo");
        ArrayList<Agendamentos> agendamentos = new ArrayList<>();
        try {
            JSONObject jsonObject = new JSONObject(agendamentoJson);
            JSONArray agendamentos_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < agendamentos_obj.length(); i++) {
                JSONObject agendamento_obj = agendamentos_obj.getJSONObject(i);
                agendamento.setId_agendamento(agendamento_obj.getInt("id_agendamento"));
                agendamento.setNome_cliente(agendamento_obj.getString("nome_cliente"));
                agendamento.setTelefone_cliente(agendamento_obj.getString("telefone_cliente"));
                agendamento.setData_agendamento(agendamento_obj.getString("data_agendamento"));
                agendamento.setHora_agendamento(agendamento_obj.getString("hora_agendamento"));
                agendamento.setStatus_agendamento(agendamento_obj.getString("status_agendamento"));
                agendamentos.add(agendamento);
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return agendamentos;
    }
}
