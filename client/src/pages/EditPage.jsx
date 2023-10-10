// EditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el parámetro de la URL
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function EditPage() {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL
  const navigate = useNavigate()
  const [record, setRecord] = useState({});
  const [editedRecord, setEditedRecord] = useState({
    shiftAssignment_id: '',
    product_id: '',
    amount: '',
  });

  useEffect(() => {
    // Realiza una solicitud para obtener los detalles del registro que se va a editar
    axios.get(`http://localhost:8000/records/api/v1/productions/${id}`)
      .then((response) => {
        setRecord(response.data);
        setEditedRecord(response.data); // Inicializa el formulario con los datos del registro
      })
      .catch((error) => {
        console.error('Error al cargar detalles del registro:', error);
      });
  }, [id]);

  const handleEdit = async () => {
    try {
      // Realiza una solicitud PUT para actualizar el registro
      await axios.put(`http://localhost:8000/records/api/v1/productions/${id}/`, editedRecord);
      console.log('Registro editado con éxito');
      navigate('/register')
      // Redirecciona a la página de detalles o a donde desees después de la edición
    } catch (error) {
      console.error('Error al editar registro:', error);
    }
  };

  return (
    <div>
      <h1>Editar Registro</h1>
      <form>
        <div className="form-group">
          <label>Shift Assignment ID:</label>
          <input
            type="text"
            value={editedRecord.shiftAssignment_id}
            onChange={(e) =>
              setEditedRecord({ ...editedRecord, shiftAssignment_id: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={editedRecord.product_id}
            onChange={(e) =>
              setEditedRecord({ ...editedRecord, product_id: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="text"
            value={editedRecord.amount}
            onChange={(e) =>
              setEditedRecord({ ...editedRecord, amount: e.target.value })
            }
          />
        </div>
        <button type="button" onClick={handleEdit}>Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditPage;
