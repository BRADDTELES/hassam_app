package com.example.hassamapp.ui.agendamentos;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.hassamapp.R;


public class AgendamentosFragment extends Fragment {

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_agendamentos, container, false);


        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }
}