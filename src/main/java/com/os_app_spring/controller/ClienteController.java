package com.os_app_spring.controller;

import com.os_app_spring.entity.Cliente;
import com.os_app_spring.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {
        cliente.setId(null);
        return clienteRepository.save(cliente);
    }

    @GetMapping
    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente getById(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    @PutMapping("/{id}")
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        Cliente existente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        existente.setNome(cliente.getNome());
        existente.setEmail(cliente.getEmail());
        existente.setTelefone(cliente.getTelefone());
        existente.setEndereco(cliente.getEndereco());
        existente.setEmpresa(cliente.getEmpresa());

        return clienteRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }
}
