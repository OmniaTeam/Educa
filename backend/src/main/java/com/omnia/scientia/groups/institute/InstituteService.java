package com.omnia.scientia.groups.institute;

import com.omnia.scientia.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InstituteService {
    private final InstituteRepository instituteRepository;

    public InstituteEntity getInstituteById(Long id) {
        return instituteRepository.findById(id).orElseThrow(() -> new NotFoundException("Institute"));
    }
}
