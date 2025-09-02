import React, { useState, useRef, useEffect } from 'react';
import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'away' | 'offline';
  }>;
  lastMessage?: {
    text: string;
    timestamp: string;
    sender: string;
  };
  unreadCount: number;
}

// Mock data
const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Website Redesign Team',
    type: 'group',
    participants: [
      { id: '1', name: 'Sarah Johnson', avatar: 'SJ', status: 'online' },
      { id: '2', name: 'Mike Chen', avatar: 'MC', status: 'online' },
      { id: '3', name: 'Emily Davis', avatar: 'ED', status: 'away' },
    ],
    lastMessage: {
      text: 'The new design looks great! When can we start implementation?',
      timestamp: '2024-01-20T10:30:00Z',
      sender: 'Mike Chen',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    type: 'direct',
    participants: [
      { id: '1', name: 'Sarah Johnson', avatar: 'SJ', status: 'online' },
    ],
    lastMessage: {
      text: 'Can you review the wireframes I sent?',
      timestamp: '2024-01-20T09:45:00Z',
      sender: 'Sarah Johnson',
    },
    unreadCount: 1,
  },
  {
    id: '3',
    name: 'David Wilson',
    type: 'direct',
    participants: [
      { id: '4', name: 'David Wilson', avatar: 'DW', status: 'offline' },
    ],
    lastMessage: {
      text: 'Thanks for the documentation update!',
      timestamp: '2024-01-19T16:20:00Z',
      sender: 'You',
    },
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: "Hey team! I've uploaded the latest design mockups to the shared folder.",
    sender: { id: '1', name: 'Sarah Johnson', avatar: 'SJ' },
    timestamp: '2024-01-20T09:30:00Z',
    type: 'text',
  },
  {
    id: '2',
    text: 'Great work Sarah! The color scheme looks much better now.',
    sender: { id: '2', name: 'Mike Chen', avatar: 'MC' },
    timestamp: '2024-01-20T09:35:00Z',
    type: 'text',
  },
  {
    id: '3',
    text: 'I agree! Should we schedule a review meeting for tomorrow?',
    sender: { id: '3', name: 'Emily Davis', avatar: 'ED' },
    timestamp: '2024-01-20T09:40:00Z',
    type: 'text',
  },
  {
    id: '4',
    text: 'The new design looks great! When can we start implementation?',
    sender: { id: '2', name: 'Mike Chen', avatar: 'MC' },
    timestamp: '2024-01-20T10:30:00Z',
    type: 'text',
  },
];

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        id: user?.id || 'current',
        name: user?.name || 'You',
        avatar: user?.name?.charAt(0)?.toUpperCase() || 'Y',
      },
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full max-h-screen -mx-4 -my-6">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Messages
            </h2>
            <Button size="sm">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={MagnifyingGlassIcon}
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedConversation === conversation.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-r-primary-600'
                  : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 relative">
                  {conversation.type === 'direct' ? (
                    <>
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {conversation.participants[0]?.avatar}
                        </span>
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          conversation.participants[0]?.status === 'online'
                            ? 'bg-green-400'
                            : conversation.participants[0]?.status === 'away'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                        }`}
                      ></div>
                    </>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {conversation.participants.length}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>

                  {conversation.lastMessage && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                      {conversation.lastMessage.sender === 'You' ? 'You: ' : ''}
                      {conversation.lastMessage.text}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-1">
                      {conversation.participants
                        .slice(0, 3)
                        .map((participant, index) => (
                          <div
                            key={index}
                            className="w-5 h-5 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full border border-white dark:border-gray-800 flex items-center justify-center"
                          >
                            <span className="text-white text-xs font-medium">
                              {participant.avatar}
                            </span>
                          </div>
                        ))}
                      {conversation.participants.length > 3 && (
                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-800 flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs">
                            +{conversation.participants.length - 3}
                          </span>
                        </div>
                      )}
                    </div>

                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs font-medium rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {selectedConv.type === 'direct'
                        ? selectedConv.participants[0]?.avatar
                        : selectedConv.participants.length.toString()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedConv.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedConv.type === 'direct'
                        ? selectedConv.participants[0]?.status || 'offline'
                        : `${selectedConv.participants.length} members`}
                    </p>
                  </div>
                </div>

                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isOwn =
                    message.sender.id === user?.id ||
                    message.sender.name === user?.name;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isOwn ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                          isOwn ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        {!isOwn && (
                          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-medium">
                              {message.sender.avatar}
                            </span>
                          </div>
                        )}

                        <div>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwn
                                ? 'bg-primary-600 text-white rounded-br-sm'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
                            }`}
                          >
                            {!isOwn && (
                              <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                                {message.sender.name}
                              </p>
                            )}
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <p
                            className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                              isOwn ? 'text-right' : 'text-left'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    rows={1}
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FaceSmileIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <ChatBubbleLeftRightIcon className="h-full w-full" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
                Select a conversation
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose a conversation from the sidebar to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
