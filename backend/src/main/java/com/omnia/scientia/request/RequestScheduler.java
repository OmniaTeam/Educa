package com.omnia.scientia.request;

import com.omnia.scientia.files.entity.FileEntity;
import com.omnia.scientia.files.entity.FileRepository;
import com.omnia.scientia.groups.lecture.LectureRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RequestScheduler {

    final private RequestMaster requestMaster;
    final private FileRepository fileRepository;
    final private LectureRepository lectureRepository;




//    final private ArrayList<String> audio = new ArrayList<>() {{
//        add("aba");
//    }};
//
//    final private ArrayList<String> files = new ArrayList<>() {{
//        add("boba");
//    }};


    public RequestScheduler(RequestMaster requestMaster, FileRepository fileRepository, LectureRepository lectureRepository) {
        this.requestMaster = requestMaster;
        this.fileRepository = fileRepository;
        this.lectureRepository = lectureRepository;
    }

    //Апостол Петр пропускает только туда кому куда назначено
    private int petr(FileEntity fileEntity){
        var type = fileEntity.getType().split("/")[0];

        switch (type) {
            case "audio" -> {
                return requestMaster.generateTextWithAudio(fileEntity.getId());
            }
            case "application" -> {
                return requestMaster.generateTextWithFile(fileEntity.getId());
            }
            default -> {
                return 404;
            }
        }
    }


    @Scheduled(fixedRate = 100000)
    public void FileScheduler(){
        var files = fileRepository.findAllByProcessedFalse();
        files.forEach(this::petr);
    }
    @Scheduled(fixedRate = 200000)
    public void TextScheduler(){
        var lectures = lectureRepository.findAllBySummaryFalseAndTextNotNull();

        lectures.forEach(lecture -> requestMaster.addSummaryWithText(lecture.getId()));

    }







}
