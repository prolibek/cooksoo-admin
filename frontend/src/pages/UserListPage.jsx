import React, { useEffect, useState } from 'react';
import $api from '../http';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await $api.get('management/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const getRoleLabel = (role) => {
    switch (role) {
      case 2: return 'Admin';
      case 3: return 'Courier';
      default: return 'User';
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    createButton: {
        display: 'block',
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        margin: '20px auto',
        textDecoration: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
  };

  return (
    <div style={styles.container}>
      <h2>Users</h2>
      <Link to="create" style={styles.createButton}>Create New User</Link> {/* Add this line */}
      <ul style={styles.list}>
        {users.map(user => (
          <li key={user.id} style={styles.listItem}>
            {user.username} - {getRoleLabel(user.role)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
