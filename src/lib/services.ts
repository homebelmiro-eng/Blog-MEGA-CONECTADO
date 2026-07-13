import { collection, doc, getDocs, getDoc, addDoc, updateDoc, increment, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { getDb } from './firebase';
import { Article } from '../types';

const ARTICLES_COLLECTION = 'articles';

export const articleService = {
  // Fetch all published articles
  async getAllArticles(): Promise<Article[]> {
    const db = getDb();
    const q = query(collection(db, ARTICLES_COLLECTION), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
  },

  // Fetch article by ID or Slug
  async getArticleById(id: string): Promise<Article | null> {
    const db = getDb();
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Article;
    }
    return null;
  },

  // Fetch article by Slug
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const db = getDb();
    const q = query(collection(db, ARTICLES_COLLECTION), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Article;
    }
    return null;
  },

  // Fetch related articles
  async getRelatedArticles(category: string, excludeId: string, limitCount: number = 3): Promise<Article[]> {
    const db = getDb();
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('category', '==', category),
      orderBy('date', 'desc'),
      limit(limitCount + 1) // Fetch one extra in case excludeId is in the results
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
    
    return results.filter(a => a.id !== excludeId).slice(0, limitCount);
  },

  // Track article view
  async trackView(id: string) {
    const db = getDb();
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    await updateDoc(docRef, {
      views: increment(1)
    });
  },

  // Add new article (admin functionality)
  async addArticle(article: Omit<Article, 'id'>) {
    const db = getDb();
    const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
      ...article,
      date: Timestamp.now(),
      views: 0
    });
    return docRef.id;
  }
};
