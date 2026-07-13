import { Timestamp } from 'firebase/firestore';

export function formatDate(date: any): string {
  if (!date) return '';

  // Handle Firestore Timestamp
  if (date instanceof Timestamp) {
    return date.toDate().toLocaleDateString('pt-BR');
  }

  // Handle object with seconds and nanoseconds (raw Firestore Timestamp)
  if (typeof date === 'object' && 'seconds' in date) {
    try {
      const ts = new Timestamp(date.seconds, date.nanoseconds);
      return ts.toDate().toLocaleDateString('pt-BR');
    } catch (e) {
      console.error('Error parsing timestamp object:', e);
      return 'Recent';
    }
  }

  // Handle Date object
  if (date instanceof Date) {
    return date.toLocaleDateString('pt-BR');
  }

  // Handle string or number
  if (typeof date === 'string' || typeof date === 'number') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return date.toString();
    return d.toLocaleDateString('pt-BR');
  }

  return 'Recent';
}

export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
