package com.example.hassamapp.ui;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.hassamapp.model.Usuarios;

public class SharedViewModel extends ViewModel {
    private final MutableLiveData<Usuarios> usuario_logado = new MutableLiveData<>();

    public void setUsuario(Usuarios usuario) {
        usuario_logado.setValue(usuario);
    }

    public MutableLiveData<Usuarios> getUsuario() {
        return usuario_logado;
    }

}
