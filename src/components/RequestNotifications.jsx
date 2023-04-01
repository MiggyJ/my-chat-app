import { useContext, useEffect, useState } from 'react';
import { Button, Menu, Badge, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import { Delete, Check } from '@mui/icons-material'
import { Notifications } from '@mui/icons-material';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const RequestNotifications = ({ setReloadDrawer }) => {
  const socket = useContext(SocketContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [requests, setRequests] = useState([])

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRequest = async (id, action, sender) => {
    try {
      const { data } = await axios.put(`/connection/${id}/${action}`)
      if (!data.error) {
        if (action == 'accept')
          socket.emit('accepted-request', sender)
        fetchRequests()
        setReloadDrawer(true)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get('/connection/requestList')
      if (!data.error) {
        setRequests(data.data)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    const receiveNotification = _ => fetchRequests()
    socket.on('request-notification', receiveNotification)

    return () => {
      socket.off('request-notification', receiveNotification)
    }

  }, [socket])

  return (
    <>
      <Button color="inherit" onClick={handleOpenMenu}>
        <Badge badgeContent={requests.length ?? null} color="error">
          <Notifications />
        </Badge>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}

      >
        <Typography variant='h6' align='center' sx={{ p: 2 }}>Connection Requests</Typography>
        {
          requests.length === 0
          && <Typography align="center" sx={{ mt: 3 }}>No requests found.</Typography>
        }
        <List>
          {
            requests.map(el => (
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <>
                    <IconButton onClick={() => { handleRequest(el.id, 'accept', el.sender.username) }}>
                      <Check color='success' />
                    </IconButton>
                    <IconButton onClick={() => { handleRequest(el.id, 'reject') }}>
                      <Delete color='error' />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={el.sender.username} />
              </ListItem>
            ))
          }
        </List>
      </Menu>
    </>
  );
}

export default RequestNotifications;