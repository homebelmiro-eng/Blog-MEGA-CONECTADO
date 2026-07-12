export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author?: string;
  excerpt?: string;
  imageUrl: string;
  imageAlt: string;
  faq?: FAQItem[];
}
