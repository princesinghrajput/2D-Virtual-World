import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const ChatInput = ({ chatInput, setChatInput, sendChat }) => (
  <Card className="mt-6 p-4 w-full max-w-2xl bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-purple-500/50">
    <div className="flex gap-2">
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendChat(chatInput)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-indigo-800/50 border border-indigo-500/50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-indigo-300"
      />
      <Button onClick={() => sendChat(chatInput)} className="rounded-full bg-purple-600 hover:bg-purple-500 transition-all duration-300 transform hover:scale-105">
        <MessageSquare className="mr-2" />
        Send
      </Button>
    </div>
  </Card>
);

export default ChatInput;
