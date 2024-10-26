import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg shadow-2xl rounded-t-2xl border border-indigo-500/50 text-white overflow-y-auto max-h-60 p-4"
    >
      {messages.map((msg, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-2 p-2 rounded-lg bg-indigo-800/50"
        >
          <span className="font-bold text-indigo-300">{msg.player}: </span>
          <span className="text-white">{msg.message}</span>
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default ChatMessages;
