package com.os_app_spring.dto;

public class RegisterRequest {
    private String nome;
    private String email;
    private String senha;

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }
}
