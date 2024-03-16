package com.omnia.scientia.request;

import com.omnia.scientia.files.entity.FileRepository;
import com.omnia.scientia.groups.lecture.LectureRepository;
import com.omnia.scientia.groups.summary.SummaryEntity;
import com.omnia.scientia.groups.summary.SummaryRepository;
import com.omnia.scientia.request.services.RequesterGPTService;
import com.omnia.scientia.request.services.RequesterWhisperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
        var lecture = lectureRepository.findById(lectureId);
        if (lecture.isPresent()){
            var summaryText = gptService.summaryTextLecture(lecture.get().getText());
            if (!summaryText.isEmpty()){
                summaryRepository.save(new SummaryEntity(lectureId, summaryText));
                return 200;
            }
            return 403;
        }
        return 403;
    }

    public int generateTextWithAudio(Long fileId){
        var response = fileRepository.findById(fileId);

        if (response.isPresent()){
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
        var response = fileRepository.findById(fileId);
        if (response.isPresent()){
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



}





