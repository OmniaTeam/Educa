package com.omnia.scientia.files.services;

import com.omnia.scientia.files.entity.CSVregDTO;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

@Component
public class CSVComponent {

//    public List<CSVregDTO> parseCsv(String filePath) throws IOException {
//        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
//            CsvToBean<CSVregDTO> csvToBean = new CsvToBeanBuilder<CSVregDTO>(reader)
//                    .withType(CSVregDTO.class)
//                    .withIgnoreLeadingWhiteSpace(true)
//                    .withSeparator(',')
//                    .build();
//
//            return csvToBean.parse();
//        }
//    }

    public List<CSVregDTO> parseCsv(String filePath) {
        List<CSVregDTO> resultList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            HeaderColumnNameMappingStrategy<CSVregDTO> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(CSVregDTO.class);

            CsvToBean<CSVregDTO> csvToBean = new CsvToBeanBuilder<CSVregDTO>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreLeadingWhiteSpace(true)
                    .withSeparator(',')
                    .build();

            Iterator<CSVregDTO> csvIterator = csvToBean.iterator();

            while (csvIterator.hasNext()) {
                try {
                    CSVregDTO csvData = csvIterator.next();
                    resultList.add(csvData);
                } catch (Exception e) {
                    // Логирование ошибки или другая обработка, если требуется
                    System.out.println("Ошибка при обработке строки: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            // Обработка ошибок ввода-вывода при чтении файла
            System.out.println("Ошибка ввода-вывода: " + e.getMessage());
        }

        return resultList;
    }



}
