import { CircularProgress, Typography } from '@mui/material';

function PreloaderScreen() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress size={80} color="primary" />
      <Typography variant="h6" component="div" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </div>
  );
}

export default PreloaderScreen;
