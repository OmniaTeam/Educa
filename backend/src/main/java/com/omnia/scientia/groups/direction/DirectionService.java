package com.omnia.scientia.groups.direction;

import com.omnia.scientia.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DirectionService {
    private final DirectionRepository directionRepository;
    public DirectionEntity getDirectionById(Long id) {
        return directionRepository.findById(id).orElseThrow(() -> new NotFoundException("Direction"));
    }
}
