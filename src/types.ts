export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewData {
  productName: string;
  originalPrice?: number;
  currentPrice: number;
  discountPercentage?: number;
  pros: string[];
  cons: string[];
  affiliateLink: string;
  storeName: string;
  couponCode?: string;
  telegramLink?: string;
  whatsappLink?: string;
}

export interface Article {
  id: string;
  title: string;
  slug?: string;
  category: string;
  date: any;
  author?: string;
  excerpt?: string;
  imageUrl: string;
  imageAlt: string;
  faq?: FAQItem[];
  views?: number;
  content?: string;
  status?: 'draft' | 'published' | 'scheduled';
  tags?: string[];
  // SEO & GEO Fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  geoEnabled?: boolean;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  // Review specific data
  isReview?: boolean;
  reviewData?: ReviewData;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  slug: string;
  category: string;
  createdAt?: any;
}
