import React, { useState, useEffect } from 'react';
import './RecordPage.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function RecordPage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('All'); // Default filter is 'All'
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('All');

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
  
      // Ordenar registros de más nuevo a más antiguo
      filteredRecords.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
      if (user && (user.role === 0 || user.role === 1)) {
        // Filter records to show only those created by the authenticated user
        filteredRecords = filteredRecords.filter((record) => record.modified_by === user.id);
      }
  
      // Filter by startDate and endDate
      if (startDate) {
        const startDateTime = new Date(startDate).getTime();
        filteredRecords = filteredRecords.filter((record) => {
          const recordDateTime = new Date(record.created_at).getTime();
          return recordDateTime >= startDateTime;
        });
      }
  
      if (endDate) {
        const endDateTime = new Date(endDate).getTime();
        filteredRecords = filteredRecords.filter((record) => {
          const recordDateTime = new Date(record.created_at).getTime();
          return recordDateTime <= endDateTime;
        });
      }
  
      // Filter by selected product
      if (selectedProduct !== 'All') {
        filteredRecords = filteredRecords.filter((record) => record.product_id.toString() === selectedProduct);
      }
  
      // Apply the "Today" and "Past" filters (these are mutually exclusive with date filters)
      if (!startDate && !endDate) {
        if (filter === 'Today') {
          const today = new Date().toLocaleDateString();
          filteredRecords = filteredRecords.filter((record) => {
            const createdAtDate = new Date(record.created_at);
            return createdAtDate.toLocaleDateString() === today;
          });
        } else if (filter === 'Past') {
          const today = new Date().toLocaleDateString();
          filteredRecords = filteredRecords.filter((record) => {
            const createdAtDate = new Date(record.created_at);
            return createdAtDate.toLocaleDateString() !== today;
          });
        }
      }
  
      setRecords(filteredRecords);
    } catch (error) {
      console.error('Error al cargar registros:', error);
    }
  };
  
  
  
  const handleFilterChange = (newFilter) => {
    // Update the filter state immediately
    setFilter(newFilter);
  };
  
  useEffect(() => {
    loadRecords();
  }, [filter, startDate, endDate, selectedProduct]);
  

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
    
    // Verifica que el usuario esté autenticado
    if (user && user.id) {
      const now = new Date();
      const formattedTimestamp = now.toLocaleString(); 
      // Crea un nuevo registro con el ID de usuario
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
        // Limpia los campos del formulario
        setNewRecord({
          shiftAssignment_id: '',
          product_id: '',
          amount: '',
          modified_by: null,
          modified_by_name: null,
        });
        toast.success('Registro creado con éxito!'); // Notificación de éxito
      } catch (error) {
        console.error('Error al crear registro:', error);
        toast.error('Error al crear registro.'); // Notificación de error
      }
    }
  };
  

  useEffect(() => {
    if (user) {
    loadRecords();
    }
  }, [user]);

  const userRole = user && user.role;
  const canEditAndDelete = userRole === 2 || userRole === 3 || userRole === 4;
  // Filter records to show only those belonging to the logged-in user
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
      {userRole === 0 || userRole === 1 ? (
        <div className="filter-buttons">
          <button onClick={() => handleFilterChange('All')}>Todos</button>
          <button onClick={() => handleFilterChange('Today')}>Hoy</button>
          <button onClick={() => handleFilterChange('Past')}>Pasados</button>
        </div>
      ) : null}
      {userRole === 2 || userRole === 3 || userRole === 4 ? (
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
      <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="All">Todos</option>
        {products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.brand}
          </option>
        ))}
      </select>
    </label>
    <button onClick={loadRecords}>Buscar</button>
    <button onClick={() => { setStartDate(null); setEndDate(null); setSelectedProduct('All'); }}>Limpiar filtros</button>
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
                <span className="record-label">Fecha de creacion:</span>
                <span className="record-value">{record.date_created}</span>
              </div>
              <div className="record-field">
                <span className="record-label">hora de creacion:</span>
                <span className="record-value">{record.time_created}</span>
              </div>
              
            </div>
            {canEditAndDelete && (
              <div className="record-actions">
                <button onClick={() => handleEdit(record)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(record)}>Eliminar</button>

              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordPage;

