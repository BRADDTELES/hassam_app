package com.example.hassamapp.http;
import com.example.hassamapp.model.Usuarios;

import android.util.Log;
import org.json.JSONArray;
import org.json.JSONObject;

public class UsuariosParser {

    public Usuarios get_usuario_from_json(String usuarioJson) {
        Usuarios usuario = new Usuarios(0, "", "", "");
        try {
            JSONObject jsonObject = new JSONObject(usuarioJson);
            JSONArray usuarios_obj = jsonObject.getJSONArray("response");

            for (Integer i = 0; i < usuarios_obj.length(); i++) {
                JSONObject usuario_obj = usuarios_obj.getJSONObject(i);
                usuario.setId_usuario(usuario_obj.getInt("id_usuario"));
                usuario.setLogin_usuario(usuario_obj.getString("login_usuario"));
                usuario.setSenha_usuario(usuario_obj.getString("senha_usuario"));
                usuario.setNome_usuario(usuario_obj.getString("nome_usuario"));
            }
        } catch (Exception e) {
            String error = e.toString();
            Log.d("DEBUG-MODE", error);
        }
        return usuario;
    }
}
