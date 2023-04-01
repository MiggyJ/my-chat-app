import { useState, useEffect, useContext } from 'react';
import { Add } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ListItem, ListItemText, ListItemSecondaryAction, IconButton, List, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

function SearchConnection({ open, onClose }) {
  const socket = useContext(SocketContext)
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const sendRequest = async (user) => {
    try {
      const response = await axios.post('/connection/request', { recipientId: user.id })

      if (response.data) {
        alert(response.data.message)
        fetchToConnect()
        socket.emit('new-request', user.username)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const fetchToConnect = async () => {
    const response = await axios.get('/connection/search');
    console.log(response.data.data)
    setData(response.data.data);
  };

  useEffect(() => {
    if (open) {
      fetchToConnect();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Request Chat</DialogTitle>
      <DialogContent dividers style={{ width: '35vw', maxHeight: '40vh' }}>
        {/* LOOP THROUGH CONNECTION */}
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
        />
        {data ? (
          <List>
            {
              search.length
                ? data.filter(el => el.username.includes(search)).length
                  ? data.filter(el => el.username.includes(search)).map(el => (
                    <ListItem key={el.id}>
                      <ListItemText primary={el.username} />
                      {
                        el.sent[0] || el.recipient[0]
                          ? <ListItemSecondaryAction>
                            <ListItemText primary={'Pending'} />
                          </ListItemSecondaryAction>
                          : <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => { }}>
                              <Add />
                            </IconButton>
                          </ListItemSecondaryAction>
                      }
                    </ListItem>
                  ))
                  : <Typography align='center' variant='body1'>Nothing found</Typography>
                : data.map(el => (
                  <ListItem key={el.id}>
                    <ListItemText primary={el.username} />
                    {
                      el.sent[0] || el.recipient[0]
                        ? <ListItemSecondaryAction>
                          <ListItemText primary={'Pending'} />
                        </ListItemSecondaryAction>
                        : <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => { sendRequest(el) }}>
                            <Add />
                          </IconButton>
                        </ListItemSecondaryAction>
                    }
                  </ListItem>
                ))
            }
          </List>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SearchConnection;