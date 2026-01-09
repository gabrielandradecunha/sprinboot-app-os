package com.os_app_spring.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.os_app_spring.dto.OsDTO;
import com.os_app_spring.entity.Cliente;
import com.os_app_spring.entity.Empresa;
import com.os_app_spring.entity.Os;
import com.os_app_spring.entity.User;
import com.os_app_spring.repository.ClienteRepository;
import com.os_app_spring.repository.EmpresaRepository;
import com.os_app_spring.repository.OsRepository;
import com.os_app_spring.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/* testando o controller principal da aplicação, a partir dele garantiremos
que o restante das rotas da API está funcionando também*/

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class OsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private OsRepository osRepository;

    @MockitoBean
    private ClienteRepository clienteRepository;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private EmpresaRepository empresaRepository;

    @Test
    void deveCriarUmaOs() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setId(1L);

        User tecnico = new User();
        tecnico.setId(2L);

        Empresa empresa = new Empresa();
        empresa.setId(3L);

        Os osSalva = new Os();
        osSalva.setId(10L);
        osSalva.setNome("OS Teste");

        Mockito.when(clienteRepository.findById(1L))
                .thenReturn(Optional.of(cliente));
        Mockito.when(userRepository.findById(2L))
                .thenReturn(Optional.of(tecnico));
        Mockito.when(empresaRepository.findById(3L))
                .thenReturn(Optional.of(empresa));
        Mockito.when(osRepository.save(Mockito.any(Os.class)))
                .thenReturn(osSalva);

        OsDTO dto = new OsDTO();
        dto.setNome("OS Teste");
        dto.setNumero("123");
        dto.setTipo_produto("Notebook");
        dto.setDefeito("Não liga");
        dto.setComplemento("Fonte queimada");
        dto.setDescricao("Cliente relatou falha");
        dto.setValor(BigDecimal.valueOf(250));
        dto.setStatus(true);
        dto.setId_cliente(1L);
        dto.setId_tecnico(2L);
        dto.setId_empresa(3L);

        mockMvc.perform(post("/os")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("OS Teste"));
    }

    @Test
    void deveListarTodasAsOs() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Cliente Teste");

        Os os1 = new Os();
        os1.setId(1L);
        os1.setNome("OS 1");
        os1.setCliente(cliente);

        Os os2 = new Os();
        os2.setId(2L);
        os2.setNome("OS 2");
        os2.setCliente(cliente);

        Mockito.when(osRepository.findAll())
                .thenReturn(List.of(os1, os2));

        mockMvc.perform(get("/os"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].cliente").value("Cliente Teste"));

    }

    @Test
    void deveExcluirUmaOs() throws Exception {
        Mockito.when(osRepository.existsById(1L))
                .thenReturn(true);
        mockMvc.perform(delete("/os/1"))
                .andExpect(status().isNoContent());
        Mockito.verify(osRepository).deleteById(1L);
    }


    @Test
    void deveRetornarErroAoExcluirOsInexistente() throws Exception {
        Mockito.when(osRepository.existsById(99L))
                .thenReturn(false);

        mockMvc.perform(delete("/os/99"))
                .andExpect(status().isNotFound());
    }
}
