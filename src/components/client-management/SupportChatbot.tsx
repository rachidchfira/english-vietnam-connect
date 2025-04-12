
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, SendHorizonal, Minimize, Bot, Globe } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface SupportChatbotProps {
  minimized?: boolean;
  onMinimize?: () => void;
}

export function SupportChatbot({ minimized = false, onMinimize }: SupportChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Xin chào! Tôi là trợ lý ảo. Tôi có thể giúp gì cho bạn hôm nay? / Hello! I'm the virtual assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // In a real app, we would send this to OpenAI via Supabase Edge Functions
    // Simulate a delay for the response
    setTimeout(() => {
      const botResponses = {
        en: [
          "I can help you with information about our teaching services.",
          "We have teachers available for various English courses including IELTS, Business English, and more.",
          "You can request a teacher through the Teacher Requests section.",
          "Is there anything specific you'd like to know about our services?",
        ],
        vi: [
          "Tôi có thể giúp bạn với thông tin về dịch vụ giảng dạy của chúng tôi.",
          "Chúng tôi có giáo viên cho các khóa học tiếng Anh khác nhau bao gồm IELTS, tiếng Anh thương mại, và nhiều hơn nữa.",
          "Bạn có thể yêu cầu một giáo viên thông qua phần Yêu cầu Giáo viên.",
          "Có điều gì cụ thể bạn muốn biết về dịch vụ của chúng tôi không?",
        ],
      };
      
      // Select a random response based on the language
      const randomIndex = Math.floor(Math.random() * botResponses[language].length);
      const responseContent = botResponses[language][randomIndex];
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  if (minimized) {
    return null;
  }
  
  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 shadow-lg border-primary/10">
      <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between bg-primary text-primary-foreground">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <CardTitle className="text-sm">Support Assistant</CardTitle>
        </div>
        <div className="flex items-center">
          <Select value={language} onValueChange={(value: "en" | "vi") => setLanguage(value)}>
            <SelectTrigger className="h-7 w-16 border-none bg-primary-foreground/20 text-primary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="vi">VI</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-7 w-7 ml-1" onClick={onMinimize}>
            <Minimize className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="bg-primary text-primary-foreground">You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 bg-muted text-muted-foreground text-sm">
                    <div className="flex space-x-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-75">•</span>
                      <span className="animate-bounce delay-150">•</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2 border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full space-x-2"
        >
          <Input
            placeholder={language === "en" ? "Type a message..." : "Nhập tin nhắn..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputMessage.trim() || isLoading}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
