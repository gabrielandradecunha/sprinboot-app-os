package com.os_app_spring.controller;

import com.os_app_spring.dto.OsListDTO;
import com.os_app_spring.entity.Os;
import com.os_app_spring.repository.ClienteRepository;
import com.os_app_spring.repository.EmpresaRepository;
import com.os_app_spring.repository.OsRepository;
import com.os_app_spring.dto.OsDTO;
import com.os_app_spring.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/os")
public class OsController {

    private final OsRepository osRepository;
    private final ClienteRepository clienteRepository;
    private final UserRepository userRepository;
    private final EmpresaRepository empresaRepository;

    public OsController(
            OsRepository osRepository,
            ClienteRepository clienteRepository,
            UserRepository userRepository,
            EmpresaRepository empresaRepository
    ) {
        this.osRepository = osRepository;
        this.clienteRepository = clienteRepository;
        this.userRepository = userRepository;
        this.empresaRepository = empresaRepository;
    }

    @PostMapping
    public OsDTO create(@RequestBody OsDTO dto) {

        Os os = new Os();
        os.setNome(dto.getNome());
        os.setNumero(dto.getNumero());
        os.setTipoProduto(dto.getTipo_produto());
        os.setDefeito(dto.getDefeito());
        os.setComplemento(dto.getComplemento());
        os.setDescricao(dto.getDescricao());
        os.setValor(dto.getValor());
        os.setStatus(dto.getStatus());

        os.setCliente(
                clienteRepository.findById(dto.getId_cliente())
                        .orElseThrow(() -> new RuntimeException("Cliente não encontrado"))
        );

        os.setTecnico(
                userRepository.findById(dto.getId_tecnico())
                        .orElseThrow(() -> new RuntimeException("Técnico não encontrado"))
        );

        if (dto.getId_empresa() != null) {
            os.setEmpresa(
                    empresaRepository.findById(dto.getId_empresa())
                            .orElseThrow(() -> new RuntimeException("Empresa não encontrada"))
            );
        }

        Os salva = osRepository.save(os);

        return new OsDTO(salva);
    }

    @GetMapping
    public List<OsListDTO> getAll() {
        return osRepository.findAll()
                .stream()
                .map(OsListDTO::new)
                .toList();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!osRepository.existsById(id)) {
            throw new RuntimeException("OS não encontrada");
        }
        osRepository.deleteById(id);
    }


}

