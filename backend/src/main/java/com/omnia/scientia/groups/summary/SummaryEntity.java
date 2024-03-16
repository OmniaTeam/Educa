package com.omnia.scientia.groups.summary;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CollectionIdJdbcTypeCode;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Entity
@Data
@NoArgsConstructor
@Slf4j
public class SummaryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long lectureId;
    @Column(columnDefinition = "TEXT")
    private String text;

    public SummaryEntity(Long lectureId, String text) {
        this.lectureId = lectureId;
        this.text = text;
    }

    public SummaryEntity copy(SummaryEntity obj){
        this.id= obj.getId();
        this.lectureId= obj.getLectureId();
        this.text=obj.getText();

        return this;
    }

}
