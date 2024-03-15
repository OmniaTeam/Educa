package com.omnia.scientia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ListMessagesResponse {
    private String object;
    private List<ThreadMessage> data;
    private String first_id;
    private String last_id;
    private boolean has_more;

    @Data
    @AllArgsConstructor
    public static class ThreadMessage {
        private String id;
        private String object;
        private long created_at;
        private String thread_id;
        private String role;
        private List<Content> content;
        private List<String> file_ids;
        private String assistant_id;
        private String run_id;
        private Map<String, Object> metadata;


        @Data
        @AllArgsConstructor
        public static class Content {
            private String type;
            private Text text;


            @Data
            @AllArgsConstructor
            public static class Text {
                private String value;
                private List<String> annotations;

            }
        }
    }
}
