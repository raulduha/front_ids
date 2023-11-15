import React, { useState, useEffect } from 'react';
import './StoragePage.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function StoragePage() {
  const [storageItems, setStorageItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [storage, setStorage] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [newStorageItem, setNewStorageItem] = useState({
    product_id: '',
    quantity: '',
    modified_by: null,
  });

  const baseURL = 'http://localhost:8000/records/api/v1';
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('All'); // Default filter is 'All'
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('All');

  useEffect(() => {
    const loadUsersAndProducts = async () => {
      try {
        const usersResponse = await axios.get(`${baseURL}/users`);
        setUsers(usersResponse.data);
        const productsResponse = await axios.get(`${baseURL}/products`);
        setProducts(productsResponse.data);
        const storageResponse = await axios.get(`${baseURL}/storage`);
        const sortedItems = storageResponse.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setStorage(sortedItems);
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

      // Sort by date
      filteredStorage.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

      setStorage(filteredStorage);
    } catch (error) {
      console.error('Error loading storage items:', error);
    }
  };

  useEffect(() => {
    loadStorageItems();
  }, [filter, startDate, endDate, selectedProduct]);

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
      newStorageList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  const handleDelete = async (storageId) => {
    // Ask for confirmation before deleting the item
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${baseURL}/storage/${storageId}`);
        toast.success('Item deleted successfully');
        setStorage(storage.filter(item => item.storage_id !== storageId)); // Make sure 'item.id' is the correct identifier
      } catch (error) {
        toast.error('Error deleting item');
        console.error('There was an error deleting the item:', error);
      }
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
        <button onClick={loadStorageItems}>Filter</button>
        <button onClick={() => { setStartDate(null); setEndDate(null); setFilter('All'); }}>
          Clear Filters
        </button>
      </div>

      <ul className="storage-list">
        {storage.map((item) => (
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
            {(user.role === 2 || user.role === 4) && 
              <>
                <button onClick={() => handleDelete(item.storage_id)}>Delete</button>
                <button onClick={() => navigate(`/edit-storage/${item.storage_id}`)}>Edit</button>
              </>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoragePage;
