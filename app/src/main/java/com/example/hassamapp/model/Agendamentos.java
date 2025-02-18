package com.example.hassamapp.model;

public class Agendamentos {
    private Integer id_agendamento;
    private String nome_cliente;
    private String telefone_cliente;
    private String data_agendamento;
    private String hora_agendamento;
    private String status_agendamento;
    private String data_agendamento_between;
    private String hora_agendamento_between;

    public Agendamentos (Integer id_agendamento, String nome_cliente, String telefone_cliente, String data_agendamento, String hora_agendamento, String status_agendamento) {
        if (status_agendamento.equalsIgnoreCase("ativo") || status_agendamento.equalsIgnoreCase("inativo")) {
            this.id_agendamento = id_agendamento;
            this.nome_cliente = nome_cliente;
            this.telefone_cliente = telefone_cliente;
            this.data_agendamento = data_agendamento;
            this.hora_agendamento = hora_agendamento;
            this.status_agendamento = status_agendamento.toLowerCase();
        }
        else  {
            throw new IllegalArgumentException("Argumento {status_agendamento} não é \"ativo\" ou \"inativo\".");
        }
    }

    public Integer getId_agendamento() {
        return id_agendamento;
    }

    public void setId_agendamento(Integer id_agendamento) {
        this.id_agendamento = id_agendamento;
    }

    public String getNome_cliente() {
        return nome_cliente;
    }

    public void setNome_cliente(String nome_cliente) {
        this.nome_cliente = nome_cliente;
    }

    public String getTelefone_cliente() {
        return telefone_cliente;
    }

    public void setTelefone_cliente(String telefone_cliente) {
        this.telefone_cliente = telefone_cliente;
    }

    public String getData_agendamento() {
        return data_agendamento;
    }

    public void setData_agendamento(String data_agendamento) {
        this.data_agendamento = data_agendamento;
    }

    public String getHora_agendamento() {
        return hora_agendamento;
    }

    public void setHora_agendamento(String hora_agendamento) {
        this.hora_agendamento = hora_agendamento;
    }

    public String getStatus_agendamento() {
        return status_agendamento;
    }

    public void setStatus_agendamento(String status_agendamento) {
        if (status_agendamento.equalsIgnoreCase("ativo") || status_agendamento.equalsIgnoreCase("inativo")) {
            this.status_agendamento = status_agendamento.toLowerCase();
        }
        else {
            throw new IllegalArgumentException("Argumento {status_agendamento} não é \"ativo\" ou \"inativo\".");
        }
    }

    public String getData_agendamento_between() {
        return data_agendamento_between;
    }

    public void setData_agendamento_between(String data_agendamento_between) {
        this.data_agendamento_between = data_agendamento_between;
    }

    public String getHora_agendamento_between() {
        return hora_agendamento_between;
    }

    public void setHora_agendamento_between(String hora_agendamento_between) {
        this.hora_agendamento_between = hora_agendamento_between;
    }
}
