import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const ChatInput = ({ chatInput, setChatInput, sendChat }) => (
  <Card className="mt-6 p-4 w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg">
    <div className="flex gap-2">
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendChat(chatInput)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Button onClick={() => sendChat(chatInput)} className="rounded-full">
        <MessageSquare className="mr-2" />
        Send
      </Button>
    </div>
  </Card>
);

export default ChatInput;
