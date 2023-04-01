import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { SocketContext } from '../context/SocketContext';

const ChatMain = ({ convo }) => {
  const { id } = useContext(AuthContext)
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const scrollRef = useRef()

  const handleTextFieldChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault()
    if (message.trim() !== '') {
      const response = await axios.post(`/chat/${convo}/send`, { content: message })
      if (!response.error) {
        setMessage('');
        setMessages(prev => [...prev, response.data.data])
        socket.emit('send-message', convo, response.data.data)
      } else {
        console.log(response.message)
      }
    }
  };

  const fetchChat = async () => {
    try {
      const response = await axios.get(`/chat/${convo}/view`)
      if (!response.error)
        setMessages(response.data.data)
      else
        console.log(response.message)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  useEffect(() => {
    if (convo !== 0)
      fetchChat()
  }, [convo])

  useEffect(() => {
    const receiveMessage = received => setMessages(prev => [...prev, received])
    socket.on('receive-message', receiveMessage)

    return () => {
      socket.off('receive-message', receiveMessage)
    }

  }, [socket])

  return (
    <Grid container sx={{ height: 'calc(100vh - 64px)' }}>
      <Grid item xs={12} sx={{ height: '80%', backgroundColor: 'lightblue', overflowY: 'auto', p: 3 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.senderId === id ? 'flex-end' : 'flex-start',
              mt: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                borderRadius: message.senderId === id ? '10px 10px 0 10px' : '10px 10px 10px 0px',
                backgroundColor: message.senderId === id ? '#0084ff' : '#EBEBEB',
                color: message.senderId === id ? 'white' : 'black',
                maxWidth: '70%'
              }}
            >
              {message.content}
            </Paper>
          </Box>
        ))}
        <div style={{ float: "left", clear: "both" }}
          ref={scrollRef}>
        </div>
      </Grid>
      <Grid item xs={12} sx={{ height: '20%', backgroundColor: 'lightgreen' }}>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSend}>
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor: 'white'
              }}
            >
              <InputBase
                placeholder="Type a message"
                fullWidth
                value={message}
                onChange={handleTextFieldChange}
                sx={{ ml: 2, flex: 1 }}
                maxRows={3}
                disabled={convo === 0}
              />
              <IconButton disabled={convo === 0} color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Paper>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatMain;
