
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, User, UserCog, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - would come from Supabase in a real implementation
const mockConversations = [
  {
    id: "1",
    name: "Hanoi International School",
    type: "school",
    lastMessage: "When will the new teacher arrive?",
    timestamp: "2024-04-10T10:30:00",
    unread: 2,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    type: "teacher",
    lastMessage: "I've prepared the lessons for next week",
    timestamp: "2024-04-09T15:45:00",
    unread: 0,
  },
  {
    id: "3",
    name: "HCMC Language Academy",
    type: "school",
    lastMessage: "Please send the invoice for March",
    timestamp: "2024-04-08T09:20:00",
    unread: 0,
  },
  {
    id: "4",
    name: "HR Department",
    type: "internal",
    lastMessage: "Teacher contract renewals due next month",
    timestamp: "2024-04-07T14:15:00",
    unread: 1,
  }
];

const mockMessages = [
  {
    id: "msg1",
    senderId: "school1",
    senderName: "Hanoi International School",
    senderType: "school",
    content: "Hello, we're wondering when the new IELTS teacher will arrive?",
    timestamp: "2024-04-10T10:30:00"
  },
  {
    id: "msg2",
    senderId: "user1",
    senderName: "You",
    senderType: "user",
    content: "Hi there! The teacher is scheduled to arrive on April 15th. We're just finalizing some visa paperwork.",
    timestamp: "2024-04-10T10:45:00"
  },
  {
    id: "msg3",
    senderId: "school1",
    senderName: "Hanoi International School",
    senderType: "school",
    content: "That's great news! Will there be any orientation before they start teaching?",
    timestamp: "2024-04-10T11:00:00"
  },
  {
    id: "msg4",
    senderId: "user1",
    senderName: "You",
    senderType: "user",
    content: "Yes, we've scheduled a 2-day orientation program on April 16-17. They'll start teaching on April 18th.",
    timestamp: "2024-04-10T11:15:00"
  },
];

interface MessageCenterProps {
  schoolId: string | null;
}

export function MessageCenter({ schoolId }: MessageCenterProps) {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [conversationType, setConversationType] = useState("all");
  
  // Set initial active conversation if none selected
  useEffect(() => {
    if (!activeConversation && mockConversations.length > 0) {
      setActiveConversation(mockConversations[0].id);
    }
  }, [activeConversation]);

  const filteredConversations = mockConversations.filter(convo => {
    if (conversationType === "all") return true;
    return convo.type === conversationType;
  });

  const sendMessage = () => {
    if (messageText.trim() === "") return;
    
    const newMessage = {
      id: `msg${messages.length + 1}`,
      senderId: "user1",
      senderName: "You",
      senderType: "user",
      content: messageText,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
    
    // In a real app, we would send this to Supabase and trigger a Resend email
  };

  const getAvatarForConversation = (type: string, name: string) => {
    const initials = name.split(" ").map(word => word[0]).join("");
    
    return (
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback className={
          type === "school" ? "bg-blue-100 text-blue-800" : 
          type === "teacher" ? "bg-green-100 text-green-800" : 
          "bg-purple-100 text-purple-800"
        }>
          {initials}
        </AvatarFallback>
      </Avatar>
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "school": return <Users className="h-4 w-4" />;
      case "teacher": return <User className="h-4 w-4" />;
      case "internal": return <UserCog className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[650px]">
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Conversations</CardTitle>
            <Button size="sm">
              <Users className="h-4 w-4 mr-2" /> New Chat
            </Button>
          </div>
          <Tabs 
            defaultValue="all" 
            value={conversationType}
            onValueChange={setConversationType}
            className="mt-2"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="school">Schools</TabsTrigger>
              <TabsTrigger value="teacher">Teachers</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="divide-y">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer transition-colors ${
                      activeConversation === conversation.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {getAvatarForConversation(conversation.type, conversation.name)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">{conversation.name}</span>
                            {conversation.unread > 0 && (
                              <Badge className="text-xs bg-primary h-5 min-w-5 flex items-center justify-center p-0">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(conversation.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          {getIconForType(conversation.type)}
                          <span className="ml-1.5 truncate">{conversation.lastMessage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No conversations found
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 flex flex-col">
        <CardHeader className="pb-3 border-b">
          {activeConversation && (
            <div className="flex items-center">
              {getAvatarForConversation(
                mockConversations.find(c => c.id === activeConversation)?.type || "school",
                mockConversations.find(c => c.id === activeConversation)?.name || "Unknown"
              )}
              <div className="ml-3">
                <CardTitle>
                  {mockConversations.find(c => c.id === activeConversation)?.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground capitalize">
                  {mockConversations.find(c => c.id === activeConversation)?.type}
                </p>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.senderType === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.senderType === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{message.senderName}</span>
                      <span className="text-xs opacity-70 ml-2">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="min-h-10 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage} disabled={messageText.trim() === ""}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
