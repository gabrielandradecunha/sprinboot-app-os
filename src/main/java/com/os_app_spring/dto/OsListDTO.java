package com.os_app_spring.dto;

import com.os_app_spring.entity.Os;

public class OsListDTO {

    private Long id;
    private String numero;
    private String cliente;
    private String tipoProduto;
    private String defeito;
    private String descricao;
    private Double valor;
    private Boolean status;

    public OsListDTO(Os os) {
        this.id = os.getId();
        this.numero = os.getNumero();
        this.cliente = os.getCliente().getNome();
        this.tipoProduto = os.getTipoProduto();
        this.defeito = os.getDefeito();
        this.descricao = os.getDescricao();
        this.valor = os.getValor() != null ? os.getValor().doubleValue() : 0.0;
        this.status = os.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getTipoProduto() {
        return tipoProduto;
    }

    public void setTipoProduto(String tipoProduto) {
        this.tipoProduto = tipoProduto;
    }

    public String getDefeito() {
        return defeito;
    }

    public void setDefeito(String defeito) {
        this.defeito = defeito;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
