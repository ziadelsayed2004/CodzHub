export interface ContactRequest {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
  referenceLink?: string;
  locale: string;
  createdAt?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
