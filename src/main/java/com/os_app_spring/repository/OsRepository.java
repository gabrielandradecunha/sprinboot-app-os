package com.os_app_spring.repository;

import com.os_app_spring.entity.Os;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OsRepository extends JpaRepository<Os, Long>{
}
