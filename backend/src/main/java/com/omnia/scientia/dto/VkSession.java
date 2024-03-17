package com.omnia.scientia.dto;

import lombok.Data;

@Data
public class VkSession {
    private int auth;
    private String token;
    private int ttl;
    private String type;
    private String uuid;
    private String state;
}
