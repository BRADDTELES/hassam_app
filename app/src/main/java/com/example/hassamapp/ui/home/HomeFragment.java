package com.example.hassamapp.ui.home;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.hassamapp.R;
import com.example.hassamapp.http.UsuariosParser;
import com.example.hassamapp.model.Usuarios;
import com.example.hassamapp.ui.SharedViewModel;

public class HomeFragment extends Fragment {
    private SharedViewModel sharedViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        EditText user_textView = view.findViewById(R.id.user_textView);
        sharedViewModel = new ViewModelProvider(requireActivity()).get(SharedViewModel.class);


        /// lembrar de testar se o usuário foi passado corretamente
        sharedViewModel.getUsuario().observe(getViewLifecycleOwner(), new Observer<Usuarios>() {
            @Override
            public void onChanged(Usuarios usuario) {
                String nome = usuario.getNome_usuario();
                user_textView.setText(nome);
            }
        });

        return view;
    }



    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }
}