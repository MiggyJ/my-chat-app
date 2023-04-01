import { Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';

const AuthPage = () => {
  const [form, setForm] = useState('login');


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      {
        form === 'login'
          ? <LoginForm setForm={setForm} />
          : <RegisterForm setForm={setForm} />
      }
    </Box>
  );
}

export default AuthPage;
