import React from 'react';
import Hero from '../components/Hero';
import TrendingAINews from '../components/TrendingAINews';
import TopNews from '../components/TopNews';
import ArticleList from '../components/ArticleList';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import ErrorBoundary from '../components/ErrorBoundary';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO />
      <AdSpace format="leaderboard" className="mb-8" />
      
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TrendingAINews />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TopNews />
      </ErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        <main className="lg:col-span-8">
          <ErrorBoundary>
            <ArticleList />
          </ErrorBoundary>
        </main>
        <aside className="lg:col-span-4">
          <ErrorBoundary>
            <Sidebar />
          </ErrorBoundary>
        </aside>
      </div>
    </div>
  );
}
