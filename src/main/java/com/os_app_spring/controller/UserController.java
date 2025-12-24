package com.os_app_spring.controller;

import com.os_app_spring.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.os_app_spring.entity.User;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public User create(@RequestBody User user) {
        user.setId(null);
        user.setDataRegistro(java.time.LocalDateTime.now());
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> getById() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        existing.setNome(user.getNome());
        existing.setEmail(user.getEmail());
        existing.setAtivo(user.getAtivo());

        return userRepository.save(existing);
    }

}
