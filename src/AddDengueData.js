import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const AddDengueData = () => {
  const [formData, setFormData] = useState({
    location: "",
    cases: "",
    deaths: "",
    date: "",
    regions: "",
  });

  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle CSV file selection
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "dengueData"), {
        ...formData,
        cases: Number(formData.cases),
        deaths: Number(formData.deaths),
      });
      alert("Data added successfully!");
      setFormData({ location: "", cases: "", deaths: "", date: "", regions: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Handle CSV upload
  const handleFileUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.split('\n').slice(1); // Remove header row
      const batchData = [];

      rows.forEach((row) => {
        const columns = row.split(',');
        if (columns.length >= 5) {
          batchData.push({
            location: columns[0].trim(),
            cases: Number(columns[1].trim()),
            deaths: Number(columns[2].trim()),
            date: columns[3].trim(),
            regions: columns[4].trim(),
          });
        }
      });

      try {
        for (let data of batchData) {
          await addDoc(collection(db, "dengueData"), data);
        }
        alert('CSV data uploaded successfully!');
      } catch (error) {
        console.error('Error uploading CSV data:', error);
        alert('Failed to upload CSV data. Please try again.');
      } finally {
        setLoading(false);
        setCsvFile(null);
      }
    };

    reader.readAsText(csvFile);
  };

  return (
    <div>
      <h2>Add New Dengue Data</h2>
      {/* Manual data entry form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Cases"
          value={formData.cases}
          onChange={(e) => setFormData({ ...formData, cases: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Deaths"
          value={formData.deaths}
          onChange={(e) => setFormData({ ...formData, deaths: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Regions"
          value={formData.regions}
          onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
          required
        />
        <button type="submit">Add Data</button>
      </form>

      <h3>OR</h3>

      {/* CSV upload section */}
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleFileUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>
    </div>
  );
};

export default AddDengueData;
