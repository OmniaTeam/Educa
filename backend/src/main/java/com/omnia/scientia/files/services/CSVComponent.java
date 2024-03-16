package com.omnia.scientia.files.services;

import com.omnia.scientia.files.entity.CSVregDTO;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

@Component
public class CSVComponent {

    public List<CSVregDTO> parseCsv(String filePath) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            CsvToBean<CSVregDTO> csvToBean = new CsvToBeanBuilder<CSVregDTO>(reader)
                    .withType(CSVregDTO.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .withSeparator(',')
                    .build();

            return csvToBean.parse();
        }
    }
}
