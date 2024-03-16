package com.omnia.scientia.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThreadRun {
    private String id;
    private String object;
    @JsonProperty("created_at")
    private long createdAt;
    @JsonProperty("assistant_id")
    private String assistantId;
    @JsonProperty("thread_id")
    private String threadId;
    private String status;
    @JsonProperty("started_at")
    private Long startedAt;
    @JsonProperty("expires_at")
    private long expiresAt;
    @JsonProperty("cancelled_at")
    private Long cancelledAt;
    @JsonProperty("failed_at")
    private Long failedAt;
    @JsonProperty("completed_at")
    private Long completedAt;
    @JsonProperty("last_error")
    private String lastError;
    private String model;
    private String instructions;
    private String[] tools;
    @JsonProperty("file_ids")
    private String[] fileIds;
    private Object metadata;
    private Object usage;
}
