package com.example.hassamapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.hassamapp.controller.UsuariosDao;
import com.example.hassamapp.http.UsuariosParser;
import com.example.hassamapp.model.Usuarios;

public class screen_login_activity extends AppCompatActivity {
    EditText username_editText,
            password_editText;
    Usuarios usuario = new Usuarios(0, "", "", "");
    UsuariosDao usuarioDao = new UsuariosDao();
    UsuariosParser usuarioParser = new UsuariosParser();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen_login);

        username_editText = findViewById(R.id.username_editText);
        password_editText = findViewById(R.id.password_editText);
    }

    public void button_login(View view) {
        usuario.setLogin_usuario(username_editText.getText().toString());
        usuario.setSenha_usuario(password_editText.getText().toString());
        Boolean verified = usuarioDao.verify_usuario(usuario);
        if (verified) {
            String response = usuarioDao.getUsuarioByLoginSenha(usuario);
            if (!response.equals("{\"response\":[]}")) {
                usuario = usuarioParser.get_usuario_from_json(response);
                Intent intent = new Intent(screen_login_activity.this, screen_home_activity.class);
                intent.putExtra("usuario", usuario);
                startActivity(intent);
            }
            else if (response.equals("{\"response\":[]}")) {
                Toast.makeText(this, "Usuário ou senha incorretos", Toast.LENGTH_LONG).show();
                Log.d("DEBUG-MODE", "Usuário e/ou senha incorretos.");
            }
            else {
                Log.d("DEBUG-MODE", "button_screen_login_try_if_error_in");
            }
        }
        else {
            Log.d("DEBUG-MODE", "button_screen_login_try_if_error_out");
            Toast.makeText(this, "Um erro ocorreu, tente novamente mais tarde.", Toast.LENGTH_LONG).show();
        }
    }
}

/*  Inserir usuário
        usuario.setLogin_usuario("Eduardo");
        usuario.setNome_usuario("Eduardo Q");
        usuario.setSenha_usuario("senha_do_eduardo");
        String response = usuarioDao.createUsuario(usuario);
        */


        /*  Buscar usuário por Id
        usuario.setId_usuario(1);
        String response = usuarioDao.getUsuarioById(usuario);
        */


        /*  Buscar usuário por Login/Senha
        usuario.setLogin_usuario("1,");
        usuario.setSenha_usuario("Core de Lapurasu");
        String response = usuarioDao.getUsuarioByLoginSenha(usuario);
         */


        /* Buscar senha por Login/Nome
        usuario.setLogin_usuario("Fragile");
        usuario.setNome_usuario("Eduardo");
        String response = usuarioDao.getSenhaByLoginName(usuario);
         */


        /*  Atualizar usuário
        usuario.setSenha_usuario("P4ssW0rdL4pl4c3_Fr4g1l3");
        usuario.setNome_usuario("Eduardo");
        usuario.setLogin_usuario("Fragile");
        usuario.setId_usuario(105);
        String response = usuarioDao.updateUsuario(usuario);
        */

//Log.d("DEBUG-MODE", response);