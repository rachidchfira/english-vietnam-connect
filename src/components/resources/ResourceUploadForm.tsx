import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, FileUp, Upload } from "lucide-react";

interface ResourceUploadFormProps {
  language: "en" | "vi";
}

export function ResourceUploadForm({ language }: ResourceUploadFormProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const translations = {
    formTitle: {
      en: "Upload New Resource",
      vi: "Tải Lên Tài Nguyên Mới"
    },
    titleEn: {
      en: "Title (English)",
      vi: "Tiêu Đề (Tiếng Anh)"
    },
    titleVi: {
      en: "Title (Vietnamese)",
      vi: "Tiêu Đề (Tiếng Việt)"
    },
    category: {
      en: "Category",
      vi: "Danh Mục"
    },
    description: {
      en: "Description (English)",
      vi: "Mô Tả (Tiếng Anh)"
    },
    descriptionVi: {
      en: "Description (Vietnamese)",
      vi: "Mô Tả (Tiếng Việt)"
    },
    culturalNote: {
      en: "Cultural Note (Optional)",
      vi: "Lưu Ý Văn Hóa (Tùy Chọn)"
    },
    fileUpload: {
      en: "File Upload",
      vi: "Tải Lên Tập Tin"
    },
    dragDropText: {
      en: "Drag and drop your file here, or click to select",
      vi: "Kéo và thả tập tin vào đây, hoặc nhấp để chọn"
    },
    fileSelected: {
      en: "File selected",
      vi: "Đã chọn tập tin"
    },
    maxSize: {
      en: "Max file size: 10MB",
      vi: "Kích thước tối đa: 10MB"
    },
    supportedFormats: {
      en: "Supported formats: PDF, DOCX, PPT, MP3, MP4",
      vi: "Định dạng hỗ trợ: PDF, DOCX, PPT, MP3, MP4"
    },
    uploadButton: {
      en: "Upload Resource",
      vi: "Tải Lên Tài Nguyên"
    },
    uploading: {
      en: "Uploading...",
      vi: "Đang Tải Lên..."
    },
    uploadSuccess: {
      en: "Resource uploaded successfully!",
      vi: "Tải lên tài nguyên thành công!"
    },
    grammarOption: {
      en: "Grammar",
      vi: "Ngữ Pháp"
    },
    speakingOption: {
      en: "Speaking",
      vi: "Nói"
    },
    listeningOption: {
      en: "Listening",
      vi: "Nghe"
    },
    readingOption: {
      en: "Reading",
      vi: "Đọc"
    },
    writingOption: {
      en: "Writing", 
      vi: "Viết"
    },
    pronunciationOption: {
      en: "Pronunciation",
      vi: "Phát Âm"
    },
    vocabularyOption: {
      en: "Vocabulary",
      vi: "Từ Vựng"
    },
    offlineModeAlert: {
      en: "You appear to be offline. Your upload will be saved locally and submitted when you're back online.",
      vi: "Bạn dường như đang ngoại tuyến. Tải lên của bạn sẽ được lưu cục bộ và gửi khi bạn trở lại trực tuyến."
    }
  };

  // Define the form schema with Zod
  const formSchema = z.object({
    titleEn: z.string().min(1, {
      message: language === "en" ? "Title is required" : "Bắt buộc phải có tiêu đề"
    }),
    titleVi: z.string().optional(),
    category: z.string().min(1, {
      message: language === "en" ? "Please select a category" : "Vui lòng chọn danh mục"
    }),
    descriptionEn: z.string().min(10, {
      message: language === "en" ? "Description must be at least 10 characters" : "Mô tả phải có ít nhất 10 ký tự"
    }),
    descriptionVi: z.string().optional(),
    culturalNote: z.string().optional()
  });

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleEn: "",
      titleVi: "",
      category: "",
      descriptionEn: "",
      descriptionVi: "",
      culturalNote: ""
    },
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!selectedFile) {
      toast({
        title: language === "en" ? "Error" : "Lỗi",
        description: language === "en" ? "Please select a file to upload" : "Vui lòng chọn tập tin để tải lên",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would upload to Supabase
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: language === "en" ? "Success" : "Thành công",
        description: translations.uploadSuccess[language],
      });
      
      // Reset form
      form.reset();
      setSelectedFile(null);
      
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Lỗi",
        description: language === "en" 
          ? "There was a problem uploading your resource" 
          : "Có vấn đề khi tải lên tài nguyên của bạn",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate offline status for demo
  const [isOffline] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">{translations.formTitle[language]}</h2>
      
      {isOffline && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Offline Mode</AlertTitle>
          <AlertDescription>
            {translations.offlineModeAlert[language]}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.titleEn[language]} *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleVi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.titleVi[language]}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.category[language]} *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.category[language]} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Grammar">{translations.grammarOption[language]}</SelectItem>
                    <SelectItem value="Speaking">{translations.speakingOption[language]}</SelectItem>
                    <SelectItem value="Listening">{translations.listeningOption[language]}</SelectItem>
                    <SelectItem value="Reading">{translations.readingOption[language]}</SelectItem>
                    <SelectItem value="Writing">{translations.writingOption[language]}</SelectItem>
                    <SelectItem value="Pronunciation">{translations.pronunciationOption[language]}</SelectItem>
                    <SelectItem value="Vocabulary">{translations.vocabularyOption[language]}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="descriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.description[language]} *</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionVi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.descriptionVi[language]}</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="culturalNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.culturalNote[language]}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  {language === "en" 
                    ? "Include any specific cultural context that might be helpful for other teachers." 
                    : "Bao gồm bất kỳ bối cảnh văn hóa cụ thể nào có thể hữu ích cho các giáo viên khác."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>{translations.fileUpload[language]} *</FormLabel>
            <div 
              className={`
                border-2 border-dashed rounded-md p-6 text-center cursor-pointer
                ${selectedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400'}
              `}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <FileUp className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm font-medium">{translations.fileSelected[language]}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm">{translations.dragDropText[language]}</p>
                  <p className="text-xs text-muted-foreground mt-1">{translations.maxSize[language]}</p>
                  <p className="text-xs text-muted-foreground">{translations.supportedFormats[language]}</p>
                </div>
              )}
              <Input 
                id="file-upload" 
                type="file" 
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp3,.mp4"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? translations.uploading[language] : translations.uploadButton[language]}
          </Button>
        </form>
      </Form>
    </div>
  );
}
