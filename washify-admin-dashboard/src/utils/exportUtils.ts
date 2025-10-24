/**
 * Data Export Utilities for CSV and other formats
 */

interface ExportOptions {
  filename?: string;
  sheetName?: string;
}

/**
 * Convert data to CSV format
 */
export const exportToCSV = (data: any[], filename: string = 'export.csv'): void => {
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV header
  // eslint-disable-next-line no-useless-escape, prefer-regex-literals
  const csvHeaders = headers.map(header => 
    `"${header.replace(/"/g, '""')}"`
  ).join(',');

  // Create CSV rows
  const csvRows = data.map(row =>
    headers.map(header => {
      const value = row[header];
      // Handle different data types
      if (value === null || value === undefined) {
        return '""';
      }
      if (typeof value === 'object') {
        // eslint-disable-next-line no-useless-escape, prefer-regex-literals
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      // eslint-disable-next-line no-useless-escape, prefer-regex-literals
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',')
  );

  // Combine headers and rows
  const csv = [csvHeaders, ...csvRows].join('\n');

  // Add UTF-8 BOM for proper encoding in Excel
  const bom = '\uFEFF';
  const csvWithBom = bom + csv;

  // Create blob and download
  downloadFile(csvWithBom, filename, 'text/csv;charset=utf-8;');
};

/**
 * Convert data to JSON format
 */
export const exportToJSON = (data: any[], filename: string = 'export.json'): void => {
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  const json = JSON.stringify(data, null, 2);
  downloadFile(json, filename, 'application/json;charset=utf-8;');
};

/**
 * Export to HTML table format
 */
export const exportToHTML = (
  data: any[], 
  filename: string = 'export.html',
  title: string = 'Dữ liệu xuất khẩu'
): void => {
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  const headers = Object.keys(data[0]);

  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th { background-color: #3b82f6; color: white; padding: 10px; text-align: left; }
    td { border: 1px solid #ddd; padding: 10px; }
    tr:nth-child(even) { background-color: #f8f9fa; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>Xuất ngày: ${new Date().toLocaleString('vi-VN')}</p>
  <table>
    <thead>
      <tr>
        ${headers.map(h => `<th>${h}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${data.map(row => `
        <tr>
          ${headers.map(h => `<td>${formatCellValue(row[h])}</td>`).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
  `;

  downloadFile(html, filename, 'text/html;charset=utf-8;');
};

/**
 * Generic file download function
 */
export const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${mimeType},${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  element.remove();
};

/**
 * Format cell value for display
 */
const formatCellValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};

/**
 * Create Excel file (requires SheetJS library - optional enhancement)
 */
export const exportToExcel = (
  data: any[],
  filename: string = 'export.xlsx',
  sheetName: string = 'Sheet1'
): void => {
  // For now, fallback to CSV
  // In production, integrate with xlsx library
  console.warn('Excel export requires SheetJS library. Using CSV instead.');
  exportToCSV(data, filename.replace('.xlsx', '.csv'));
};

/**
 * Prepare data for export with optional field mapping
 */
export const prepareDataForExport = (
  data: any[],
  fieldMapping?: Record<string, string>
): any[] => {
  if (!data || data.length === 0) return [];

  if (!fieldMapping) return data;

  return data.map(row => {
    const newRow: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [oldKey, newKey] of Object.entries(fieldMapping)) {
      if (oldKey in row) {
        newRow[newKey] = row[oldKey];
      }
    }
    return newRow;
  });
};
