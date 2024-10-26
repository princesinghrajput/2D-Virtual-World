import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const ChatInput = ({ chatInput, setChatInput, sendChat }) => (
  <motion.form 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onSubmit={(e) => {
      e.preventDefault();
      sendChat(chatInput);
    }} 
    className="flex gap-2 p-4 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-lg shadow-2xl rounded-b-2xl border-t-0 border border-purple-500/50"
  >
    <input
      type="text"
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      placeholder="Type a message..."
      className="flex-1 px-4 py-2 bg-indigo-800/50 border border-indigo-500/50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-indigo-300"
    />
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center"
    >
      <MessageSquare className="mr-2" size={18} />
      Send
    </motion.button>
  </motion.form>
);

export default ChatInput;
