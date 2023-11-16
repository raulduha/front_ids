import React, { useState, useEffect } from 'react';
import './RecordPage.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RecordPage() {
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order is descending
  const getFullDateTime = (record) => `${record.date_created}T${record.time_created}`;
  const [newRecord, setNewRecord] = useState({
    shiftAssignment_id: '',
    product_id: '',
    amount: '',
    modified_by: null,
    modified_by_name: null,
  });

  const baseURL = 'http://24.144.85.42:8001/records/api/v1';
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/users/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar usuarios:', error);
      });
  }, []);

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
      let response = await axios.get(`${baseURL}/productions/`);
      let filteredRecords = response.data;

      filteredRecords.sort((a, b) => {
        const dateTimeA = `${a.date_created}T${a.time_created}`;
        const dateTimeB = `${b.date_created}T${b.time_created}`;
        const dateA = new Date(dateTimeA);
        const dateB = new Date(dateTimeB);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

      if (startDate) {
        const startDateTime = new Date(startDate).getTime();
        filteredRecords = filteredRecords.filter((record) => {
          const recordDateTime = new Date(getFullDateTime(record)).getTime();
          return recordDateTime >= startDateTime;
        });
      }

      if (endDate) {
        const endDateTime = new Date(endDate).getTime();
        filteredRecords = filteredRecords.filter((record) => {
          const recordDateTime = new Date(getFullDateTime(record)).getTime();
          return recordDateTime <= endDateTime;
        });
      }

      if (selectedProduct !== 'All') {
        filteredRecords = filteredRecords.filter((record) => record.product_id.toString() === selectedProduct);
      }

      setRecords(filteredRecords);
    } catch (error) {
      console.error('Error al cargar registros:', error);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [startDate, endDate, selectedProduct, sortOrder]);

  const handleDelete = async (record) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`${baseURL}/productions/${record.prod_id}`);
      console.log('Registro eliminado:', record.prod_id);
      loadRecords();
      toast.success('Registro eliminado con éxito!');
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      toast.error('Error al eliminar el registro.');
    }
  };

  const handleEdit = async (record) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas editar este registro?");
    if (!isConfirmed) return;

    try {
      const response = await axios.put(
        `${baseURL}/productions/${record.prod_id}/`,
        record
      );
      console.log('Registro editado:', response.data);
      navigate(`/editar/${record.prod_id}`);
      loadRecords();
      toast.success('Registro editado con éxito!');
    } catch (error) {
      console.error('Error al editar registro:', error);
      toast.error('Error al editar registro.');
    }
  };

  const createRecord = async (e) => {
    e.preventDefault();

    if (user && user.id) {
      const now = new Date();
      const formattedTimestamp = now.toLocaleString();
      const newRecordData = {
        shiftAssignment_id: newRecord.shiftAssignment_id,
        product_id: newRecord.product_id,
        amount: newRecord.amount,
        modified_by: user.id,
        modified_by_name: `${user.first_name} ${user.last_name}`,
        created_at: formattedTimestamp,
        modified_at: formattedTimestamp,
      };

      try {
        const response = await axios.post(`${baseURL}/productions/`, newRecordData);
        console.log('Registro creado:', response.data);
        loadRecords();
        setNewRecord({
          shiftAssignment_id: '',
          product_id: '',
          amount: '',
          modified_by: null,
          modified_by_name: null,
        });
        toast.success('Registro creado con éxito!');
      } catch (error) {
        console.error('Error al crear registro:', error);
        toast.error('Error al crear registro.');
      }
    }
  };

  useEffect(() => {
    if (user) {
      // Set startDate to today's date by default
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
  
      loadRecords();
    }
  }, [user]);

  const userRole = user && user.role;
  const canEditAndDelete = userRole === 2 || userRole === 3 || userRole === 4;
  const filteredRecords = records.filter(
    (record) => record.modified_by_name === `${user.first_name} ${user.last_name}`
  );

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

      {userRole === 2 || userRole === 3 || userRole === 4 || userRole === 0? (
        <div className="filter-section">
          <label>
            Fecha inicio:
            <input
              type="date"
              value={startDate || ''}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Fecha término:
            <input
              type="date"
              value={endDate || ''}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <label>
            Producto:
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="All">Todos</option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                  {product.brand}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ordenar:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Más nuevos primero</option>
              <option value="asc">Más antiguos primero</option>
            </select>
          </label>
          <button onClick={loadRecords}>Buscar</button>
          <button
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              setSelectedProduct('All');
              setSortOrder('desc');
              loadRecords(); // Agregado para limpiar los registros al presionar "Limpiar filtros"
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : null}

      <ul className="record-list">
        {records.map((record) => (
          <li key={record.prod_id} className="record-item">
            <div className="record-info">
              <div className="record-field">
                <span className="record-label">Marca de producto:</span>
                <span className="record-value">
                  {products.find((product) => product.product_id === record.product_id)?.brand}
                </span>
              </div>
              <div className="record-field">
                <span className="record-label">Monto:</span>
                <span className="record-value">{record.amount}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Creado por:</span>
                <span className="record-value">
                  {users.find((user) => user.id === record.modified_by)?.email}
                </span>
              </div>
              <div className="record-field">
                <span className="record-label">Fecha de creación:</span>
                <span className="record-value">{record.date_created}</span>
              </div>
              <div className="record-field">
                <span className="record-label">Hora de creación:</span>
                <span className="record-value">{record.time_created}</span>
              </div>
            </div>
            {canEditAndDelete && (
              <div className="record-actions">
                <button onClick={() => handleEdit(record)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(record)}>
                  Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordPage;

