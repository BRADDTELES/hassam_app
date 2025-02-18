package com.example.hassamapp.ui.servicos;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hassamapp.R;
import com.example.hassamapp.model.Servicos;

import java.util.ArrayList;
import java.util.List;

public class ServicosAdapter extends RecyclerView.Adapter<ServicosAdapter.ServicoViewHolder> {

    private ArrayList<Servicos> servicosList;

    public ServicosAdapter(ArrayList<Servicos> servicosList) {
        this.servicosList = servicosList;
    }

    @NonNull
    @Override
    public ServicoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_servicos, parent, false);
        return new ServicoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ServicoViewHolder holder, int position) {
        Servicos servico = servicosList.get(position);
        String precoFormatado = formatarPreco(servico.getValor_servico());
        holder.descricaoServico.setText(servico.getDesc_servico());
        holder.precoServico.setText("R$ " + precoFormatado );
    }

    @Override
    public int getItemCount() {
        return servicosList.size();
    }

    public void atualizarLista(List<Servicos> novaLista) {
        servicosList.clear();
        servicosList.addAll(novaLista);
        notifyDataSetChanged();
    }

    private String formatarPreco(Double valor) {
        java.text.DecimalFormatSymbols symbols = new java.text.DecimalFormatSymbols();
        symbols.setDecimalSeparator(',');
        java.text.DecimalFormat decimalFormat = new java.text.DecimalFormat("#.00");
        return decimalFormat.format(valor);
    }

    public static class ServicoViewHolder extends RecyclerView.ViewHolder {
        TextView descricaoServico;
        TextView precoServico;

        public ServicoViewHolder(@NonNull View itemView) {
            super(itemView);
            descricaoServico = itemView.findViewById(R.id.textViewDescricaoServico);
            precoServico = itemView.findViewById(R.id.textViewPrecoServico);
        }
    }
}
