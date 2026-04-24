package com.example.pinkylab.health;

import com.example.pinkylab.health.dto.HealthAnalysisRequestDto;
import com.example.pinkylab.health.dto.HealthAnalysisResponseDto;

public interface HealthService {
    HealthAnalysisResponseDto analyze(HealthAnalysisRequestDto request);
}
