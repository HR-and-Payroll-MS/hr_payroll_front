// // ExportTable.jsx
// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from "docx";
// import { saveAs } from "file-saver";
// import useAuth from "../Context/AuthContext"; // assuming you have axiosPrivate here

// export default function ExportTable({
//   data = [],
//   url = null, // new prop: if provided, fetch from this URL
//   title = [],
//   bodyStructure = [],
//   keys = [],
//   fileName = "Report",
// }) {
//   const { axiosPrivate } = useAuth();
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Flatten nested objects (e.g., { user: { name: "John" } } → { "user.name": "John" })
//   const flattenObject = (obj, parent = "", res = {}) => {
//     for (let key in obj) {
//       const propName = parent ? `${parent}.${key}` : key;
//       if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
//         flattenObject(obj[key], propName, res);
//       } else {
//         res[propName] = obj[key];
//       }
//     }
//     return res;
//   };

//   // Format row based on bodyStructure and keys
//   const formatRow = (row, structure, keyList) => {
//     if (structure.length > 0) return structure.map((s) => row[s] ?? "");
//     if (keyList.length > 0) return keyList.map((k) => row[k] ?? "");
//     return Object.values(row);
//   };

//   // Fetch data if URL is provided
//   useEffect(() => {
//     if (url) {
//       const fetchData = async () => {
//         setLoading(true);
//         setError("");
//         try {
//           const response = await axiosPrivate.get(url);
//           const fetchedData = response.data?.results || response.data || [];
//           setTableData(fetchedData);
//         } catch (err) {
//           console.error("Failed to fetch data:", err);
//           setError("Failed to load data for export.");
//           setTableData([]);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     } else {
//       // Use provided data prop
//       setTableData(data);
//       setLoading(false);
//     }
//   }, [url, data, axiosPrivate]);

//   const flattenedData = tableData.map((d) => flattenObject(d));
//   const formattedData = flattenedData.map((row) => formatRow(row, bodyStructure, keys));

//   // PDF Export
//   const exportPDF = () => {
//     const doc = new jsPDF("p", "pt");
//     doc.setFontSize(12);
//     doc.text(fileName, 40, 30);

//     doc.autoTable({
//       head: [title],
//       body: formattedData,
//       startY: 50,
//       styles: { fontSize: 9, cellPadding: 6 },
//       headStyles: { fillColor: [59, 130, 246], textColor: 255 },
//       theme: "grid",
//       margin: { top: 50, left: 20, right: 20 },
//     });

//     doc.save(`${fileName}.pdf`);
//   };

//   // Excel Export
//   const exportExcel = () => {
//     const ws = XLSX.utils.aoa_to_sheet([title, ...formattedData]);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Report");
//     XLSX.writeFile(wb, `${fileName}.xlsx`);
//   };

//   // DOCX Export
//   const exportDOCX = async () => {
//     const tableRows = [
//       new TableRow({
//         children: title.map(
//           (t) =>
//             new TableCell({
//               children: [new Paragraph({ text: t, bold: true })],
//               width: { size: 100 / title.length, type: WidthType.PERCENTAGE },
//             })
//         ),
//       }),
//       ...formattedData.map((row) =>
//         new TableRow({
//           children: row.map(
//             (cell) =>
//               new TableCell({
//                 children: [new Paragraph({ text: String(cell ?? "") })],
//               })
//           ),
//         })
//       ),
//     ];

//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({ text: fileName, heading: "Heading1", alignment: "center" }),
//             new Paragraph({ text: "\n" }),
//             new Table({
//               rows: tableRows,
//               width: { size: 100, type: WidthType.PERCENTAGE },
//             }),
//           ],
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, `${fileName}.docx`);
//   };

//   // Loading / Error States
//   if (loading) {
//     return (
//       <div className="text-gray-600 flex items-center gap-2">
//         <div className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent"></div>
//         Loading data...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-600">{error}</div>;
//   }

//   if (tableData.length === 0) {
//     return <div className="text-gray-500">No data available to export.</div>;
//   }

//   return (
//     <div className="flex flex-wrap gap-3">
//       <button
//         onClick={exportPDF}
//         className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition shadow"
//       >
//         Export PDF
//       </button>
//       <button
//         onClick={exportExcel}
//         className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition shadow"
//       >
//         Export Excel
//       </button>
//       <button
//         onClick={exportDOCX}
//         className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
//       >
//         Export DOCX
//       </button>
//     </div>
//   );
// }








// ExportTable.jsx
import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun } from "docx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Icon from "./Icon";

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
        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
      >
        <Icon name={"File"}/>
      </button>
      <button
        onClick={exportExcel}
        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
      >
        <Icon name={"File"}/>
      </button>
      <button
        onClick={exportDOCX}
        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        <Icon name={"File"}/>
      </button>
    </div>
  );
}
