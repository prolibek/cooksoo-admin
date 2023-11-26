import React, { useState } from "react";
import AuthService from "~/services/authService";
import { useDispatch } from "react-redux";

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

const SubmitButton = ({ label }) => (
  <button type="submit" style={styles.button}>
    {label}
  </button>
);

const LoginForm = ({ onSubmit, username, onUsernameChange, password, onPasswordChange }) => (
  <div style={styles.form}>
    <InputField label="Username" type="text" value={username} onChange={onUsernameChange} />
    <InputField label="Password" type="password" value={password} onChange={onPasswordChange} />
    <SubmitButton label="Login" onClick={handleSubmit}/>
  </div>
);

const LoginPage = () => {
  dispatch = useDispatch();

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
      const response = AuthService.login({
        "username": username,
        "password": password
      })
      const token = response.token;
      dispatch(login({
        token
      }))
    } catch(error) {
      setErrorMsg("Invalid credentials, try again.")
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
};

export default LoginPage;