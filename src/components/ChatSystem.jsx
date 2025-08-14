import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { MessageSquare, Plus, Search, Filter, User, Send, Phone, Video, MoreVertical, Paperclip, Smile, Image, FileText, Clock, CheckCheck, Check, Users, Bell, Settings, Star, Archive, Trash2, Pin, Edit3, Copy, Reply, Forward, Download, Camera, Mic, MapPin, Calendar } from 'lucide-react'

export default function ChatSystem({ userType = 'landlord' }) {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedChat])

  // Mock data for chats
  const chats = [
    {
      id: 1,
      name: userType === 'landlord' ? "Sarah Johnson" : "Property Manager Mike",
      role: userType === 'landlord' ? "Tenant" : "Landlord",
      property: "Sunset Apartments - Unit 4B",
      avatar: userType === 'landlord' ? "👩‍💼" : "👨‍💼",
      lastMessage: "Thank you for fixing the heating issue so quickly!",
      lastMessageTime: "2 min ago",
      unreadCount: 0,
      isOnline: true,
      status: "Active",
      messages: [
        {
          id: 1,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Hi! I wanted to report that the heating in my unit isn't working properly.",
          timestamp: "10:30 AM",
          type: "text",
          status: "read"
        },
        {
          id: 2,
          sender: userType === 'landlord' ? "landlord" : "tenant",
          content: "Thanks for letting me know! I'll send a technician over this afternoon. Is 2 PM convenient for you?",
          timestamp: "10:32 AM",
          type: "text",
          status: "read"
        },
        {
          id: 3,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Perfect! I'll be home then. Thank you for the quick response.",
          timestamp: "10:35 AM",
          type: "text",
          status: "read"
        },
        {
          id: 4,
          sender: userType === 'landlord' ? "landlord" : "tenant",
          content: "The technician has completed the repair. Everything should be working now!",
          timestamp: "3:15 PM",
          type: "text",
          status: "read"
        },
        {
          id: 5,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Thank you for fixing the heating issue so quickly!",
          timestamp: "3:45 PM",
          type: "text",
          status: "delivered"
        }
      ]
    },
    {
      id: 2,
      name: userType === 'landlord' ? "Michael Chen" : "Landlord Lisa",
      role: userType === 'landlord' ? "Tenant" : "Landlord",
      property: "Oak Street Townhomes - Unit 12A",
      avatar: userType === 'landlord' ? "👨‍💻" : "👩‍💼",
      lastMessage: "When is the rent due this month?",
      lastMessageTime: "1 hour ago",
      unreadCount: 2,
      isOnline: false,
      status: "Active",
      messages: [
        {
          id: 1,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Hi! I have a question about the lease renewal process.",
          timestamp: "Yesterday 4:20 PM",
          type: "text",
          status: "read"
        },
        {
          id: 2,
          sender: userType === 'landlord' ? "landlord" : "tenant",
          content: "Of course! Your lease expires in March. I'll send you the renewal documents next week.",
          timestamp: "Yesterday 4:25 PM",
          type: "text",
          status: "read"
        },
        {
          id: 3,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Great! Also, when is the rent due this month?",
          timestamp: "1 hour ago",
          type: "text",
          status: "delivered"
        },
        {
          id: 4,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "I want to make sure I don't miss the deadline.",
          timestamp: "1 hour ago",
          type: "text",
          status: "delivered"
        }
      ]
    },
    {
      id: 3,
      name: userType === 'landlord' ? "Emily Rodriguez" : "Property Owner John",
      role: userType === 'landlord' ? "Tenant" : "Landlord",
      property: "Riverside Condos - Unit 8C",
      avatar: userType === 'landlord' ? "👩‍🎨" : "👨‍💼",
      lastMessage: "The new washing machine works perfectly!",
      lastMessageTime: "3 hours ago",
      unreadCount: 0,
      isOnline: true,
      status: "Active",
      messages: [
        {
          id: 1,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "The washing machine in the unit has stopped working. Could you please arrange for a replacement?",
          timestamp: "Monday 2:15 PM",
          type: "text",
          status: "read"
        },
        {
          id: 2,
          sender: userType === 'landlord' ? "landlord" : "tenant",
          content: "I'll have a new one delivered and installed by Thursday. Sorry for the inconvenience!",
          timestamp: "Monday 2:30 PM",
          type: "text",
          status: "read"
        },
        {
          id: 3,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "The new washing machine works perfectly! Thank you so much.",
          timestamp: "3 hours ago",
          type: "text",
          status: "read"
        }
      ]
    },
    {
      id: 4,
      name: userType === 'landlord' ? "David Thompson" : "Manager Sarah",
      role: userType === 'landlord' ? "Tenant" : "Property Manager",
      property: "Garden Villa - Unit 1",
      avatar: userType === 'landlord' ? "👨‍⚕️" : "👩‍💼",
      lastMessage: "Can we schedule a property inspection?",
      lastMessageTime: "1 day ago",
      unreadCount: 1,
      isOnline: false,
      status: "Active",
      messages: [
        {
          id: 1,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Hi! I wanted to discuss the upcoming property inspection. Can we schedule a convenient time?",
          timestamp: "1 day ago",
          type: "text",
          status: "delivered"
        }
      ]
    },
    {
      id: 5,
      name: userType === 'landlord' ? "Jessica Park" : "Owner Mike",
      role: userType === 'landlord' ? "Tenant" : "Landlord",
      property: "Downtown Lofts - Unit 15",
      avatar: userType === 'landlord' ? "👩‍🏫" : "👨‍💼",
      lastMessage: "Thank you for the quick response!",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
      isOnline: false,
      status: "Active",
      messages: [
        {
          id: 1,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "The package delivery system is working great. Thank you for installing it!",
          timestamp: "2 days ago",
          type: "text",
          status: "read"
        },
        {
          id: 2,
          sender: userType === 'landlord' ? "landlord" : "tenant",
          content: "You're welcome! Let me know if you need anything else.",
          timestamp: "2 days ago",
          type: "text",
          status: "read"
        },
        {
          id: 3,
          sender: userType === 'landlord' ? "tenant" : "landlord",
          content: "Thank you for the quick response!",
          timestamp: "2 days ago",
          type: "text",
          status: "read"
        }
      ]
    }
  ]

  const stats = [
    {
      title: "Active Chats",
      value: "12",
      change: "+3 this week",
      icon: MessageSquare,
      color: "gradient-primary"
    },
    {
      title: "Response Time",
      value: "< 5 min",
      change: "30% faster",
      icon: Clock,
      color: "gradient-secondary"
    },
    {
      title: "Satisfaction Rate",
      value: "98.5%",
      change: "+2.1% this month",
      icon: Star,
      color: "gradient-accent"
    },
    {
      title: "Messages Today",
      value: "47",
      change: "+12 from yesterday",
      icon: Users,
      color: "gradient-primary"
    }
  ]

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'unread' && chat.unreadCount > 0) ||
                         (filterStatus === 'online' && chat.isOnline)
    return matchesSearch && matchesStatus
  })

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: selectedChat.messages.length + 1,
        sender: userType,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text",
        status: "sent"
      }
      
      // Update the selected chat with the new message
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastMessage: message,
        lastMessageTime: "now"
      }
      
      setSelectedChat(updatedChat)
      setMessage('')
      
      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        // Simulate response
        const responseMessage = {
          id: updatedChat.messages.length + 1,
          sender: userType === 'landlord' ? 'tenant' : 'landlord',
          content: "Thanks for your message! I'll get back to you shortly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text",
          status: "delivered"
        }
        setSelectedChat(prev => ({
          ...prev,
          messages: [...prev.messages, responseMessage]
        }))
      }, 2000)
    }
  }

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <Check className="w-4 h-4 text-gray-400" />
      case 'delivered': return <CheckCheck className="w-4 h-4 text-gray-400" />
      case 'read': return <CheckCheck className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <Dialog open={showNewChatModal} onOpenChange={setShowNewChatModal}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start New Conversation</DialogTitle>
                  <DialogDescription>
                    Choose who you'd like to message
                  </DialogDescription>
                </DialogHeader>
                <NewChatForm userType={userType} onClose={() => setShowNewChatModal(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter chats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chats</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-lg">
                    {chat.avatar}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <p className="text-xs text-gray-500">{chat.role} • {chat.property}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{chat.lastMessageTime}</p>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs mt-1">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                      {selectedChat.avatar}
                    </div>
                    {selectedChat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedChat.isOnline ? 'Online' : 'Last seen 2 hours ago'} • {selectedChat.property}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === userType ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === userType
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <div className={`flex items-center justify-end space-x-1 mt-1 ${
                      msg.sender === userType ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{msg.timestamp}</span>
                      {msg.sender === userType && getMessageStatusIcon(msg.status)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  className="btn-primary"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NewChatForm({ userType, onClose }) {
  const [formData, setFormData] = useState({
    recipient: '',
    property: '',
    subject: '',
    message: ''
  })

  const recipients = userType === 'landlord' 
    ? [
        { value: 'sarah', label: 'Sarah Johnson - Sunset Apartments 4B' },
        { value: 'michael', label: 'Michael Chen - Oak Street 12A' },
        { value: 'emily', label: 'Emily Rodriguez - Riverside 8C' },
        { value: 'david', label: 'David Thompson - Garden Villa 1' }
      ]
    : [
        { value: 'manager1', label: 'Property Manager Mike' },
        { value: 'landlord1', label: 'Landlord Lisa' },
        { value: 'owner1', label: 'Property Owner John' },
        { value: 'manager2', label: 'Manager Sarah' }
      ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('New chat data:', formData)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">
          {userType === 'landlord' ? 'Select Tenant' : 'Select Landlord/Manager'}
        </Label>
        <Select value={formData.recipient} onValueChange={(value) => handleChange('recipient', value)}>
          <SelectTrigger>
            <SelectValue placeholder={`Choose ${userType === 'landlord' ? 'tenant' : 'landlord/manager'}`} />
          </SelectTrigger>
          <SelectContent>
            {recipients.map((recipient) => (
              <SelectItem key={recipient.value} value={recipient.value}>
                {recipient.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="btn-primary flex-1">
          <Send className="w-4 h-4 mr-2" />
          Start Chat
        </Button>
      </div>
    </form>
  )
}

