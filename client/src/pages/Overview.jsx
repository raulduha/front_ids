// Overview.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Make sure to install moment via npm or yarn
import './Overview.css';

const Overview = () => {
  const [products, setProducts] = useState([]);
  const [productionRecords, setProductionRecords] = useState([]);
  const [storageRecords, setStorageRecords] = useState([]);
  const [filter, setFilter] = useState('all'); // State to control the active filter

  const baseURL = 'http://24.144.85.42:8001/records/api/v1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, productionResponse, storageResponse] = await Promise.all([
          axios.get(`${baseURL}/products`),
          axios.get(`${baseURL}/productions`),
          axios.get(`${baseURL}/storage`),
        ]);

        setProducts(productsResponse.data);
        setProductionRecords(productionResponse.data);
        setStorageRecords(storageResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProductionRecords = (productID) => {
    const today = moment().startOf('day');
    return productionRecords
      .filter(record => record.product_id === productID)
      .filter(record => {
        const recordDate = moment(record.date_created);
        switch (filter) {
          case 'today':
            return recordDate.isSame(today, 'day');
          case 'week':
            return recordDate.isSame(today, 'week');
          case 'month':
            return recordDate.isSame(today, 'month');
          case 'all':
          default:
            return true;
        }
      });
  };

  const calculateTotal = (records) => {
    return records.reduce((acc, record) => acc + Number(record.amount), 0);
  };

  return (
    <div className="overview">
      <h1>Comparación de Productos</h1>
      <div className="filter-buttons">
        <button onClick={() => setFilter('today')}>Hoy</button>
        <button onClick={() => setFilter('week')}>Semana</button>
        <button onClick={() => setFilter('month')}>Mes</button>
        <button onClick={() => setFilter('all')}>Todos</button>
      </div>
      <table className="overview-table">
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Producción {filter === 'all' ? '' : `(${filter})`}</th>
            <th>Almacenamiento Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const totalProduction = calculateTotal(filteredProductionRecords(product.product_id));
            const totalStorage = calculateTotal(storageRecords.filter(record => record.product_id === product.product_id));

            return (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.brand} - {product.type} - {product.format}</td>
                <td>{totalProduction}</td>
                <td>{totalStorage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
