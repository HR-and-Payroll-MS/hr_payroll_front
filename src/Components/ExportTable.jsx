// ExportTable.jsx
import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun } from "docx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper: Flatten object (same as your flattenObject)
const flattenObject = (obj, parentKey = "", result = {}) => {
  if (obj === null || typeof obj !== "object") return result;
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const newKey = parentKey ? `${parentKey}_${key}` : key;
    const value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object" && v !== null) {
          flattenObject(v, `${newKey}_${i}`, result);
        } else {
          result[`${newKey}_${i}`] = v;
        }
      });
    } else if (typeof value === "object" && value !== null) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
};

// Helper: Format a row using bodyStructure + keys, skipping images
const formatRow = (flatRow, bodyStructure, keys) => {
  const row = [];
  bodyStructure.forEach((count, index) => {
    const keySet = keys[index];
    // Skip profile/pic if included
    const filteredKeys = keySet.filter(k => !k.toLowerCase().includes("pic"));
    const values = filteredKeys.map(k => flatRow[k] ?? "").join("\n"); // Concatenate with newline
    row.push(values);
  });
  return row;
};

export default function ExportTable({ data = [], title = [], bodyStructure = [], keys = [], fileName = "Report" }) {
  
  const flattenedData = data.map(d => flattenObject(d));
  const formattedData = flattenedData.map(row => formatRow(row, bodyStructure, keys));

  // PDF Export
  const exportPDF = () => {
  const doc = new jsPDF("p", "pt");
  doc.setFontSize(10);

  autoTable(doc, {
    head: [title],
    body: formattedData,
    styles: { fontSize: 9, cellPadding: 4 },
    theme: "grid",
    startY: 20,
    margin: { top: 20, left: 10, right: 10 },
  });

  doc.save(`${fileName}.pdf`);
};


  // Excel Export
  const exportExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([title, ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  // DOCX Export
  const exportDOCX = async () => {
    const tableRows = [
      new TableRow({
        children: title.map(t =>
          new TableCell({
            width: { size: 100 / title.length, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ text: t, bold: true })],
          })
        ),
      }),
      ...formattedData.map(row =>
        new TableRow({
          children: row.map(cell =>
            new TableCell({
              children: [new Paragraph({ text: cell })],
            })
          ),
        })
      ),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } })],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fileName}.docx`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportPDF}
        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Export PDF
      </button>
      <button
        onClick={exportExcel}
        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
      >
        Export Excel
      </button>
      <button
        onClick={exportDOCX}
        className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Export DOCX
      </button>
    </div>
  );
}
