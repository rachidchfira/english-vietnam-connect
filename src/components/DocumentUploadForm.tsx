
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  docType: z.string({
    required_error: "Please select a document type",
  }),
  docNumber: z.string().min(3, {
    message: "Document number must be at least 3 characters",
  }),
  expiryDate: z.date({
    required_error: "Please select an expiry date",
  }).refine(date => date > new Date(), {
    message: "Expiry date must be in the future",
  }),
  file: z.instanceof(File, {
    message: "Please upload a document file",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function DocumentUploadForm({ onComplete }: { onComplete: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docType: "",
      docNumber: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileSelected(file);
      form.setValue("file", file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsUploading(true);
    
    // Simulate upload delay (will be replaced with Supabase integration later)
    try {
      console.log("Form data to submit:", data);
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Document uploaded successfully",
        description: "Your document has been securely stored.",
      });
      
      onComplete();
    } catch (error) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your document.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="docType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="work_permit">Work Permit</SelectItem>
                    <SelectItem value="business_visa">Business Visa</SelectItem>
                    <SelectItem value="tourist_visa">Tourist Visa</SelectItem>
                    <SelectItem value="residence_card">Residence Card</SelectItem>
                    <SelectItem value="tefl_certificate">TEFL Certificate</SelectItem>
                    <SelectItem value="background_check">Background Check</SelectItem>
                    <SelectItem value="academic_credentials">Academic Credentials</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of document you are uploading
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="docNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter document ID/number" {...field} />
                </FormControl>
                <FormDescription>
                  The unique number or ID on your document
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                When this document expires (must be a future date)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Document File</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  {fileSelected ? (
                    <p className="text-sm">{fileSelected.name}</p>
                  ) : (
                    <p className="text-muted-foreground">
                      Click to browse or drop a file here
                    </p>
                  )}
                  <Input 
                    type="file" 
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange} 
                    accept=".pdf,.jpg,.jpeg,.png" 
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Upload your document (PDF, JPG, PNG formats only, max 10MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
