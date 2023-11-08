import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Overview.css';

const Overview = () => {
  const [products, setProducts] = useState([]);
  const [productionRecords, setProductionRecords] = useState([]);
  const [storageRecords, setStorageRecords] = useState([]);

  const baseURL = 'http://localhost:8000/records/api/v1';

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
        // Handle error for each request if needed
        console.error('Error fetching data:', error);
        // Optionally set state to show error messages in the UI
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overview">
      <h1>Comparación de Productos</h1>
      <table className="overview-table">
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Producción Total</th>
            <th>Almacenamiento Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const totalProduction = productionRecords
              .filter(record => record.product_id === product.product_id)
              .reduce((acc, record) => acc + Number(record.amount), 0);

            const totalStorage = storageRecords
              .filter(record => record.product_id === product.product_id)
              .reduce((acc, record) => acc + Number(record.amount), 0);

            return (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
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
