import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import $api from '../http';

const DishEditPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishResponse = await $api.get(`/management/dishes/${id}/`);
        const categoryResponse = await $api.get("/management/dish_categories/");

        const dishData = dishResponse.data;
        setName(dishData.name);
        setDescription(dishData.description);
        setPrice(dishData.price);
        setSelectedCategory(dishData.category);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }
    formData.append('category', parseInt(selectedCategory, 10));

    try {
      await $api.patch(`/management/dishes/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/dishes");
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '5px',
      backgroundColor: 'white',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    textArea: {
      width: '100%',
      height: '100px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: 'white',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#4caf50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Dish</h2>
      <form onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textArea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Create Dish
        </button>
      </form>
    </div>
  );
}

export default DishEditPage;