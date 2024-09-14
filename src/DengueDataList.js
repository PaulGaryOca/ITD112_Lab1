import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// View all data, delete, update, and sort/filter functionality
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

  // Fetch data from Firestore
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

  // Handle deleting a record
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

  // Handle editing a record
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

  // Handle updating a record
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

  // Sorting function
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
    <div>
      <h2>Dengue Data List</h2>
      {editingId ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Cases"
            value={editForm.cases}
            onChange={(e) => setEditForm({ ...editForm, cases: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Deaths"
            value={editForm.deaths}
            onChange={(e) => setEditForm({ ...editForm, deaths: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={editForm.date}
            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Regions"
            value={editForm.regions}
            onChange={(e) => setEditForm({ ...editForm, regions: e.target.value })}
            required
          />
          <button type="submit">Update Data</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </form>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("location")}>
                  Location {sortField === "location" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("cases")}>
                  Cases {sortField === "cases" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("deaths")}>
                  Deaths {sortField === "deaths" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("date")}>
                  Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Regions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dengueData.map((data) => (
                <tr key={data.id}>
                  <td>{data.location}</td>
                  <td>{data.cases}</td>
                  <td>{data.deaths}</td>
                  <td>{data.date}</td>
                  <td>{data.regions}</td>
                  <td>
                    <button onClick={() => handleEdit(data)}>Edit</button>
                    <button onClick={() => handleDelete(data.id)}>Delete</button>
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
