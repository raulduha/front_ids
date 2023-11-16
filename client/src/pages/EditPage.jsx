import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditPage.css';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState({});
  const [editedRecord, setEditedRecord] = useState({
    shiftAssignment_id: '',
    product_id: '',
    amount: '',
    modified_at: '', // Agrega el campo modified_at
  });

  useEffect(() => {
    axios
      .get(`http://24.144.85.42:8001/records/api/v1/productions/${id}`)
      .then((response) => {
        const data = response.data;
        setRecord(data);
        setEditedRecord({ ...data, modified_at: new Date().toISOString() }); // Inicializa el formulario con los datos del registro y la fecha actual
      })
      .catch((error) => {
        console.error('Error al cargar detalles del registro:', error);
      });
  }, [id]);

  const handleEdit = async () => {
    try {
      // Actualiza el campo modified_at con la fecha y hora actual
      const editedData = { ...editedRecord, modified_at: new Date().toISOString() };
      
      await axios.put(`http://localhost:8000/records/api/v1/productions/${id}/`, editedData);
      console.log('Registro editado con éxito');
      navigate('/register');
    } catch (error) {
      console.error('Error al editar registro:', error);
    }
  };
  return (
    <div>
      <h1 style={{ color: 'white' }}>Editar Registro</h1>
      <form>
        <div className="form-group">
          <label style={{ color: 'white' }}>Shift Assignment ID:</label>
          <input
            type="text"
            value={editedRecord.shiftAssignment_id}
            onChange={(e) =>
              setEditedRecord({ ...editedRecord, shiftAssignment_id: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Product ID:</label>
          <input
            type="text"
            value={editedRecord.product_id}
            onChange={(e) =>
              setEditedRecord({ ...editedRecord, product_id: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Amount:</label>
          <input
            type="text"
            value={editedRecord.amount}
            onChange={(e) =>
              setEditedRecord({ ...editedRecord, amount: e.target.value })
            }
          />
        </div>
        <button type="button" onClick={handleEdit} style={{ color: 'white' }}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
  
}

export default EditPage;
