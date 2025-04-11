
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentUploadForm } from "@/components/DocumentUploadForm";

interface DocumentUploadDialogProps {
  onComplete: () => void;
}

export function DocumentUploadDialog({ onComplete }: DocumentUploadDialogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Compliance Documents</CardTitle>
        <CardDescription>
          Submit your visa, work permit, or other compliance documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentUploadForm onComplete={onComplete} />
      </CardContent>
    </Card>
  );
}
