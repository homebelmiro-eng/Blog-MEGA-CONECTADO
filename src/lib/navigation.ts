import { Article } from '../types';

export function getArticleUrl(article: Article): string {
  const identifier = article.slug || article.id;
  return `/artigo/${identifier}`;
}
