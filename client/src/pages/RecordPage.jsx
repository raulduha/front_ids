import React, { useState, useEffect } from 'react';
import './RecordPage.css';
import axios from 'axios';

function RecordPage() {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ shiftAssignment_id: '', product_id: '', amount: '' });

  const baseURL = 'http://localhost:8000/records/api/v1'; // Reemplaza con tu URL base

  const loadRecords = async () => {
    try {
      const response = await axios.get(`${baseURL}/productions`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error al cargar registros:', error);
    }
  };

  const createRecord = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/productions`, newRecord);
      console.log('Registro creado:', response.data);
      loadRecords();
      setNewRecord({ shiftAssignment_id: '', product_id: '', amount: '' });
    } catch (error) {
      console.error('Error al crear registro:', error);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="record-page">
      <h1>Mi Historial de Registros</h1>
      <ul className="record-list">
        {records.map((record) => (
          <li key={record.prod_id}>Registro {record.prod_id}</li>
        ))}
      </ul>

      <h2>Crear un Registro</h2>
      <form onSubmit={createRecord}>
        <div className="form-group">
          <label>Shift Assignment ID:</label>
          <input
            type="text"
            value={newRecord.shiftAssignment_id}
            onChange={(e) => setNewRecord({ ...newRecord, shiftAssignment_id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={newRecord.product_id}
            onChange={(e) => setNewRecord({ ...newRecord, product_id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="text"
            value={newRecord.amount}
            onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
          />
        </div>
        <button type="submit">Crear Registro</button>
      </form>
    </div>
  );
}

export default RecordPage;
