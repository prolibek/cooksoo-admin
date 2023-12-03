import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditBranchPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await $api.get(`/management/branches/${id}/`);
        const branch = response.data;
        setName(branch.name);
        setAddress(branch.address);
        setDescription(branch.description);
        setLat(branch.lat);
        setLon(branch.lon);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    fetchBranchData();
  }, [id]);

  const handleLocationSelect = (latlng) => {
    setLat(latlng.lat.toFixed(6));
    setLon(latlng.lng.toFixed(6));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = { lat: parseFloat(lat), lon: parseFloat(lon) };

    try {
      await $api.put(`/management/branches/${id}/`, { name, address, description, ...location });
      navigate('/branches');
    } catch (error) {
      console.error('Error updating branch:', error);
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
      <h2>Edit Branch</h2>
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
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Location:</label>
          {(lat && lon) &&
          <MapContainer center={[lat, lon]} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {(lat && lon) && <Marker position={[lat, lon]} />}
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </MapContainer>
          }
        </div>
        <button style={styles.submitButton} type="submit">Update Branch</button>
      </form>
    </div>
  );
};

export default EditBranchPage;
