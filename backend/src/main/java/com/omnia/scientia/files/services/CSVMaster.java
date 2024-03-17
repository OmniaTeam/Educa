package com.omnia.scientia.files.services;

import com.omnia.scientia.files.entity.CSVregDTO;
import com.omnia.scientia.files.entity.FileEntity;
import com.omnia.scientia.files.entity.FileRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
public class CSVMaster {

    final private CSVComponent csvComponent;
    final private FileRepository fileRepository;


    public CSVMaster(CSVComponent csvComponent, FileRepository fileRepository) {
        this.csvComponent = csvComponent;
        this.fileRepository = fileRepository;
    }

    public List<CSVregDTO> read(FileEntity file){

            if (Objects.equals(file.getType(), "text/csv")){
                return csvComponent.parseCsv(file.getPath());
            }
            return null;


    }


}
