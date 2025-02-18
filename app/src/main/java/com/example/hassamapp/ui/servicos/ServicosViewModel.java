package com.example.hassamapp.ui.servicos;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.hassamapp.model.Servicos;

import java.util.ArrayList;
import java.util.List;

public class ServicosViewModel extends ViewModel {
    private final MutableLiveData<ArrayList<Servicos>> lista_servicos = new MutableLiveData<>();

    public void setLista_servicos(ArrayList<Servicos> listaServicos) {
        lista_servicos.setValue(listaServicos);
    }

    public LiveData<ArrayList<Servicos>> getLista_servicos() {
        return lista_servicos;
    }
}
