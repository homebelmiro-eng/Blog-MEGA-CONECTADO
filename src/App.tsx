import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './lib/AuthContext';

// Pages
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './pages/Category';
import Page from './pages/Page';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import AdminDashboard from './pages/AdminDashboard';
import AdminArticleList from './pages/AdminArticleList';
import AdminArticleEditor from './pages/AdminArticleEditor';
import AdminLogin from './pages/AdminLogin';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ProgressBar from './components/ProgressBar';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLayout from './components/AdminLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user || !profile || profile.role === 'reader') {
    return <Navigate to="/admin/login" />;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
          <ErrorBoundary>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/artigos" element={<ProtectedRoute><AdminArticleList /></ProtectedRoute>} />
              <Route path="/admin/artigos/:id" element={<ProtectedRoute><AdminArticleEditor /></ProtectedRoute>} />
              <Route path="/admin/categorias" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/autores" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/midia" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/configuracoes" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

              {/* Public Routes */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/artigo/:slugOrId" element={<MainLayout><Article /></MainLayout>} />
              <Route path="/pagina/:slug" element={<MainLayout><Page /></MainLayout>} />
              <Route path="/categoria/:slug" element={<MainLayout><Category /></MainLayout>} />
              <Route path="/contato" element={<MainLayout><Contact /></MainLayout>} />
              <Route path="/sitemap" element={<MainLayout><Sitemap /></MainLayout>} />
              <Route path="/:slug" element={<MainLayout><Category /></MainLayout>} />
            </Routes>
          </ErrorBoundary>
          <CookieConsent />
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
