import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $api from '../http'; // Adjust this import based on your setup

const BranchListPage = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await $api.get('/management/branches/');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleDelete = async (branchId) => {
    try {
      await $api.delete(`/management/branches/${branchId}/`);
      setBranches(branches.filter(branch => branch.id !== branchId));
    } catch (error) {
      console.error('Error deleting branch:', error);
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
      <h2>Branches</h2>
      <ul style={styles.list}>
        {branches.map(branch => (
          <li key={branch.id} style={styles.listItem}>
            {branch.name} - {branch.address}
            <button style={styles.deleteButton} onClick={() => handleDelete(branch.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="create" style={styles.link}>Create New Branch</Link>
    </div>
  );
};

export default BranchListPage;
