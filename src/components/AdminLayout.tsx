import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FileText, label: 'Artigos', path: '/admin/artigos' },
    { icon: Layers, label: 'Categorias', path: '/admin/categorias' },
    { icon: Users, label: 'Autores', path: '/admin/autores' },
    { icon: ImageIcon, label: 'Mídia', path: '/admin/midia' },
    { icon: Settings, label: 'Configurações', path: '/admin/configuracoes' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-brand-primary text-white flex flex-col fixed h-full z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-brand-secondary rounded flex items-center justify-center font-bold text-brand-primary">MC</div>
                <span className="font-heading font-bold text-xl tracking-tight">Admin<span className="text-brand-secondary">MC</span></span>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-brand-secondary text-brand-primary font-bold shadow-lg shadow-brand-secondary/20' 
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-primary' : 'group-hover:text-brand-secondary transition-colors'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-red-500/10 hover:text-red-400 w-full transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair do Painel</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-brand-secondary rounded-lg text-sm w-64 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/admin/artigos/novo" 
              className="hidden sm:flex items-center gap-2 bg-brand-secondary text-brand-primary px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-brand-secondary/20"
            >
              <Plus className="w-4 h-4" />
              Novo Artigo
            </Link>
            
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-brand-primary leading-none">{profile?.displayName || 'Usuário Admin'}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">{profile?.role || 'Administrador'}</p>
              </div>
              <img 
                src={profile?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-slate-100 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
