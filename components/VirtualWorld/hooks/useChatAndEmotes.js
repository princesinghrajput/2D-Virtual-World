import { useState, useCallback, useEffect } from 'react';

const useChatAndEmotes = (players, setPlayers, currentPlayer, socket) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('new_message', (message) => {
        console.log('New message received in hook:', message);
        setChatMessages(prev => [...prev, message]);
      });

      socket.on('player_emote', ({ id, emote }) => {
        setPlayers(prev => prev.map(p => 
          p.id === id ? { ...p, emote } : p
        ));

        setTimeout(() => {
          setPlayers(prev => prev.map(p => 
            p.id === id ? { ...p, emote: null } : p
          ));
        }, 2000);
      });
    }
  }, [socket, setPlayers]);

  const sendChat = useCallback((message) => {
    if (!message.trim() || !socket || !currentPlayer) return;
    
    const newMessage = { player: currentPlayer.name, message };
    console.log('Sending chat message:', newMessage);
    socket.emit('chat_message', newMessage);
    
    // Remove this line to prevent adding the message locally
    // setChatMessages(prev => [...prev, newMessage]);
    
    setChatInput('');
  }, [currentPlayer, socket]);

  const sendEmote = useCallback((emote) => {
    if (!socket || !currentPlayer) return;

    socket.emit('player_emote', { id: currentPlayer.id, emote });
  }, [currentPlayer, socket]);

  return { chatInput, setChatInput, sendChat, sendEmote, chatMessages, setChatMessages };
};

export default useChatAndEmotes;
