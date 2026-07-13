import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { collection, query, orderBy, limit, onSnapshot, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getDb } from '../lib/firebase';
import { Article } from '../types';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Eye, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isMigrating, setIsMigrating] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    categories: 0
  });
  const barChartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const db = getDb();
    
    // Stats Fetching
    const fetchStats = async () => {
      const articlesSnap = await getDocs(collection(db, 'articles'));
      const categoriesSnap = await getDocs(collection(db, 'categories'));
      
      const allArticles = articlesSnap.docs.map(d => d.data() as Article);
      setStats({
        total: allArticles.length,
        published: allArticles.filter(a => a.status === 'published').length,
        drafts: allArticles.filter(a => a.status === 'draft').length,
        categories: categoriesSnap.size || 4 // Fallback if none created yet
      });
    };

    fetchStats();

    // Top Articles for Chart
    const q = query(collection(db, 'articles'), orderBy('views', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];
      setArticles(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (articles.length === 0 || !barChartRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 140 };
    const width = barChartRef.current.parentElement?.clientWidth || 800;
    const chartWidth = width - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(barChartRef.current).selectAll("*").remove();

    const svg = d3.select(barChartRef.current)
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(articles, (d: Article) => d.views || 0) || 100])
      .range([0, chartWidth]);

    const y = d3.scaleBand()
      .range([0, height])
      .domain(articles.map((d: Article) => d.title.substring(0, 18) + "..."))
      .padding(0.3);

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
      .selectAll("text")
      .attr("class", "text-slate-400 font-medium text-[10px] uppercase tracking-wider");

    svg.selectAll("rect")
      .data(articles)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d: Article) => y(d.title.substring(0, 18) + "...") || 0)
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .attr("fill", "#0284c7")
      .attr("rx", 4)
      .transition()
      .duration(1000)
      .attr("width", (d: Article) => x(d.views || 0));

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr("class", "text-slate-300 text-[10px]");

  }, [articles]);

  const statCards = [
    { label: 'Total de Artigos', value: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Publicados', value: stats.published, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Rascunhos', value: stats.drafts, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Categorias', value: stats.categories, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const handleMigrateSlugs = async () => {
    if (!window.confirm('Deseja gerar slugs para todos os artigos que ainda não possuem?')) return;
    
    setIsMigrating(true);
    const db = getDb();
    try {
      const articlesSnap = await getDocs(collection(db, 'articles'));
      let count = 0;
      
      for (const articleDoc of articlesSnap.docs) {
        const data = articleDoc.data() as Article;
        if (!data.slug) {
          const generatedSlug = data.title
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s-]+/g, '-')
            .replace(/^-+|-+$/g, '');
            
          await updateDoc(doc(db, 'articles', articleDoc.id), {
            slug: generatedSlug
          });
          count++;
        }
      }
      toast.success(`${count} artigos migrados com sucesso!`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao migrar artigos.');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-3xl text-brand-primary tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500">Visão geral do portal Mega Conectado</p>
        </div>
        <button
          onClick={handleMigrateSlugs}
          disabled={isMigrating}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs transition-all disabled:opacity-50"
        >
          {isMigrating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-brand-secondary" />
          )}
          Migrar Slugs (SEO)
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{stat.label}</p>
              <p className="text-2xl font-extrabold text-brand-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart className="w-6 h-6 text-brand-secondary" />
              <h3 className="font-heading font-bold text-xl text-brand-primary">Artigos Mais Vistos</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempo Real</span>
            </div>
          </div>
          <div className="w-full">
            <svg ref={barChartRef} className="w-full"></svg>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-brand-primary p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">Últimos Artigos</h3>
              <Link to="/admin/artigos" className="text-brand-secondary text-xs font-bold hover:underline">Ver todos</Link>
            </div>
            <div className="space-y-4">
              {articles.slice(0, 4).map((article) => (
                <div key={article.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                    <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{article.title}</p>
                    <p className="text-[10px] text-white/40">{article.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-secondary transition-colors" />
                </div>
              ))}
              {articles.length === 0 && (
                <p className="text-center text-white/40 text-sm py-4">Nenhum artigo publicado ainda.</p>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-heading font-bold text-brand-primary mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-secondary" />
              Ações Rápidas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/artigos/novo" className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-brand-secondary/10 hover:text-brand-primary transition-all">
                <FileText className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Novo Post</span>
              </Link>
              <Link to="/admin/midia" className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-brand-secondary/10 hover:text-brand-primary transition-all">
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Mídia</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
