import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $api from '../http';

const DishCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
        const response = await $api.get("/management/dish_categories/")
        console.log(response)
        setCategories(response.data)
    })()
    }, []);

    const handleDelete = async (categoryId) => {
      try {
        await $api.delete(`/management/dish_categories/${categoryId}/`);
        setCategories(categories.filter(category => category.id !== categoryId));
      } catch (error) {
        console.error('Error deleting category:', error);
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
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dish Categories</h2>
      <ul style={styles.list}>
        {categories.map(category => (
          <li key={category.id} style={styles.listItem}>
            {category.name} - {category.description}
            <Link to={`/dish-categories/${category.id}/edit`} style={styles.editButton}>
              Edit
            </Link>
            <button
              onClick={() => handleDelete(category.id)}
              style={ styles.deleteButton }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="create" style={styles.link}>Create New Category</Link>
    </div>
  );
};

export default DishCategories;
