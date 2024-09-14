import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const containerStyles = {
  backgroundColor: '#f4f4f4', 
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '1000px',
  margin: '200px auto 20px', //pinaka important ni dont edit this 
    position: 'relative',
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '20px',
};

const inputStyles = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px',
};

const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
  margin: '5px',
};

const updateButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#00215E',
  color: '#fff',
};

const cancelButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#6c757d',
  color: '#fff',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyles = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
};

const tdStyles = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const actionButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#dc3545',
  color: '#fff',
};

const DengueDataList = () => {
  const [dengueData, setDengueData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    location: "",
    cases: "",
    deaths: "",
    date: "",
    regions: "",
  });
  
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, "dengueData");
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDengueData(dataList);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const dengueDocRef = doc(db, "dengueData", id);
    try {
      await deleteDoc(dengueDocRef);
      setDengueData(dengueData.filter((data) => data.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };


  const handleEdit = (data) => {
    setEditingId(data.id);
    setEditForm({
      location: data.location,
      cases: data.cases,
      deaths: data.deaths,
      date: data.date,
      regions: data.regions,
    });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    const dengueDocRef = doc(db, "dengueData", editingId);
    try {
      await updateDoc(dengueDocRef, {
        location: editForm.location,
        cases: Number(editForm.cases),
        deaths: Number(editForm.deaths),
        date: editForm.date,
        regions: editForm.regions,
      });
      setDengueData(
        dengueData.map((data) =>
          data.id === editingId ? { id: editingId, ...editForm } : data
        )
      );
      setEditingId(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedData = [...dengueData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setDengueData(sortedData);
  };

  return (
    <div style={containerStyles}>
      <h2>Dengue Data List</h2>
      {editingId ? (
        <form onSubmit={handleUpdate} style={formStyles}>
          <input
            type="text"
            placeholder="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="number"
            placeholder="Cases"
            value={editForm.cases}
            onChange={(e) => setEditForm({ ...editForm, cases: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="number"
            placeholder="Deaths"
            value={editForm.deaths}
            onChange={(e) => setEditForm({ ...editForm, deaths: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="date"
            placeholder="Date"
            value={editForm.date}
            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Regions"
            value={editForm.regions}
            onChange={(e) => setEditForm({ ...editForm, regions: e.target.value })}
            required
            style={inputStyles}
          />
          <button type="submit" style={updateButtonStyles}>Update Data</button>
          <button onClick={() => setEditingId(null)} style={cancelButtonStyles}>Cancel</button>
        </form>
      ) : (
        <>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles} onClick={() => handleSort("location")}>
                  Location {sortField === "location" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th style={thStyles} onClick={() => handleSort("cases")}>
                  Cases {sortField === "cases" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th style={thStyles} onClick={() => handleSort("deaths")}>
                  Deaths {sortField === "deaths" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th style={thStyles} onClick={() => handleSort("date")}>
                  Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th style={thStyles}>Regions</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dengueData.map((data) => (
                <tr key={data.id}>
                  <td style={tdStyles}>{data.location}</td>
                  <td style={tdStyles}>{data.cases}</td>
                  <td style={tdStyles}>{data.deaths}</td>
                  <td style={tdStyles}>{data.date}</td>
                  <td style={tdStyles}>{data.regions}</td>
                  <td style={tdStyles}>
                    <button onClick={() => handleEdit(data)} style={updateButtonStyles}>Edit</button>
                    <button onClick={() => handleDelete(data.id)} style={actionButtonStyles}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DengueDataList;
