package com.omnia.scientia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileUploadResponse {
    private String id;
    private String object;
    private int bytes;
    private long created_at;
    private String filename;
    private String purpose;
}
