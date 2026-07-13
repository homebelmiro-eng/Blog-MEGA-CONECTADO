import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, LogIn, Sparkles, AlertCircle, RefreshCw, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLogin() {
  const { user, profile, signInWithGoogle, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in and has a role beyond reader, redirect to dashboard
    if (!authLoading && user && profile && profile.role !== 'reader') {
      navigate('/admin');
    }
  }, [user, profile, authLoading, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Login failed:', err);
      if (err.message?.includes('api-keys-are-not-supported-by-this-api')) {
        setError('Erro de configuração de API. Por favor, atualize a página (F5) para tentar novamente.');
      } else {
        setError(err.message || 'Erro ao realizar login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0284c7,transparent)] opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center font-bold text-3xl text-brand-primary mx-auto mb-6 shadow-xl shadow-brand-secondary/20">
            MC
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-brand-primary tracking-tight mb-2">Painel de Controle</h1>
          <p className="text-slate-500 font-medium italic">Mega Conectado Portal</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {user && profile?.role === 'reader' && (
          <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-3 text-amber-700 font-bold">
              <Lock className="w-5 h-5 shrink-0" />
              <span>Acesso Restrito</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Você está logado como <strong className="text-amber-900">{user.email}</strong>, mas esta conta não possui permissões administrativas.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-600 font-bold uppercase tracking-wider mt-2">
              <RefreshCw className="w-3 h-3" />
              Tente trocar de conta
            </div>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-slate-50 border-2 border-slate-100 hover:border-brand-secondary py-4 rounded-2xl font-bold text-slate-700 transition-all group disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin text-brand-secondary" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Entrar com Google</span>
            </>
          )}
        </button>

        {error && (
          <button 
            onClick={() => window.location.reload()}
            className="w-full mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-brand-secondary transition-colors"
          >
            Atualizar Página (F5)
          </button>
        )}

        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-300">Segurança Avançada</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="mt-8 flex justify-center gap-6 text-slate-400">
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-brand-secondary" />
            <span className="text-[9px] font-bold uppercase">IA Ready</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <LogIn className="w-4 h-4 text-brand-secondary" />
            <span className="text-[9px] font-bold uppercase">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <User className="w-4 h-4 text-brand-secondary" />
            <span className="text-[9px] font-bold uppercase">Admin</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
