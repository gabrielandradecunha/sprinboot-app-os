package com.os_app_spring.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "os")
public class Os {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String numero;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(name = "tipo_produto", length = 100)
    private String tipoProduto;

    @Column(columnDefinition = "text")
    private String defeito;

    @Column(columnDefinition = "text")
    private String complemento;

    @Column(name = "data_emissao")
    private LocalDateTime dataEmissao;

    @Column(name = "data_conclusao")
    private LocalDateTime dataConclusao;

    private Boolean status;

    @Column(nullable = false, length = 255)
    private String descricao;

    @Column(precision = 10, scale = 2)
    private BigDecimal valor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_tecnico")
    private User tecnico;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Empresa empresa;

    public Os() {
    }

    public Long getId() {
        return id;
    }

    public String getNumero() {
        return numero;
    }

    public String getNome() {
        return nome;
    }

    public String getTipoProduto() {
        return tipoProduto;
    }

    public String getDefeito() {
        return defeito;
    }

    public String getComplemento() {
        return complemento;
    }

    public LocalDateTime getDataEmissao() {
        return dataEmissao;
    }

    public LocalDateTime getDataConclusao() {
        return dataConclusao;
    }

    public Boolean getStatus() {
        return status;
    }

    public String getDescricao() {
        return descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public User getTecnico() {
        return tecnico;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipoProduto(String tipoProduto) {
        this.tipoProduto = tipoProduto;
    }

    public void setDefeito(String defeito) {
        this.defeito = defeito;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public void setDataEmissao(LocalDateTime dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public void setDataConclusao(LocalDateTime dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public void setTecnico(User tecnico) {
        this.tecnico = tecnico;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
}
