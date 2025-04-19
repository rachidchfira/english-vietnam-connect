import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const teacherSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  passport_number: z.string().min(5, { message: "Passport number is required." }),
  visa_type: z.string().min(1, { message: "Visa type is required." }),
  visa_expiry: z.string().min(1, { message: "Visa expiry date is required." }),
  qualifications: z.string().min(2, { message: "Qualifications are required." }),
  specialty: z.string().optional(),
  location: z.string().optional(),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export function TeacherOnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { session } = useAuth();

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      email: "",
      passport_number: "",
      visa_type: "",
      visa_expiry: "",
      qualifications: "",
      specialty: "",
      location: "",
    },
  });

  async function onSubmit(formData: TeacherFormValues) {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to complete this form",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('teachers').insert({
        name: formData.name,
        email: formData.email,
        passport_number: formData.passport_number,
        visa_type: formData.visa_type,
        visa_expiry: formData.visa_expiry,
        qualifications: formData.qualifications,
        user_id: session?.user?.id // Add the required user_id field
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your teacher profile has been created",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create teacher profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Teacher Registration</CardTitle>
        <CardDescription>Complete your teacher profile to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input placeholder="A12345678" {...field} />
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
                    <FormLabel>Visa Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Work Visa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visa_expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualifications</FormLabel>
                    <FormControl>
                      <Input placeholder="TEFL, Bachelor's in Education" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Early Childhood Education" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ho Chi Minh City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
