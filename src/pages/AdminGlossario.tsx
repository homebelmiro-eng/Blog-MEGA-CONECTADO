import React, { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { getDb, handleFirestoreError, OperationType } from '../lib/firebase';
import { GlossaryTerm } from '../types';
import { generateSlug } from '../lib/utils';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  X, 
  Save, 
  AlertCircle,
  FolderPlus,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminGlossario() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [termName, setTermName] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchTerms = async () => {
    const db = getDb();
    const q = query(collection(db, 'glossary'), orderBy('term', 'asc'));
    try {
      setLoading(true);
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GlossaryTerm[];
      setTerms(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'glossary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const openAddModal = () => {
    setEditingTerm(null);
    setTermName('');
    setDefinition('');
    setCategory('');
    setIsModalOpen(true);
  };

  const openEditModal = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setTermName(term.term);
    setDefinition(term.definition);
    setCategory(term.category || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termName.trim() || !definition.trim()) {
      toast.error('O termo e a definição são obrigatórios.');
      return;
    }

    setIsSaving(true);
    const db = getDb();
    const slug = generateSlug(termName);
    const docId = editingTerm ? editingTerm.id : slug;

    try {
      const payload = {
        term: termName.trim(),
        definition: definition.trim(),
        slug: slug,
        category: category.trim(),
        updatedAt: serverTimestamp()
      };

      if (editingTerm) {
        // Edit existing
        await updateDoc(doc(db, 'glossary', docId), payload);
        toast.success('Termo atualizado com sucesso!');
      } else {
        // Create new
        const docRef = doc(db, 'glossary', docId);
        await setDoc(docRef, {
          ...payload,
          createdAt: serverTimestamp()
        });
        toast.success('Novo termo criado no glossário!');
      }

      setIsModalOpen(false);
      fetchTerms();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar o termo.');
      handleFirestoreError(error, editingTerm ? OperationType.UPDATE : OperationType.CREATE, `glossary/${docId}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (term: GlossaryTerm) => {
    if (!window.confirm(`Tem certeza de que deseja excluir o termo "${term.term}"?`)) {
      return;
    }

    const db = getDb();
    try {
      await deleteDoc(doc(db, 'glossary', term.id));
      toast.success('Termo excluído com sucesso!');
      fetchTerms();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir o termo.');
      handleFirestoreError(error, OperationType.DELETE, `glossary/${term.id}`);
    }
  };

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl text-brand-primary tracking-tight">Glossário de Termos</h1>
          <p className="text-sm text-slate-500">Gerencie as definições técnicas e links automáticos nos artigos</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-secondary text-brand-primary rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-brand-secondary/10 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Novo Termo
        </button>
      </header>

      {/* Info notice about autolinking */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-bold mb-1">Como funcionam os links automáticos?</p>
          <p>Sempre que qualquer termo cadastrado no glossário for mencionado exatamente no corpo de um artigo (como "Inteligência Artificial"), o sistema criará automaticamente um link interno ligando essa palavra diretamente à página do Glossário.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Pesquisar termo, definição ou categoria..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-brand-secondary mx-auto mb-3" />
            <p className="text-sm text-slate-500">Buscando definições...</p>
          </div>
        ) : filteredTerms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Termo</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Categoria</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Definição</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTerms.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{t.term}</div>
                      <div className="text-[10px] text-slate-400 font-mono">#{t.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      {t.category ? (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                          {t.category}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Sem categoria</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-500 text-sm max-w-xl truncate" title={t.definition}>
                        {t.definition}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(t)}
                          className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-all"
                          title="Editar Termo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(t)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Excluir Termo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-lg text-brand-primary mb-1">Nenhum termo cadastrado</h3>
            <p className="text-sm text-slate-400">Adicione novos termos técnicos para criar o glossário</p>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <header className="px-6 py-5 bg-brand-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-secondary" />
                <h3 className="font-heading font-bold text-lg">
                  {editingTerm ? 'Editar Termo do Glossário' : 'Novo Termo no Glossário'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-all p-1.5 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Termo / Sigla *
                </label>
                <input 
                  type="text" 
                  value={termName}
                  onChange={(e) => setTermName(e.target.value)}
                  placeholder="Ex: Inteligência Artificial ou LLM"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-secondary rounded-xl outline-none text-sm transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Categoria / Assunto
                </label>
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ex: Machine Learning, IA Básica, Marketing Digital"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-secondary rounded-xl outline-none text-sm transition-all"
                />
              </div>

              {/* Definition */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Definição / Explicação *
                </label>
                <textarea 
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  placeholder="Escreva uma definição clara e acessível do termo..."
                  className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-secondary rounded-xl outline-none text-sm resize-none transition-all"
                  required
                />
              </div>

              {/* Footer Buttons inside modal form */}
              <footer className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white hover:text-brand-primary rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-md shadow-brand-primary/10"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingTerm ? 'Atualizar' : 'Salvar Termo'}
                </button>
              </footer>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
