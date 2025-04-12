
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, FileDown, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResourceLibraryProps {
  language: "en" | "vi";
}

export function ResourceLibrary({ language }: ResourceLibraryProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    resourceLibrary: {
      en: "Resource Library",
      vi: "Thư Viện Tài Nguyên"
    },
    searchResources: {
      en: "Search resources...",
      vi: "Tìm kiếm tài nguyên..."
    },
    category: {
      en: "Category",
      vi: "Danh Mục"
    },
    all: {
      en: "All Resources",
      vi: "Tất Cả Tài Nguyên"
    },
    grammar: {
      en: "Grammar",
      vi: "Ngữ Pháp"
    },
    speaking: {
      en: "Speaking",
      vi: "Nói"
    },
    listening: {
      en: "Listening",
      vi: "Nghe"
    },
    reading: {
      en: "Reading",
      vi: "Đọc"
    },
    writing: {
      en: "Writing",
      vi: "Viết"
    },
    pronunciation: {
      en: "Pronunciation",
      vi: "Phát Âm"
    },
    vocabulary: {
      en: "Vocabulary",
      vi: "Từ Vựng"
    },
    downloadAll: {
      en: "Download All",
      vi: "Tải Xuống Tất Cả"
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={translations.searchResources[language]}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder={translations.category[language]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.all[language]}</SelectItem>
            <SelectItem value="grammar">{translations.grammar[language]}</SelectItem>
            <SelectItem value="speaking">{translations.speaking[language]}</SelectItem>
            <SelectItem value="listening">{translations.listening[language]}</SelectItem>
            <SelectItem value="reading">{translations.reading[language]}</SelectItem>
            <SelectItem value="writing">{translations.writing[language]}</SelectItem>
            <SelectItem value="pronunciation">{translations.pronunciation[language]}</SelectItem>
            <SelectItem value="vocabulary">{translations.vocabulary[language]}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> {translations.downloadAll[language]}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{translations.resourceLibrary[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Resource items would go here */}
            <ResourceCard 
              title="IELTS Speaking Practice" 
              category="speaking" 
              language={language} 
            />
            <ResourceCard 
              title="Grammar Essentials" 
              category="grammar" 
              language={language} 
            />
            <ResourceCard 
              title="Pronunciation Guide" 
              category="pronunciation" 
              language={language} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ResourceCardProps {
  title: string;
  category: string;
  language: "en" | "vi";
}

function ResourceCard({ title, category, language }: ResourceCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="font-medium">{title}</h3>
        </div>
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
      <div className="mt-auto pt-4">
        <Button variant="outline" size="sm" className="w-full">
          <FileDown className="h-4 w-4 mr-2" />
          {language === "en" ? "Download" : "Tải xuống"}
        </Button>
      </div>
    </div>
  );
}
