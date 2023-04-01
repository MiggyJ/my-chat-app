import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const LoginForm = ({ setForm }) => {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password })
  };

  return (
    <Paper style={{ padding: 16, width: '35vw' }}>
      <Button
        size="small"
        color="secondary"
        onClick={() => setForm('register')}
      >
        Register
      </Button>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;