import React, { useEffect, useState } from 'react';
import $api from '../http'; 
import { useNavigate } from 'react-router-dom';

const UserCreatePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(2); 

    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await $api.post('management/users/', { username, password, first_name: firstName, last_name: lastName, role });
        navigate('/users')
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
  
    const styles = {
        container: {
          maxWidth: '600px',
          margin: '20px auto',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
          marginBottom: '15px',
        },
        input: {
          width: '100%',
          padding: '8px',
          margin: '5px 0',
          borderRadius: '4px',
          border: '1px solid #ddd',
        },
        button: {
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
        select: {
          width: '100%',
          padding: '8px',
          margin: '5px 0',
          borderRadius: '4px',
          border: '1px solid #ddd',
        },
      };
    
      return (
        <div style={styles.container}>
          <h2>Create User</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input style={styles.input} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            </div>
            <div style={styles.formGroup}>
              <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div style={styles.formGroup}>
              <input style={styles.input} type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
            </div>
            <div style={styles.formGroup}>
              <input style={styles.input} type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
            <div style={styles.formGroup}>
              <select style={styles.select} value={role} onChange={e => setRole(e.target.value)}>
                <option value={2}>Admin</option>
                <option value={3}>Courier</option>
              </select>
            </div>
            <button style={styles.button} type="submit">Create</button>
          </form>
        </div>
      );
};

export default UserCreatePage;
