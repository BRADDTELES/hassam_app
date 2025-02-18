package com.example.hassamapp.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Usuarios implements Parcelable {
    private Integer id_usuario;
    private String login_usuario;
    private String senha_usuario;
    private String nome_usuario;

    public Usuarios (Integer id_usuario, String login_usuario, String senha_usuario, String nome_usuario) {
        this.id_usuario = id_usuario;
        this.login_usuario = login_usuario;
        this.senha_usuario = senha_usuario;
        this.nome_usuario = nome_usuario;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getLogin_usuario() {
        return login_usuario;
    }

    public void setLogin_usuario(String login_usuario) {
        this.login_usuario = login_usuario;
    }

    public String getSenha_usuario() {
        return senha_usuario;
    }

    public void setSenha_usuario(String senha_usuario) {
        this.senha_usuario = senha_usuario;
    }

    public String getNome_usuario() {
        return nome_usuario;
    }

    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }

    //////////////////////////////////////////////////
    // Saudades Serializable
    protected Usuarios(Parcel in) {
        this.id_usuario = in.readInt();
        this.login_usuario = in.readString();
        this.senha_usuario = in.readString();
        this.nome_usuario = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(this.id_usuario);
        dest.writeString(this.login_usuario);
        dest.writeString(this.senha_usuario);
        dest.writeString(this.nome_usuario);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Usuarios> CREATOR = new Creator<Usuarios>() {
        @Override
        public Usuarios createFromParcel(Parcel in) {
            return new Usuarios(in);
        }

        @Override
        public Usuarios[] newArray(int size) {
            return new Usuarios[size];
        }
    };
}
