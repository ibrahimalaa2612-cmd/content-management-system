package com.voltix.contentmanagement.repository;

import com.voltix.contentmanagement.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}