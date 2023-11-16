import React, { useState, useEffect } from 'react';
import './StoragePage.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function StoragePage() {
  const [products, setProducts] = useState([]);
  const [storage, setStorage] = useState([]);
  const [users, setUsers] = useState([]);
  const [newStorageItem, setNewStorageItem] = useState({
    product_id: '',
    quantity: '',
    modified_by: null,
  });

  const baseURL = 'http://24.144.85.42:8001/records/api/v1';
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order is descending

  useEffect(() => {
    const loadUsersAndProducts = async () => {
      try {
        const usersResponse = await axios.get(`${baseURL}/users`);
        setUsers(usersResponse.data);
        const productsResponse = await axios.get(`${baseURL}/products`);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadUsersAndProducts();
  }, []);

  const loadStorageItems = async () => {
    try {
      let response = await axios.get(`${baseURL}/storage`);
      let filteredStorage = response.data;

      // Filter by startDate and endDate
      if (startDate) {
        const startDateTime = new Date(startDate).getTime();
        filteredStorage = filteredStorage.filter((item) => {
          const itemDateTime = new Date(item.created_at).getTime();
          return itemDateTime >= startDateTime;
        });
      }

      if (endDate) {
        const endDateTime = new Date(endDate).getTime();
        filteredStorage = filteredStorage.filter((item) => {
          const itemDateTime = new Date(item.created_at).getTime();
          return itemDateTime <= endDateTime;
        });
      }

      // Apply the "Today" and "Past" filters (mutually exclusive with date filters)
      if (!startDate && !endDate) {
        const todayStart = new Date().setHours(0, 0, 0, 0);
        if (filter === 'Today') {
          filteredStorage = filteredStorage.filter((item) => {
            const itemDateTime = new Date(item.created_at).getTime();
            return itemDateTime >= todayStart;
          });
        } else if (filter === 'Past') {
          filteredStorage = filteredStorage.filter((item) => {
            const itemDateTime = new Date(item.created_at).getTime();
            return itemDateTime < todayStart;
          });
        }
      }

      // Filtrar por producto
      if (selectedProduct !== 'All') {
        filteredStorage = filteredStorage.filter((item) => item.product_id.toString() === selectedProduct);
      }

      // Ordenar según sortOrder
      filteredStorage.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

      setStorage(filteredStorage);
    } catch (error) {
      console.error('Error loading storage items:', error);
    }
  };
  useEffect(() => {
    if (user) {
      // Set startDate to today's date by default
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
  
      loadStorageItems();
    }
  }, [user]);
  useEffect(() => {
    if (startDate || endDate || filter !== 'All' || selectedProduct !== 'All') {
      loadStorageItems();
    } else {
      setStorage([]); // No filters applied, so initially don't show any storage items
    }
  }, [filter, startDate, endDate, selectedProduct, sortOrder]);

  const handleCreateStorageItem = async (e) => {
    e.preventDefault();

    const storageData = {
      product_id: newStorageItem.product_id,
      amount: newStorageItem.quantity,
      storage_user_id: user.id,
      modified_by: null,
    };

    try {
      const response = await axios.post(`${baseURL}/storage/`, storageData);
      toast.success('Storage item created successfully!');

      // Create a new array, add the new item, and sort it
      const newStorageList = [...storage, response.data];
      newStorageList.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      setStorage(newStorageList); // Update the storage state with the new sorted array

      setNewStorageItem({
        product_id: '',
        quantity: '',
        modified_by: null,
      });
    } catch (error) {
      console.error('Error creating storage item:', error);
      toast.error('Failed to create storage item.');
    }
  };

  return (
    <div className="storage-page">
      <h1>Storage Management</h1>
      <form onSubmit={handleCreateStorageItem}>
        <div className="form-group">
          <label htmlFor="product_id">Product ID:</label>
          <select
            id="product_id"
            type="text"
            value={newStorageItem.product_id}
            onChange={(e) =>
              setNewStorageItem({ ...newStorageItem, product_id: e.target.value })
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
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={newStorageItem.quantity}
            onChange={(e) =>
              setNewStorageItem({ ...newStorageItem, quantity: e.target.value })
            }
          />
        </div>
        <button type="submit">Add to Storage</button>
      </form>

      <div className="filter-section">
        <label>
          fecha inicio:
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          fecha termino:
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
        <button onClick={loadStorageItems}>Buscar</button>
        <button onClick={() => { setStartDate(null); setEndDate(null); setFilter('All'); }}>
          Limpiar Fechas
        </button>
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
      </div>

      <ul className="storage-list">
        {storage.length > 0 ? (
          storage.map((item) => (
            <li key={item.id} className="storage-item">
              <div className="storage-field">
                <span className="storage-label">Producto:</span>
                <span className="storage-value">
                  {products.find((product) => product.product_id === item.product_id)?.brand}
                </span>
              </div>
              <div className="storage-field">
                <span className="storage-label">Tipo:</span>
                <span className="storage-value">
                  {products.find((product) => product.product_id === item.product_id)?.type}
                </span>
              </div>
              <div className="storage-field">
                <span className="storage-label">Formato:</span>
                <span className="storage-value">
                  {products.find((product) => product.product_id === item.product_id)?.format}
                </span>
              </div>
              <div className="storage-field">
                <span className="storage-label">Monto:</span>
                <span className="storage-value">{item.amount}</span>
              </div>
              {(user.role === 2 || user.role === 4) && (
                <>
                  <button onClick={() => handleDelete(item.storage_id)}>Delete</button>
                  <button onClick={() => navigate(`/edit-storage/${item.storage_id}`)}>Edit</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No hay elementos de almacenamiento que coincidan con los filtros seleccionados.</p>
        )}
      </ul>
    </div>
  );
}

export default StoragePage;
