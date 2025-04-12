
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileText,
  FileVideo,
  Search,
  Star,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Mock data for initial rendering
const mockResources = [
  { 
    id: "1", 
    title: "Basic Greetings Lesson Plan", 
    title_vi: "Giáo Án Chào Hỏi Cơ Bản",
    category: "Speaking",
    file_type: "pdf",
    uploaded_by: "Maria Nguyen",
    rating: 4.5,
    downloads: 127,
    created_at: "2025-03-15",
    cultural_note: "Includes formal greetings used during Tet holiday"
  },
  { 
    id: "2", 
    title: "Past Tense Worksheet", 
    title_vi: "Bài Tập Thì Quá Khứ",
    category: "Grammar",
    file_type: "pdf",
    uploaded_by: "John Smith",
    rating: 4.8,
    downloads: 215,
    created_at: "2025-03-10",
    cultural_note: null
  },
  { 
    id: "3", 
    title: "Pronunciation Video Guide", 
    title_vi: "Hướng Dẫn Phát Âm Bằng Video",
    category: "Pronunciation",
    file_type: "video",
    uploaded_by: "Thomas Huynh",
    rating: 4.2,
    downloads: 98,
    created_at: "2025-03-05",
    cultural_note: "Focuses on sounds difficult for Vietnamese speakers"
  },
  { 
    id: "4", 
    title: "Tet Festival Vocabulary", 
    title_vi: "Từ Vựng Về Tết Nguyên Đán",
    category: "Vocabulary",
    file_type: "pdf",
    uploaded_by: "Linh Tran",
    rating: 4.9,
    downloads: 342,
    created_at: "2025-02-28",
    cultural_note: "Complete guide to Tet cultural references and traditions"
  },
];

interface ResourceLibraryProps {
  language: "en" | "vi";
}

export function ResourceLibrary({ language }: ResourceLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const translations = {
    search: {
      en: "Search resources...",
      vi: "Tìm kiếm tài nguyên..."
    },
    category: {
      en: "Category",
      vi: "Danh Mục"
    },
    allCategories: {
      en: "All Categories",
      vi: "Tất Cả Danh Mục"
    },
    speaking: {
      en: "Speaking",
      vi: "Nói"
    },
    grammar: {
      en: "Grammar",
      vi: "Ngữ Pháp"
    },
    pronunciation: {
      en: "Pronunciation",
      vi: "Phát Âm"
    },
    vocabulary: {
      en: "Vocabulary",
      vi: "Từ Vựng"
    },
    download: {
      en: "Download",
      vi: "Tải Xuống"
    },
    downloads: {
      en: "downloads",
      vi: "lượt tải"
    },
    uploadedBy: {
      en: "Uploaded by",
      vi: "Được tải lên bởi"
    },
    culturalNote: {
      en: "Cultural Note",
      vi: "Lưu Ý Văn Hóa"
    },
    resourcesFound: {
      en: "resources found",
      vi: "tài nguyên được tìm thấy"
    },
  };
  
  // Filter resources based on search query and category filter
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.title_vi && resource.title_vi.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "" || resource.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Function to render appropriate icon based on file type
  const renderFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'video':
        return <FileVideo className="h-5 w-5 text-blue-500" />;
      case 'pdf':
      default:
        return <FileText className="h-5 w-5 text-red-500" />;
    }
  };

  // Render star ratings
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={translations.search[language]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select 
          value={categoryFilter} 
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={translations.category[language]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{translations.allCategories[language]}</SelectItem>
            <SelectItem value="Speaking">{translations.speaking[language]}</SelectItem>
            <SelectItem value="Grammar">{translations.grammar[language]}</SelectItem>
            <SelectItem value="Pronunciation">{translations.pronunciation[language]}</SelectItem>
            <SelectItem value="Vocabulary">{translations.vocabulary[language]}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredResources.length} {translations.resourcesFound[language]}
      </p>

      {/* Resources list */}
      <div className="grid gap-4 md:grid-cols-2">
        {isLoading ? (
          // Loading skeletons
          [...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual resources
          filteredResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {language === "en" ? resource.title : resource.title_vi}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">
                        {resource.category}
                      </Badge>
                      {renderStarRating(resource.rating)}
                    </CardDescription>
                  </div>
                  <div>
                    {renderFileIcon(resource.file_type)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-sm text-muted-foreground mb-2">
                  {translations.uploadedBy[language]}: {resource.uploaded_by}
                </div>
                {resource.cultural_note && (
                  <div className="text-sm border-l-2 border-amber-500 pl-2 mb-3 italic">
                    <span className="font-medium">{translations.culturalNote[language]}:</span> {resource.cultural_note}
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {resource.downloads} {translations.downloads[language]}
                  </span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    {translations.download[language]}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
