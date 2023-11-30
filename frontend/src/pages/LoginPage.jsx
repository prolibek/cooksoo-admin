import React, { useState } from "react";

import AuthService from "~/services/authService";
import { login } from "~/features/auth/authSlice"

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const InputField = ({ label, type, value, onChange }) => (
  <label style={styles.label}>
    {label}:
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={styles.input}
    />
  </label>
);

const SubmitButton = ({ label, onClick }) => (
  <button type="submit" style={styles.button} onClick={onClick}>
    {label}
  </button>
);

const LoginForm = ({ onSubmit, username, onUsernameChange, password, onPasswordChange, errorMsg }) => (
  <div style={styles.form}>
    <InputField label="Username" type="text" value={username} onChange={onUsernameChange} />
    <InputField label="Password" type="password" value={password} onChange={onPasswordChange} />
    <SubmitButton label="Login" onClick={onSubmit} />
    {errorMsg && <div style={styles.error}>{errorMsg}</div>}
  </div>
);


const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(username.trim() === "" || password.trim() === "") {
      setErrorMsg("Username and password fields are required.")
    }

    try {
      const response = await AuthService.login({
        "username": username,
        "password": password
      })
      console.log(response);
      const auth_token = response.auth_token;
      dispatch(login({
        auth_token
      }))
      navigate("/");
    } catch(error) {
      setErrorMsg("Invalid credentials, try again.")
      console.log(error)
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div style={styles.container}>
      <LoginForm
        onSubmit={handleSubmit}
        username={username}
        onUsernameChange={handleUsernameChange}
        password={password}
        onPasswordChange={handlePasswordChange}
        errorMsg={errorMsg} // Pass the errorMsg state
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f4f4f4",
  },
  label: {
    display: "block",
    margin: "10px 0",
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
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
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default LoginPage;