import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: 'pdf' | 'image' | 'ai' | 'finance' | 'date' | 'security';
  isPro?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  slug: string;
}

export interface SalaryDetails {
  gross: number;
  tax: number;
  insurance: number;
  net: number;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
}
