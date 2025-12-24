package com.os_app_spring.controller;

import com.os_app_spring.entity.Os;
import com.os_app_spring.repository.OsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/os")
public class OsController {

    private final OsRepository osRepository;

    public OsController(OsRepository osRepository) {
        this.osRepository = osRepository;
    }

    @PostMapping
    public Os create(@RequestBody Os os) {
        os.setId(null);
        return osRepository.save(os);
    }

    @GetMapping
    public List<Os> getAll() {
        return osRepository.findAll();
    }

    @GetMapping("/{id}")
    public Os getById(@PathVariable Long id) {
        return osRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OS não encontrada"));
    }

    @PutMapping("/{id}")
    public Os update(@PathVariable Long id, @RequestBody Os os) {
        Os existente = osRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OS não encontrada"));

        existente.setNumero(os.getNumero());
        existente.setNome(os.getNome());
        existente.setTipoProduto(os.getTipoProduto());
        existente.setDefeito(os.getDefeito());
        existente.setComplemento(os.getComplemento());
        existente.setDataConclusao(os.getDataConclusao());
        existente.setStatus(os.getStatus());
        existente.setDescricao(os.getDescricao());
        existente.setValor(os.getValor());
        existente.setCliente(os.getCliente());
        existente.setTecnico(os.getTecnico());
        existente.setEmpresa(os.getEmpresa());

        return osRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!osRepository.existsById(id)) {
            throw new RuntimeException("OS não encontrada");
        }
        osRepository.deleteById(id);
    }
}
