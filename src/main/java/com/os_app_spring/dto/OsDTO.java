package com.os_app_spring.dto;

import com.os_app_spring.entity.Os;

import java.math.BigDecimal;

public class OsDTO {

    private String nome;
    private String numero;
    private String tipo_produto;
    private String defeito;
    private String complemento;
    private String descricao;
    private BigDecimal valor;
    private Boolean status;

    private Long id_cliente;
    private Long id_tecnico;
    private Long id_empresa;

    public OsDTO() {}

    public OsDTO(Os os) {
        this.numero = os.getNumero();
        this.nome = os.getNome();
        this.tipo_produto = os.getTipoProduto();
        this.defeito = os.getDefeito();
        this.descricao = os.getDescricao();
        this.valor = os.getValor();
        this.status = os.getStatus();
    }

    // getters e setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getTipo_produto() { return tipo_produto; }
    public void setTipo_produto(String tipo_produto) { this.tipo_produto = tipo_produto; }

    public String getDefeito() { return defeito; }
    public void setDefeito(String defeito) { this.defeito = defeito; }

    public String getComplemento() { return complemento; }
    public void setComplemento(String complemento) { this.complemento = complemento; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }

    public Long getId_cliente() { return id_cliente; }
    public void setId_cliente(Long id_cliente) { this.id_cliente = id_cliente; }

    public Long getId_tecnico() { return id_tecnico; }
    public void setId_tecnico(Long id_tecnico) { this.id_tecnico = id_tecnico; }

    public Long getId_empresa() { return id_empresa; }
    public void setId_empresa(Long id_empresa) { this.id_empresa = id_empresa; }
}
