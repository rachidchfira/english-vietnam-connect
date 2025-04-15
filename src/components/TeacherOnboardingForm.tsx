import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with validation
const formSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  passport_number: z.string().length(9, { message: "Passport number must be exactly 9 characters" }),
  visa_type: z.enum(["Work", "Student", "Other"]),
  visa_expiry: z.string().refine((date) => {
    const today = new Date();
    const expiryDate = new Date(date);
    return expiryDate > today;
  }, { message: "Visa expiry date must be in the future" }),
  qualifications: z.string().min(10, { message: "Please provide more details about your qualifications" }),
  cert_file: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function TeacherOnboardingForm() {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const { toast } = useToast();
  
  // Form setup with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      passport_number: "",
      visa_type: "Work",
      visa_expiry: "",
      qualifications: "",
    },
  });

  // Form submission handler connected to Supabase
  const onSubmit = async (values: FormValues) => {
    try {
      // Insert the new teacher into the teachers table
      const { data, error } = await supabase
        .from('teachers')
        .insert([{
          name: values.full_name,
          email: values.email,
          passport_number: values.passport_number,
          visa_type: values.visa_type,
          visa_expiry: values.visa_expiry,
          qualifications: values.qualifications,
          // We'll handle file upload separately in a real implementation
        }])
        .select();
      
      if (error) {
        console.error("Form submission error:", error);
        toast({
          title: language === 'en' ? "Error" : "Lỗi",
          description: language === 'en' ? 
            "There was a problem adding the teacher." : 
            "Có vấn đề khi thêm giáo viên.",
          variant: "destructive"
        });
      } else {
        toast({
          title: language === 'en' ? "Success" : "Thành công",
          description: language === 'en' ? 
            "Teacher successfully added to the system!" : 
            "Đã thêm giáo viên vào hệ thống thành công!",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: language === 'en' ? "Error" : "Lỗi",
        description: language === 'en' ? 
          "An unexpected error occurred." : 
          "Đã xảy ra lỗi không mong muốn.",
        variant: "destructive"
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  const translations = {
    en: {
      title: "Teacher Onboarding Form",
      description: "Please complete all required fields to register as a teacher",
      fullName: "Full Name",
      email: "Email Address",
      passportNumber: "Passport Number",
      visaType: "Visa Type",
      visaOptions: {
        work: "Work",
        student: "Student",
        other: "Other"
      },
      visaExpiry: "Visa Expiry Date",
      qualifications: "Qualifications",
      qualificationsPlaceholder: "Please provide details about your teaching experience, education, and relevant qualifications...",
      certFile: "TEFL/CELTA Certificate",
      certFileInstruction: "Upload your certificate (PDF format preferred)",
      submit: "Submit Application",
      switchToVietnamese: "Switch to Vietnamese",
      switchToEnglish: "Switch to English"
    },
    vi: {
      title: "Biểu mẫu đăng ký giáo viên",
      description: "Vui lòng điền đầy đủ thông tin để đăng ký làm giáo viên",
      fullName: "Họ và tên",
      email: "Địa chỉ email",
      passportNumber: "Số hộ chiếu",
      visaType: "Loại visa",
      visaOptions: {
        work: "Làm việc",
        student: "Học sinh",
        other: "Loại khác"
      },
      visaExpiry: "Ngày hết hạn visa",
      qualifications: "Trình độ chuyên môn",
      qualificationsPlaceholder: "Vui lòng cung cấp thông tin về kinh nghiệm giảng dạy, học vấn và trình độ liên quan khác...",
      certFile: "Chứng chỉ TEFL/CELTA",
      certFileInstruction: "Tải lên chứng chỉ của bạn (định dạng PDF được ưu tiên)",
      submit: "Gửi đơn đăng ký",
      switchToVietnamese: "Chuyển sang tiếng Việt",
      switchToEnglish: "Chuyển sang tiếng Anh"
    }
  };

  const t = language === 'en' ? translations.en : translations.vi;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <Button variant="outline" onClick={toggleLanguage}>
          <Globe className="mr-2 h-4 w-4" />
          {language === 'en' ? t.switchToVietnamese : t.switchToEnglish}
        </Button>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.fullName}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.email}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.smith@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passport_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.passportNumber}</FormLabel>
                    <FormControl>
                      <Input maxLength={9} placeholder="A1234567B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visa_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.visaType}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visa type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Work">{t.visaOptions.work}</SelectItem>
                        <SelectItem value="Student">{t.visaOptions.student}</SelectItem>
                        <SelectItem value="Other">{t.visaOptions.other}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visa_expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.visaExpiry}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cert_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.certFile}</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".pdf,.jpg,.png,.doc,.docx" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }} 
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">{t.certFileInstruction}</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.qualifications}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t.qualificationsPlaceholder}
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full md:w-auto">
              {t.submit}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
