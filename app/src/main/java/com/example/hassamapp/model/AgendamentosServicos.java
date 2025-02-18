package com.example.hassamapp.model;

public class AgendamentosServicos {
    private Integer id_agendamentoServico;
    private Integer id_servico;
    private Integer id_agendamento;
    private Integer qt_servico;

    public AgendamentosServicos(Integer id_agendamentosServico, Integer id_servico, Integer id_agendamento, Integer qt_servico) {
        this.id_agendamentoServico = id_agendamentosServico;
        this.id_servico = id_servico;
        this.id_agendamento = id_agendamento;
        this.qt_servico = qt_servico;
    }

    public Integer getId_agendamentosServico() {
        return id_agendamentoServico;
    }

    public void setId_agendamentosServico(Integer id_agendamentosServico) {
        this.id_agendamentoServico = id_agendamentosServico;
    }

    public Integer getId_servico() {
        return id_servico;
    }

    public void setId_servico(Integer id_servico) {
        this.id_servico = id_servico;
    }

    public Integer getId_agendamento() {
        return id_agendamento;
    }

    public void setId_agendamento(Integer id_agendamento) {
        this.id_agendamento = id_agendamento;
    }

    public Integer getQt_servico() {
        return qt_servico;
    }

    public void setQt_servico(Integer qt_servico) {
        this.qt_servico = qt_servico;
    }
}