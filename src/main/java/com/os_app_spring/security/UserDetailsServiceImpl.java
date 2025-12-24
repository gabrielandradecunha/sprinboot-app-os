package com.os_app_spring.security;

import com.os_app_spring.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import com.os_app_spring.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository repository;

    public UserDetailsServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!Boolean.TRUE.equals(user.getAtivo())) {
            throw new RuntimeException("Usuário inativo");
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getSenhaHash())
                .authorities("USER")
                .build();

    }
}
