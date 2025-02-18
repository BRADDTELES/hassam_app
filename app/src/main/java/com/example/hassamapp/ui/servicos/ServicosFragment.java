package com.example.hassamapp.ui.servicos;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.hassamapp.R;
import com.example.hassamapp.controller.ServicosDao;
import com.example.hassamapp.http.ServicosParser;
import com.example.hassamapp.model.Servicos;
import com.example.hassamapp.model.Usuarios;
import com.example.hassamapp.ui.SharedViewModel;

import java.util.ArrayList;
import java.util.List;

public class ServicosFragment extends Fragment {
    private SharedViewModel sharedViewModel;
    private ServicosViewModel servicosViewModel;
    private ServicosAdapter servicosAdapter;
    private RecyclerView rvServico;

    EditText search_bar_editText;
    //TextView test_textView;
    ImageView search_icon;
    ServicosDao servicoDao = new ServicosDao();
    ServicosParser servicosParser = new ServicosParser();



    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_servicos, container, false);

        rvServico = view.findViewById(R.id.rvServico);
        rvServico.setLayoutManager(new LinearLayoutManager(getContext()));
        servicosAdapter = new ServicosAdapter(new ArrayList<>());
        rvServico.setAdapter(servicosAdapter);

        sharedViewModel = new ViewModelProvider(requireActivity()).get(SharedViewModel.class);
        servicosViewModel = new ViewModelProvider(requireActivity()).get(ServicosViewModel.class);


        search_bar_editText = view.findViewById(R.id.search_bar_editText);
        search_icon = view.findViewById(R.id.search_icon);
        //test_textView = view.findViewById(R.id.test_textView);

        sharedViewModel.getUsuario()
                .observe(getViewLifecycleOwner(), new Observer<Usuarios>() {
            @Override
            public void onChanged(Usuarios usuarios) {
                Log.d("DEBUG-MODE", "Usuário alterado: " + usuarios.getNome_usuario());
                String servicosJson = servicoDao.getAllServico(usuarios);

                ArrayList<Servicos> servicos = servicosParser.get_servicos_from_json(servicosJson);

                Log.d("DEBUG-MODE", "Serviços retornados: " + servicos.size());
                servicosViewModel.setLista_servicos(servicos);
                servicosAdapter.atualizarLista(servicos);
                Log.d("DEBUG-MODE", "Observer do LiveData chamado.");
                /*servicosViewModel.setLista_servicos(servicosParser.get_servicos_from_json(servicoDao.getAllServico(usuarios)));
                Log.d("DEBUG-MODE", " + " + servicosViewModel.getLista_servicos().getValue().size());*/
            }
        });



        search_icon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //Código do botão
                String texto = search_bar_editText.getText().toString();
                filtrarServicos(texto);
            }
        });

        return view;
    }

    private void filtrarServicos(String texto) {
        List<Servicos> listaFiltrada = new ArrayList<>();

        if (servicosViewModel.getLista_servicos().getValue() != null) {
            for (Servicos servico : servicosViewModel.getLista_servicos().getValue()) {
                if (servico.getDesc_servico().toLowerCase().contains(texto.toLowerCase())) {
                    listaFiltrada.add(servico);
                }
            }
        }

        servicosAdapter.atualizarLista(listaFiltrada);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }
}