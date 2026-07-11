import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopNews from './components/TopNews';
import ArticleList from './components/ArticleList';
import Sidebar from './components/Sidebar';
import AdSpace from './components/AdSpace';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      
      {/* Top Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AdSpace format="leaderboard" className="mb-8" />
        
        <Hero />
        <TopNews />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <main className="lg:col-span-8">
            <ArticleList />
          </main>
          <aside className="lg:col-span-4">
            <Sidebar />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
