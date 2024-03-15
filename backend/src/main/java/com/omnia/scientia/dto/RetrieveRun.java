package com.omnia.scientia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class RetrieveRun {
    private String id;
    private String object;
    private long created_at;
    private String assistant_id;
    private String thread_id;
    private String status;
    private long started_at;
    private Long expires_at;
    private Long cancelled_at;
    private Long failed_at;
    private long completed_at;
    private String last_error;
    private String model;
    private String instructions;
    private List<Tool> tools;
    private List<String> file_ids;
    private Map<String, Object> metadata;
    private Usage usage;

    @Data
    @AllArgsConstructor
    public static class Tool {
        private String type;
    }

    @Data
    @AllArgsConstructor
    public static class Usage {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;
    }
}


