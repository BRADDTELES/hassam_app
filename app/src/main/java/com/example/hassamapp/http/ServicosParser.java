package com.example.hassamapp.http;

import com.example.hassamapp.model.Servicos;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class ServicosParser {

    public Servicos get_servico_from_json(String servicoJson) {
        Servicos servico = new Servicos(0, "", 0.0, "ativo");
        try {
            JSONObject jsonObject = new JSONObject(servicoJson);
            JSONArray servicos_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < servicos_obj.length(); i++) {
                JSONObject servico_obj = servicos_obj.getJSONObject(i);
                servico.setId_servico(servico_obj.getInt("id_servico"));
                servico.setDesc_servico(servico_obj.getString("desc_servico"));
                servico.setValor_servico(servico_obj.getDouble("valor_servico"));
                servico.setStatus_servico(servico_obj.getString("status_servico"));
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return servico;
    }

    public ArrayList<Servicos> get_servicos_from_json(String servicoJson) {
        Servicos servico = new Servicos(0, "", 0.0, "ativo");
        ArrayList<Servicos> servicos = new ArrayList<>();
        try {
            JSONObject jsonObject = new JSONObject(servicoJson);
            JSONArray servicos_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < servicos_obj.length(); i++) {
                JSONObject servico_obj = servicos_obj.getJSONObject(i);
                servico.setId_servico(servico_obj.getInt("id_servico"));
                servico.setDesc_servico(servico_obj.getString("desc_servico"));
                servico.setValor_servico(servico_obj.getDouble("valor_servico"));
                servico.setStatus_servico(servico_obj.getString("status_servico"));
                servicos.add(servico);
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return servicos;
    }
}
