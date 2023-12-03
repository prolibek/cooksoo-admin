import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $api from '../http'; 
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

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
      flexDirection: 'column',
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
    },
    editButton: {
      backgroundColor: '#ff9800', 
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      marginLeft: '10px', 
      textDecoration: 'none',
    },
    btns: {
      display: "flex",
      gap: "20px"
    }
  };

  return (
    <div style={styles.container}>
      <h2>Branches</h2>
      <ul style={styles.list}>
        {branches.map(branch => (
          <li key={branch.id} style={styles.listItem}>
            <div style={styles.btns}>
              {branch.name} - {branch.address}
              <Link to={`/branches/${branch.id}/edit`} style={styles.editButton}>
                Edit
              </Link>
              <button style={styles.deleteButton} onClick={() => handleDelete(branch.id)}>
                Delete
              </button>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Location:</label>
              <MapContainer center={[branch.lat ? branch.lat : 0, branch.lon ? branch.lon : 0]} zoom={13} style={{ height: '300px', width: '300px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {(branch.lat && branch.lon) && <Marker position={[branch.lat, branch.lon]} />}
                <LocationPicker/>
              </MapContainer>
            </div>
          </li>
        ))}
      </ul>
      <Link to="create" style={styles.link}>Create New Branch</Link>
    </div>
  );
};

export default BranchListPage;
