import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../http';

const CreateDishCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await $api.post("management/dish_categories/", {
        name,
        description
    })
    navigate('/dish-categories');
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
      <h2>Create Dish Category</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Create Category</button>
      </form>
    </div>
  );
};

export default CreateDishCategory;
