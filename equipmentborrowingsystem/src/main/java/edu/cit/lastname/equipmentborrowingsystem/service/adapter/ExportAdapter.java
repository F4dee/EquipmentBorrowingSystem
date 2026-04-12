package edu.cit.lastname.equipmentborrowingsystem.service.adapter;

import java.util.List;
import java.util.Map;

/**
 * Common interface for data exports in the Structural Adapter Pattern.
 */
public interface ExportAdapter {
    byte[] export(List<Map<String, Object>> data) throws Exception;
    String getFileType();
}
