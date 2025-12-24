package com.os_app_spring.controller;

import com.os_app_spring.entity.Empresa;
import com.os_app_spring.repository.EmpresaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresa")
public class EmpresaContoller {

    private final EmpresaRepository empresaRepository;

    public EmpresaContoller(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    @PostMapping
    public Empresa create(@RequestBody Empresa empresa) {
        empresa.setId(null);
        return empresaRepository.save(empresa);
    }

    @GetMapping
    public List<Empresa> getAll() {
        return empresaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Empresa getById(@PathVariable Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
    }

    @PutMapping("/{id}")
    public Empresa update(@PathVariable Long id, @RequestBody Empresa empresa) {
        Empresa existente = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        existente.setNome(empresa.getNome());
        existente.setCnpj(empresa.getCnpj());
        existente.setTelefone(empresa.getTelefone());
        existente.setEmail(empresa.getEmail());
        existente.setEndereco(empresa.getEndereco());
        existente.setUser(empresa.getUser());

        return empresaRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!empresaRepository.existsById(id)) {
            throw new RuntimeException("Empresa não encontrada");
        }
        empresaRepository.deleteById(id);
    }
}
