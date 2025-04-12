
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Globe } from "lucide-react";
import { ResourceLibrary } from "@/components/resources/ResourceLibrary";
import { CollaborationForum } from "@/components/resources/CollaborationForum";
import { ResourceUploadForm } from "@/components/resources/ResourceUploadForm";

export default function Resources() {
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [activeTab, setActiveTab] = useState("library");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "vi" : "en");
  };

  const translations = {
    title: {
      en: "Educational Resources",
      vi: "Tài Nguyên Giáo Dục"
    },
    subtitle: {
      en: "Access lesson plans, worksheets, and collaborate with other teachers",
      vi: "Truy cập giáo án, tài liệu và hợp tác với giáo viên khác"
    },
    library: {
      en: "Resource Library",
      vi: "Thư Viện Tài Nguyên"
    },
    forum: {
      en: "Collaboration Forum",
      vi: "Diễn Đàn Hợp Tác"
    },
    upload: {
      en: "Upload Resource",
      vi: "Tải Lên Tài Nguyên"
    },
    newResource: {
      en: "New Resource",
      vi: "Tài Nguyên Mới"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translations.title[language]}</h1>
          <p className="text-muted-foreground">
            {translations.subtitle[language]}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
            <Globe className="h-4 w-4" />
            {language === "en" ? "Tiếng Việt" : "English"}
          </Button>
          <Button onClick={() => setActiveTab("upload")}>
            <Plus className="mr-2 h-4 w-4" /> {translations.newResource[language]}
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="library">{translations.library[language]}</TabsTrigger>
          <TabsTrigger value="forum">{translations.forum[language]}</TabsTrigger>
          <TabsTrigger value="upload">{translations.upload[language]}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="space-y-4">
          <ResourceLibrary language={language} />
        </TabsContent>
        
        <TabsContent value="forum" className="space-y-4">
          <CollaborationForum language={language} />
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <ResourceUploadForm language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
