import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import Category from './pages/Category';
import Article from './pages/Article';
import Page from './pages/Page';
import Contact from './pages/Contact';

import CookieConsent from './components/CookieConsent';
import ProgressBar from './components/ProgressBar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
        <ProgressBar />
        <Navbar />
        
        <div className="flex-grow">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artigo/:id" element={<Article />} />
              <Route path="/pagina/:slug" element={<Page />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/:slug" element={<Category />} />
            </Routes>
          </ErrorBoundary>
        </div>

        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}
