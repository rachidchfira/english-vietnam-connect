
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage} 
      className={className}
    >
      <Globe className="h-4 w-4 mr-2" />
      {language === 'en' ? 'Vietnamese' : 'English'}
    </Button>
  );
}
