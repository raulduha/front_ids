import React, { useState, useEffect } from 'react';
import './RecordPage.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function RecordPage() {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    shiftAssignment_id: '',
    product_id: '',
    amount: '',
    modified_by: null, // Agrega la propiedad modified_by
    modified_by_name: null, // Agrega la propiedad modified_by_name
  });

  const baseURL = 'http://localhost:8000/records/api/v1';
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }, []);

  const loadRecords = async () => {
    try {
      const response = await axios.get(`${baseURL}/productions/`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error al cargar registros:', error);
    }
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`${baseURL}/productions/${record.prod_id}`);
      console.log('Registro eliminado:', record.prod_id);
      loadRecords();
    } catch (error) {
      console.error('Error al eliminar registro:', error);
    }
  };

  const handleEdit = async (record) => {
    try {
      const response = await axios.put(
        `${baseURL}/productions/${record.prod_id}/`,
        record
      );
      console.log('Registro editado:', response.data);
      navigate(`/editar/${record.prod_id}`);
      loadRecords();
    } catch (error) {
      console.error('Error al editar registro:', error);
    }
  };

  const createRecord = async (e) => {
    e.preventDefault();
  
    // Verifica que el usuario esté autenticado
    if (user && user.id) {
      // Crea un nuevo registro con el ID de usuario
      const newRecordData = {
        shiftAssignment_id: newRecord.shiftAssignment_id,
        product_id: newRecord.product_id,
        amount: newRecord.amount,
        modified_by: user.id,
        modified_by_name: `${user.first_name} ${user.last_name}`,
      };
  
      try {
        const response = await axios.post(`${baseURL}/productions/`, newRecordData);
        console.log('Registro creado:', response.data);
        loadRecords();
        // Limpia los campos del formulario
        setNewRecord({
          shiftAssignment_id: '',
          product_id: '',
          amount: '',
          modified_by: null,
          modified_by_name: null,
        });
      } catch (error) {
        console.error('Error al crear registro:', error);
      }
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const userRole = user && user.role;
  const canEditAndDelete = userRole === 2 || userRole === 3 || userRole === 4;

  return (
    <div className="record-page">
      <h1>Mi Historial de Registros</h1>

      <h2>Crear un Registro</h2>
      <form onSubmit={createRecord}>
        <div className="form-group">
          <label>Shift Assignment ID:</label>
          <input
            type="text"
            value={newRecord.shiftAssignment_id}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                shiftAssignment_id: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Product ID:</label>
          <select
            value={newRecord.product_id}
            onChange={(e) =>
              setNewRecord({ ...newRecord, product_id: e.target.value })
            }
          >
            <option value="">Selecciona un producto</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {`${product.product_id} - ${product.brand}`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="text"
            value={newRecord.amount}
            onChange={(e) =>
              setNewRecord({ ...newRecord, amount: e.target.value })
            }
          />
        </div>
        <button type="submit">Crear Registro</button>
      </form>

      <ul className="record-list">
        {records.map((record) => (
          <li key={record.prod_id} className="record-item">
            <div className="record-info">
              <div className="record-field">
                <span className="record-label">Registro ID:</span>
                <span className="record-value">{record.prod_id}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Shift Assignment ID:</span>
                <span className="record-value">{record.shiftAssignment_id}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Product ID:</span>
                <span className="record-value">{record.product_id}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Product Brand:</span>
                <span className="record-value">
                  {products.find((product) => product.product_id === record.product_id)?.brand}
                </span>
              </div>
              <div className="record-field">
                <span className="record-label">Amount:</span>
                <span className="record-value">{record.amount}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Creado por:</span>
                <span className="record-value">
                  {record.modified_by}
                </span>
              </div>
              <div className="record-field">
                <span className="record-label">Created at:</span>
                <span className="record-value">{record.created_at}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Modified at:</span>
                <span className="record-value">{record.modified_at}</span>
              </div>
            </div>
            {canEditAndDelete && (
              <div className="record-actions">
                <button onClick={() => handleEdit(record)}>Editar</button>
                <button onClick={() => handleDelete(record)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordPage;

