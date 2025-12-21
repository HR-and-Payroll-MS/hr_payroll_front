// HREfficiencyForm.jsx
import React, { useEffect, useState } from "react";
import FormBuilder from "./FormBuilder";
import Header from "../Components/Header";
import useAuth from "../Context/AuthContext";

export default function HREfficiencyForm() {
  const { axiosPrivate } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/efficiency/templates/schema/`);
        const data = response.data;

        // Ensure required arrays exist even if backend returns null/undefined
        setFormData({
          title: data.title || "Employee Efficiency Format",
          performanceMetrics: data.performanceMetrics || [],
          feedbackSections: data.feedbackSections || [],
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load policy data. Using default template.");
        // Fallback to empty structure
        setFormData({
          title: "Employee Efficiency Format",
          performanceMetrics: [],
          feedbackSections: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [axiosPrivate]);

  const handleSave = async () => {
    try {
      // Send to backend (assuming this endpoint saves the schema)
      
      await axiosPrivate.put(`/efficiency/templates/schema-set/`, formData);
      alert("Form configuration saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Failed to save form configuration.";
      alert("Error: " + msg);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset to empty form? All changes will be lost.")) {
      setFormData({
        title: "Employee Efficiency Format",
        performanceMetrics: [],
        feedbackSections: [],
      });
    }
  };

  if (loading) {
    return (
      <div className="p-4 mx-auto h-full flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading form schema...</p>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div className="p-4 mx-auto h-full flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto h-full hover-bar overflow-y-auto">
      <Header Title={"HR: Efficiency Form Builder & Preview"} />

      <FormBuilder formData={formData} setFormData={setFormData} />

      <div className="mt-8 flex justify-start gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save Form Configuration
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Reset to Empty
        </button>
      </div>
    </div>
  );
}