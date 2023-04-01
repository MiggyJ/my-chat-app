import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
import MessageDialog from "./MessageDialog";

const RegisterForm = ({ setForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [dialog, openDialog] = useState(false);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/auth/register', { username, password })
      .then(({ data }) => {
        setMessage(data.message)
        setTitle(!data.error ? 'Error' : 'Success')
      })
      .catch((err) => {
        setMessage(err.message)
        setTitle('Error')
      })
      .finally(() => {
        openDialog(true)
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setForm('login')
      })
  };

  return (
    <Paper style={{ padding: 16, width: '35vw' }}>
      <Button
        size="small"
        color="secondary"
        onClick={() => setForm('login')}
      >
        Login
      </Button>
      <Typography variant="h5" align="center" gutterBottom>
        Register
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
        {
          password.length < 8
          && <List>
            <ListItem>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Password must be at least 8 characters long" />
            </ListItem>
          </List>
        }
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          disabled={password !== confirmPassword || password.length < 8}
        >
          Register
        </Button>

      </form>
      <MessageDialog
        title={title}
        message={message}
        open={dialog}
        setOpen={openDialog}
      />
    </Paper>
  );
};

export default RegisterForm;