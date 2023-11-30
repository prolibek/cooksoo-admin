import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $api from '../http';

const DishPage = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await $api.get("/management/dishes/");
      console.log(response);
      setDishes(response.data);
    })();
  }, []);

  const handleDelete = async (dishId) => {
    try {
      await $api.delete(`/management/dishes/${dishId}/`);
      setDishes(dishes.filter(dish => dish.id !== dishId));
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };


  const styles = {
    container: {
      padding: '20px',
      maxWidth: '600px',
      margin: 'auto',
    },
    header: {
      textAlign: 'center',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    link: {
      display: 'block',
      textAlign: 'center',
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#4caf50',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
    },
    image: {
        width: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '4px',
        marginBottom: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dishes</h2>
      <ul style={styles.list}>
        {dishes.map(dish => (
          <li key={dish.id} style={styles.listItem}>
            {dish.image && <img src={dish.image} alt={dish.name} style={styles.image} />}
            <strong>{dish.name}</strong> - {dish.description}<br />
            Price: {dish.price} | Category: {dish.categoryName}
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(dish.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="create" style={styles.link}>Create New Dish</Link>
    </div>
  );
};

export default DishPage;
