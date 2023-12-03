import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import $api from '../http';

const EditDishCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await $api.get(`/management/dish_categories/${id}/`);
        const category = response.data;
        console.log(response);
        setName(category.name);
        setDescription(category.description);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await $api.put(`/management/dish_categories/${id}/`, {
        name,
        description,
      });
      navigate('/dish-categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '600px',
      margin: 'auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Edit Dish Category</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Update Category</button>
      </form>
    </div>
  );
};

export default EditDishCategory;