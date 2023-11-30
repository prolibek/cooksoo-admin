import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../http'; 

const CreateBranchPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await $api.post('/management/branches/', { name, address, description });
      navigate('/branches');
    } catch (error) {
      console.error('Error creating branch:', error);
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
      <h2>Create New Branch</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input style={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address:</label>
          <input style={styles.input} type="text" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea style={styles.textArea} value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button style={styles.submitButton} type="submit">Create Branch</button>
      </form>
    </div>
  );
};

export default CreateBranchPage;
