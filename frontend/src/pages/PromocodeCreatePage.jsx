import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../http'; 

const CreatePromocodePage = () => {
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await $api.post('/management/promocodes/', { code, value });
      navigate('/promocodes');
    } catch (error) {
      console.error('Error creating promocode:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    textArea: {
      width: '100%',
      height: '100px',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      resize: 'vertical',
    },
    submitButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Promocode</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Code:</label>
          <input style={styles.input} type="text" value={code} onChange={e => setCode(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Value:</label>
          <input style={styles.input} type="number" value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <button style={styles.submitButton} type="submit">Create Promocode</button>
      </form>
    </div>
  );
};

export default CreatePromocodePage;
