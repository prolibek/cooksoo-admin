import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthService from '~/services/authService';
import { logout } from '~/features/auth/authSlice';

import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await AuthService.logout();
      dispatch(logout());
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Admin Dashboard</h1>
        {
          authState.isAuthenticated ? 
          <button onClick={handleLogout} style={styles.button}>Logout</button>
          :
          <button onClick={() => navigate("login")} style={styles.button}>Login</button>
        }
      </header>
      <nav style={styles.nav}>
        <ul>
          <li><Link to="/dish-categories" style={styles.link}>Dish Categories</Link></li>
          <li><Link to="/dishes" style={styles.link}>Dishes</Link></li>
          <li><Link to="/orders" style={styles.link}>Orders</Link></li>
          <li><Link to="/promocodes" style={styles.link}>Promo Codes</Link></li>
          <li><Link to="/branches" style={styles.link}>Branches</Link></li>
          <li><Link to="/users" style={styles.link}>Users</Link></li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    nav: {
      width: "300px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#fff",
    },
    link: {
      display: "block",
      margin: "10px 0",
      textDecoration: "none",
      color: "#333",
    },
    header: {
      marginBottom: "40px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
};  

export default AdminHomePage;
