package com.example.hassamapp.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Servicos implements Parcelable {
    private Integer id_servico;
    private String desc_servico;
    private Double valor_servico;
    private String status_servico;

    public Servicos (Integer id_servico, String desc_servico, Double valor_servico, String status_servico) {
        if (status_servico.equalsIgnoreCase("ativo") || status_servico.equalsIgnoreCase("inativo")) {
            this.id_servico = id_servico;
            this.desc_servico = desc_servico;
            this.valor_servico = valor_servico;
            this.status_servico = status_servico.toLowerCase();
        }
        else {
            throw new IllegalArgumentException("Argumento {status_servico} não é \"ativo\" ou \"inativo\".");
        }
    }

    public Integer getId_servico() {
        return id_servico;
    }

    public void setId_servico(Integer id_servico) {
        this.id_servico = id_servico;
    }

    public String getDesc_servico() {
        return desc_servico;
    }

    public void setDesc_servico(String desc_servico) {
        this.desc_servico = desc_servico;
    }

    public Double getValor_servico() {
        return valor_servico;
    }

    public void setValor_servico(Double valor_servico) {
        this.valor_servico = valor_servico;
    }

    public String getStatus_servico() {
        return status_servico;
    }

    public void setStatus_servico(String status_servico) {
        if (status_servico.equalsIgnoreCase("ativo") || status_servico.equalsIgnoreCase("inativo")) {
            this.status_servico = status_servico.toLowerCase();
        }
        else {
            throw new IllegalArgumentException("Argumento {status_servico} não é \"ativo\" ou \"inativo\".");
        }
    }

    //////////////////////////////////////////////////
    protected Servicos(Parcel in) {
        this.id_servico = in.readInt();
        this.desc_servico = in.readString();
        this.valor_servico = in.readDouble();
        this.status_servico = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(this.id_servico);
        dest.writeString(this.desc_servico);
        dest.writeDouble(this.valor_servico);
        dest.writeString(this.status_servico);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Servicos> CREATOR = new Creator<Servicos>() {
        @Override
        public Servicos createFromParcel(Parcel in) {
            return new Servicos(in);
        }

        @Override
        public Servicos[] newArray(int size) {
            return new Servicos[size];
        }
    };
}
