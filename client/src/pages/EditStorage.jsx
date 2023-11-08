import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditStorage.css';

const EditStorage = () => {
  const [storageItem, setStorageItem] = useState({
    product_id: '',
    amount: '',
    modified_at: '',
  });
  const { storageId } = useParams();
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000/records/api/v1';

  useEffect(() => {
    const fetchStorageItem = async () => {
      try {
        const response = await axios.get(`${baseURL}/storage/${storageId}`);
        setStorageItem(response.data);
      } catch (error) {
        console.error('Error fetching storage item:', error);
        toast.error('Error fetching storage item details.');
      }
    };

    if (storageId) {
      fetchStorageItem();
    }
  }, [storageId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStorageItem({ ...storageItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedData = { ...storageItem, modified_at: new Date().toISOString() };
    try {
      await axios.put(`${baseURL}/storage/${storageId}/`, editedData);
      toast.success('Storage item updated successfully!');
      navigate('/storage');
    } catch (error) {
      console.error('Error updating storage item:', error);
      toast.error('Error updating storage item.');
    }
  };

  return (
    <div className="edit-storage-container">
      <h2 className="edit-storage-title">Edit Storage Item</h2>
      <form className="edit-storage-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="product_id" className="form-label">Product ID</label>
          <input
            id="product_id"
            name="product_id"
            type="text"
            className="form-input"
            value={storageItem.product_id}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            id="amount"
            name="amount"
            type="number"
            className="form-input"
            value={storageItem.amount}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-btn">Update Storage Item</button>
      </form>
    </div>
  );
};

export default EditStorage;
