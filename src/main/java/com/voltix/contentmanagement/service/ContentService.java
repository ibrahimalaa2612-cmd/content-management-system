package com.voltix.contentmanagement.service;

import com.voltix.contentmanagement.entity.Content;
import com.voltix.contentmanagement.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    public Optional<Content> getContentById(Long id) {
        return contentRepository.findById(id);
    }

    public Content createContent(Content content) {
        return contentRepository.save(content);
    }

    public Optional<Content> updateContent(Long id, Content updatedContent) {
        return contentRepository.findById(id).map(content -> {
            content.setTitle(updatedContent.getTitle());
            content.setDescription(updatedContent.getDescription());

            return contentRepository.save(content);
        });
    }

    public boolean deleteContent(Long id) {
        if (!contentRepository.existsById(id)) {
            return false;
        }

        contentRepository.deleteById(id);
        return true;
    }
}