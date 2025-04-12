
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MoreVertical, Search, ThumbsUp } from "lucide-react";

// Mock forum posts
const mockForumPosts = [
  {
    id: "1",
    title: "Fun Phonics Game for Young Learners",
    title_vi: "Trò Chơi Luyện Phát Âm Vui Nhộn cho Học Sinh Nhỏ Tuổi",
    content: "I've been using this phonics game with my beginner classes and it's been a hit! Students have to match sounds with pictures and then create new words. Great for ages 6-8.",
    content_vi: "Tôi đã sử dụng trò chơi luyện phát âm này với các lớp của học sinh mới bắt đầu và nó đã thành công! Học sinh phải ghép âm thanh với hình ảnh và sau đó tạo ra các từ mới. Rất tốt cho độ tuổi từ 6-8.",
    author: "Maria Nguyen",
    avatar: null,
    created_at: "2025-04-10",
    likes: 24,
    comments: 5,
    tags: ["Phonics", "Games", "Young Learners"]
  },
  {
    id: "2",
    title: "Tips for Teaching Vietnamese Students Pronunciation",
    title_vi: "Mẹo Dạy Phát Âm cho Học Sinh Việt Nam",
    content: "After 5 years teaching in HCMC, I've compiled some techniques that specifically help Vietnamese students overcome common pronunciation issues like final consonants, 'th' sounds, and intonation patterns.",
    content_vi: "Sau 5 năm dạy học ở TP.HCM, tôi đã tổng hợp một số kỹ thuật đặc biệt giúp học sinh Việt Nam vượt qua các vấn đề phát âm phổ biến như phụ âm cuối, âm 'th' và mẫu ngữ điệu.",
    author: "John Peterson",
    avatar: null,
    created_at: "2025-04-08",
    likes: 36,
    comments: 12,
    tags: ["Pronunciation", "Teaching Techniques"]
  },
  {
    id: "3",
    title: "Tet-Themed Lesson Materials",
    title_vi: "Tài Liệu Bài Học Theo Chủ Đề Tết",
    content: "With Tet approaching, I wanted to share my collection of Lunar New Year themed resources. Includes vocabulary exercises, cultural discussion questions, and a fun craft activity.",
    content_vi: "Với Tết đang đến gần, tôi muốn chia sẻ bộ sưu tập tài nguyên theo chủ đề Tết Nguyên Đán. Bao gồm bài tập từ vựng, câu hỏi thảo luận văn hóa và hoạt động thủ công vui nhộn.",
    author: "Linh Tran",
    avatar: null,
    created_at: "2025-04-05",
    likes: 42,
    comments: 8,
    tags: ["Cultural", "Tet", "Holiday Lessons"]
  }
];

interface CollaborationForumProps {
  language: "en" | "vi";
}

export function CollaborationForum({ language }: CollaborationForumProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);
  
  const translations = {
    searchPlaceholder: {
      en: "Search discussions...",
      vi: "Tìm kiếm thảo luận..."
    },
    newPost: {
      en: "New Discussion",
      vi: "Thảo Luận Mới"
    },
    createPost: {
      en: "Create Discussion",
      vi: "Tạo Thảo Luận"
    },
    postTitle: {
      en: "Title",
      vi: "Tiêu Đề"
    },
    postTitleEn: {
      en: "Title (English)",
      vi: "Tiêu Đề (Tiếng Anh)"
    },
    postTitleVi: {
      en: "Title (Vietnamese)",
      vi: "Tiêu Đề (Tiếng Việt)"
    },
    postContent: {
      en: "Content",
      vi: "Nội Dung"
    },
    postContentEn: {
      en: "Content (English)",
      vi: "Nội Dung (Tiếng Anh)"
    },
    postContentVi: {
      en: "Content (Vietnamese)",
      vi: "Nội Dung (Tiếng Việt)"
    },
    tags: {
      en: "Tags (comma separated)",
      vi: "Thẻ (phân cách bằng dấu phẩy)"
    },
    cancel: {
      en: "Cancel",
      vi: "Hủy"
    },
    submit: {
      en: "Submit",
      vi: "Gửi"
    },
    like: {
      en: "Like",
      vi: "Thích"
    },
    comment: {
      en: "Comment",
      vi: "Bình Luận"
    },
    likes: {
      en: "likes",
      vi: "lượt thích"
    },
    comments: {
      en: "comments",
      vi: "bình luận"
    },
    reply: {
      en: "Reply",
      vi: "Trả Lời"
    },
    share: {
      en: "Share",
      vi: "Chia Sẻ"
    },
    report: {
      en: "Report",
      vi: "Báo Cáo"
    },
    options: {
      en: "Options",
      vi: "Tùy Chọn"
    }
  };

  // Filter posts based on search
  const filteredPosts = mockForumPosts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.title_vi.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.content_vi.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'vi-VN', options);
  };

  // Handle creating a new post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setNewPostDialogOpen(false);
    // In a real app, this would send data to Supabase
  };

  // Get author initials for avatar fallback
  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      {/* Search and new post button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={translations.searchPlaceholder[language]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={newPostDialogOpen} onOpenChange={setNewPostDialogOpen}>
          <DialogTrigger asChild>
            <Button>{translations.newPost[language]}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{translations.createPost[language]}</DialogTitle>
              <DialogDescription>
                Share your teaching tips, questions, or resources with other teachers.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder={translations.postTitleEn[language]}
                  required
                />
                <Input 
                  placeholder={translations.postTitleVi[language]}
                />
              </div>
              <div className="space-y-2">
                <Textarea 
                  placeholder={translations.postContentEn[language]}
                  rows={4}
                  required
                />
                <Textarea 
                  placeholder={translations.postContentVi[language]}
                  rows={4}
                />
              </div>
              <div>
                <Input 
                  placeholder={translations.tags[language]}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setNewPostDialogOpen(false)}>
                  {translations.cancel[language]}
                </Button>
                <Button type="submit">
                  {translations.submit[language]}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Forum posts */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          [...Array(3)].map((_, i) => (
            <Card key={i} className="mb-4">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-[90%] mb-2" />
                <Skeleton className="h-4 w-[70%]" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual forum posts
          filteredPosts.map((post) => (
            <Card key={post.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={post.avatar || undefined} alt={post.author} />
                      <AvatarFallback>{getAuthorInitials(post.author)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{language === 'en' ? post.title : post.title_vi}</CardTitle>
                      <p className="text-sm text-muted-foreground">{post.author} • {formatDate(post.created_at)}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">{translations.options[language]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{translations.options[language]}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>{translations.share[language]}</DropdownMenuItem>
                        <DropdownMenuItem>{translations.report[language]}</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{language === 'en' ? post.content : post.content_vi}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes} {translations.likes[language]}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments} {translations.comments[language]}
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  {translations.reply[language]}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
