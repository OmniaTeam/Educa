package com.omnia.scientia.request;

import com.omnia.scientia.exceptions.NotFoundException;
import com.omnia.scientia.files.entity.FileRepository;
import com.omnia.scientia.groups.lecture.LectureEntity;
import com.omnia.scientia.groups.lecture.LectureRepository;
import com.omnia.scientia.groups.summary.SummaryEntity;
import com.omnia.scientia.groups.summary.SummaryRepository;
import com.omnia.scientia.request.services.RequesterGPTService;
import com.omnia.scientia.request.services.RequesterWhisperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestMaster {

    final private SummaryRepository summaryRepository;
    final private RequesterGPTService gptService;
    final private RequesterWhisperService whisperService;
    final private FileRepository fileRepository;
    final private LectureRepository lectureRepository;


//    public int addSummaryWithFile(Long fileId){
//        var response = fileRepository.findById(fileId);
//        if (response.isPresent()){
//            var summary = gptService.fileLecture(response.get().getPath());
//            if (summary != null && !summary.isEmpty()) {
//                summaryRepository.save(new SummaryEntity(response.get().getLectureId(),summary));
//                return 200;
//            }
//            return 403;
//        }
//        return 404;
//    }




    public int addSummaryWithText(Long lectureId) {
        log.info("summary");
        var lecture = lectureRepository.findById(lectureId);
        if (lecture.isPresent()){
            if (!lecture.get().getText().isEmpty()) {
                var summaryText = gptService.summaryTextLecture(lecture.get());
                if (!summaryText.isEmpty()) {
                    summaryRepository.save(new SummaryEntity(lectureId, summaryText));
                    lecture.get().setSummary(true);
                    lectureRepository.save(lecture.get());
                    return 200;
                }
                return 403;
            }
            return 403;
        }
        return 403;
    }

    public int generateTextWithAudio(Long fileId){
        log.info("whisper");
        var response = fileRepository.findById(fileId);

        if (response.isPresent()){
            response.get().setProcessed(true);
            fileRepository.save(response.get());
            var summary = whisperService.audioToText(response.get().getPath());
            if (!summary.isEmpty()) {
                var lecture = lectureRepository.findById(response.get().getLectureId());
                if (lecture.isPresent()) {
                    lecture.get().setText(summary);
                    lectureRepository.save(lecture.get());

                    return 200;
                }
                return 403;
            }
            return 403;
        }
        return 404;
    }

    public int generateTextWithFile(Long fileId){
        log.info("file to text");
        var response = fileRepository.findById(fileId);
        if (response.isPresent()){
            response.get().setProcessed(true);
            fileRepository.save(response.get());
            var summary = gptService.fileLecture(response.get().getPath());
            log.info("summary {}", summary);
            if (summary != null && !summary.isEmpty()) {
                var lecture = lectureRepository.findById(response.get().getLectureId());
                if (lecture.isPresent()) {
                    lecture.get().setText(summary);
                    lectureRepository.save(lecture.get());
                    return 200;
                }
                return 403;
            }
            return 403;
        }
        return 404;
    }

    public String questionLecture(Long lectureId, String question) {
        LectureEntity lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new NotFoundException("lecture"));
        log.info(lecture.getText());
        return gptService.summaryAnswerLecture(lecture, question);
    }

}





