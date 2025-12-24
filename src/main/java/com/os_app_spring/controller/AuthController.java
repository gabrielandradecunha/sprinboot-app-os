package com.os_app_spring.controller;

import com.os_app_spring.dto.*;
import com.os_app_spring.entity.User;
import com.os_app_spring.repository.UserRepository;
import com.os_app_spring.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(UserRepository repository,
                          PasswordEncoder encoder,
                          JwtService jwtService) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(request.getEmail());
        user.setSenhaHash(encoder.encode(request.getSenha()));
        user.setAtivo(true);
        user.setDataRegistro(LocalDateTime.now());

        repository.save(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!encoder.matches(request.getSenha(), user.getSenhaHash())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.gerarToken(user.getEmail());
        return new LoginResponse(token);
    }
}
