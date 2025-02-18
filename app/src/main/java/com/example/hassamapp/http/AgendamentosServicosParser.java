package com.example.hassamapp.http;

import android.util.Log;
import com.example.hassamapp.model.AgendamentosServicos;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class AgendamentosServicosParser {

    public AgendamentosServicos get_gendamentoServico_from_json(String gendamentoServicoJson) {
        AgendamentosServicos agendamentoServico = new AgendamentosServicos(0, 0, 0, 0);
        try {
            JSONObject jsonObject = new JSONObject(gendamentoServicoJson);
            JSONArray gendamentosServicos_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < gendamentosServicos_obj.length(); i++) {
                JSONObject gendamentoServico_obj = gendamentosServicos_obj.getJSONObject(i);
                agendamentoServico.setId_agendamentosServico(gendamentoServico_obj.getInt("id_agendamentoServico"));
                agendamentoServico.setId_servico(gendamentoServico_obj.getInt("id_servico"));
                agendamentoServico.setId_agendamento(gendamentoServico_obj.getInt("id_agendamento"));
                agendamentoServico.setQt_servico(gendamentoServico_obj.getInt("qt_servico"));
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return agendamentoServico;
    }

    public ArrayList<AgendamentosServicos> get_gendamentosServicos_from_json(String gendamentoServicoJson) {
        AgendamentosServicos agendamentoServico = new AgendamentosServicos(0, 0, 0, 0);
        ArrayList<AgendamentosServicos> agendamentosServicos = new ArrayList<>();
        try {
            JSONObject jsonObject = new JSONObject(gendamentoServicoJson);
            JSONArray gendamentosServicos_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < gendamentosServicos_obj.length(); i++) {
                JSONObject gendamentoServico_obj = gendamentosServicos_obj.getJSONObject(i);
                agendamentoServico.setId_agendamentosServico(gendamentoServico_obj.getInt("id_agendamentoServico"));
                agendamentoServico.setId_servico(gendamentoServico_obj.getInt("id_servico"));
                agendamentoServico.setId_agendamento(gendamentoServico_obj.getInt("id_agendamento"));
                agendamentoServico.setQt_servico(gendamentoServico_obj.getInt("qt_servico"));
                agendamentosServicos.add(agendamentoServico);
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return agendamentosServicos;
    }
}