import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';


const EditStorage = ({ storageId, onUpdate }) => {
  const [storageItem, setStorageItem] = useState(null);
  const { user } = useAuth();
  const baseURL = 'http://localhost:8000/records/api/v1';

  useEffect(() => {
    // Fetch the storage item when the component mounts
    const fetchStorageItem = async () => {
      try {
        const response = await axios.get(`${baseURL}/storage/${storageId}`);
        setStorageItem(response.data);
      } catch (error) {
        console.error('Error fetching storage item:', error);
      }
    };

    fetchStorageItem();
  }, [storageId]);

  const handleEdit = async () => {
    if (![2, 4].includes(user.role)) {
      toast.error('You do not have permission to edit storage items.');
      return;
    }

    try {
      await axios.put(`${baseURL}/storage/${storageId}`, storageItem);
      toast.success('Storage item updated successfully!');
      onUpdate(); // Call the parent update function to refresh the list
    } catch (error) {
      console.error('Error updating storage item:', error);
      toast.error('Failed to update storage item.');
    }
  };

  const handleDelete = async () => {
    if (![2, 4].includes(user.role)) {
      toast.error('You do not have permission to delete storage items.');
      return;
    }

    try {
      await axios.delete(`${baseURL}/storage/${storageId}`);
      toast.success('Storage item deleted successfully!');
      onUpdate(); // Call the parent update function to refresh the list
    } catch (error) {
      console.error('Error deleting storage item:', error);
      toast.error('Failed to delete storage item.');
    }
  };

  if (!storageItem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Form for editing storage item */}
      <input
        type="text"
        value={storageItem.product_id}
        onChange={(e) => setStorageItem({ ...storageItem, product_id: e.target.value })}
      />
      <input
        type="number"
        value={storageItem.quantity}
        onChange={(e) => setStorageItem({ ...storageItem, quantity: e.target.value })}
      />
      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditStorage;