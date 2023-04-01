import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const ChatDrawer = ({ onOpen, selectConvo, convo, reloadDrawer, setReloadDrawer }) => {

  const socket = useContext(SocketContext)
  const [inbox, setInbox] = useState([])

  const fetchInboxList = async () => {
    try {
      const { data } = await axios.get('/inbox/list')
      if (!data.error) {
        setInbox(data.data)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (reloadDrawer) {
      fetchInboxList()
      setReloadDrawer(false)
    }
  }, [reloadDrawer])

  useEffect(() => {
    if (inbox.length) {
      selectConvo(inbox[0].id)
      socket.emit('select-inbox', inbox[0].id)
    }
  }, [inbox])

  useEffect(() => {
    const refreshContacts = _ => fetchInboxList()
    socket.on('refresh-contacts', refreshContacts)

    return () => {
      socket.off('refresh-contacts', refreshContacts)
    }

  }, [socket])

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <ListItemButton
          onClick={() => onOpen()}
        >Connect with Users</ListItemButton>
        <Divider />
        {
          inbox.length === 0
          && <Typography align="center" sx={{ mt: 3 }}>No conversations found.</Typography>
        }
        <List>
          {inbox.map(el => (
            <ListItem
              key={el.id}
              disablePadding sx={{ backgroundColor: convo === el.id ? '#00000033' : null }}
              onClick={() => {
                selectConvo(el.id)
                socket.emit('select-inbox', el.id)
              }}
            >
              <ListItemButton>
                <ListItemText primary={el.contact.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default ChatDrawer;