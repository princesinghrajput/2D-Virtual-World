import { useState, useCallback } from 'react';

const useChatAndEmotes = (players, setPlayers, currentPlayer) => {
  const [chatInput, setChatInput] = useState('');

  const sendChat = useCallback((message) => {
    if (!message.trim()) return;
    
    setPlayers(prev => prev.map(p => 
      p.id === currentPlayer.id 
        ? { ...p, chat: message } 
        : p
    ));

    setTimeout(() => {
      setPlayers(prev => prev.map(p => 
        p.id === currentPlayer.id 
          ? { ...p, chat: null } 
          : p
      ));
    }, 3000);
    
    setChatInput('');
  }, [currentPlayer.id, setPlayers]);

  const sendEmote = useCallback((emote) => {
    setPlayers(prev => prev.map(p => 
      p.id === currentPlayer.id 
        ? { ...p, emote } 
        : p
    ));

    setTimeout(() => {
      setPlayers(prev => prev.map(p => 
        p.id === currentPlayer.id 
          ? { ...p, emote: null } 
          : p
      ));
    }, 2000);
  }, [currentPlayer.id, setPlayers]);

  return { chatInput, setChatInput, sendChat, sendEmote };
};

export default useChatAndEmotes;
