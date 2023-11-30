import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $api from '../http'; 

const PromocodeListPage = () => {
  const [promocodes, setPromocodes] = useState([]);

  useEffect(() => {
    fetchPromocodes();
  }, []);

  const fetchPromocodes = async () => {
    try {
      const response = await $api.get('/management/promocodes/');
      setPromocodes(response.data);
    } catch (error) {
      console.error('Error fetching promocodes:', error);
    }
  };

  const handleDelete = async (promocodeId) => {
    try {
      await $api.delete(`/management/promocodes/${promocodeId}`);
      setPromocodes(promocodes.filter(promocode => promocode.id !== promocodeId));
    } catch (error) {
      console.error('Error deleting promocode:', error);
    }
  };

  const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      },
      list: {
        listStyleType: 'none',
        padding: 0,
      },
      listItem: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
      },
      link: {
        display: 'inline-block',
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        margin: '20px 0',
        textDecoration: 'none',
        borderRadius: '4px',
      }
  };

  return (
    <div style={styles.container}>
      <h2>Promocodes</h2>
      <ul style={styles.list}>
        {promocodes.map(promocode => (
          <li key={promocode.id} style={styles.listItem}>
            Code: {promocode.code} - Value: {promocode.value}
            <button style={styles.deleteButton} onClick={() => handleDelete(promocode.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="create" style={styles.link}>Create New Promocode</Link>
    </div>
  );
};

export default PromocodeListPage;
