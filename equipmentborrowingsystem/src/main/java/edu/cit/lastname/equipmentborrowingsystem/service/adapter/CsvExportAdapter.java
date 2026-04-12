package edu.cit.lastname.equipmentborrowingsystem.service.adapter;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Concrete implementation of the Structural Adapter Design Pattern for CSV.
 * Adapts internal project data to a CSV formatted byte array.
 */
@Component
public class CsvExportAdapter implements ExportAdapter {

    @Override
    public byte[] export(List<Map<String, Object>> data) {
        if (data == null || data.isEmpty()) return new byte[0];

        StringBuilder csvContent = new StringBuilder();
        // Headers
        String headers = data.get(0).keySet().stream().collect(Collectors.joining(","));
        csvContent.append(headers).append("\n");

        // Rows
        for (Map<String, Object> row : data) {
            String line = row.values().stream()
                .map(Object::toString)
                .collect(Collectors.joining(","));
            csvContent.append(line).append("\n");
        }

        return csvContent.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public String getFileType() {
        return "csv";
    }
}
