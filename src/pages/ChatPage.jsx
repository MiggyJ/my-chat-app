import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatDrawer from '../components/ChatDrawer';
import ChatMain from '../components/ChatMain';
import SearchConnection from '../components/SearchConnection';
import RequestNotifications from '../components/RequestNotifications';

const ChatPage = () => {
  const { logout, username } = useContext(AuthContext)
  const [connect, openConnect] = useState(false)
  const [convo, selectConvo] = useState(0)
  const [reloadDrawer, setReloadDrawer] = useState(true)

  const onOpen = () => openConnect(true)
  const onClose = () => openConnect(false)

  return (
    <>
      <div style={{ display: 'flex' }}>
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chat App - {username}
            </Typography>
            <RequestNotifications setReloadDrawer={setReloadDrawer} />
            <Button
              color="inherit"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ display: 'flex' }}>
        <ChatDrawer
          reloadDrawer={reloadDrawer}
          setReloadDrawer={setReloadDrawer}
          onOpen={onOpen}
          selectConvo={selectConvo}
          convo={convo}
        />
        <ChatMain convo={convo} />
        <SearchConnection open={connect} onClose={onClose} />
      </div>
    </>
  );
}

export default ChatPage;
