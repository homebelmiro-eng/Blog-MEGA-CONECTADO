import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Save, 
  Send, 
  Plus,
  ArrowLeft, 
  Sparkles, 
  Image as ImageIcon, 
  Eye, 
  Settings as SettingsIcon,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { doc, getDoc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getDb } from '../lib/firebase';
import { uploadImage } from '../lib/storage';
import { geminiService } from '../lib/gemini';
import toast from 'react-hot-toast';

const articleSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  slug: z.string().min(3, 'Slug é obrigatório'),
  category: z.string().min(1, 'Selecione uma categoria'),
  excerpt: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
  content: z.string().min(20, 'Conteúdo muito curto'),
  status: z.enum(['draft', 'published', 'scheduled']),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
  // Novos campos
  locationName: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  geoEnabled: z.boolean().default(false),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);
  const [loading, setLoading] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<{question: string, answer: string}[]>([]);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      excerpt: '',
      content: '',
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
      imageUrl: '',
      tags: '',
      locationName: '',
      geoEnabled: false
    }
  });

  const title = watch('title');
  const content = watch('content');

  useEffect(() => {
    if (id && id !== 'novo') {
      loadArticle(id);
    }
  }, [id]);

  useEffect(() => {
    if (title && !id) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', slug);
    }
  }, [title, setValue, id]);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const url = await uploadImage(file, 'articles_content');
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', url);
          }
        } catch (error) {
          toast.error('Erro ao carregar imagem no conteúdo');
        }
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const loadArticle = async (articleId: string) => {
    setLoading(true);
    try {
      const db = getDb();
      const docRef = doc(db, 'articles', articleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'seo') {
            setValue('metaTitle', value.title);
            setValue('metaDescription', value.description);
          } else if (key === 'tags') {
            setValue('tags', (value as string[]).join(', '));
          } else if (key === 'faq') {
            setFaqs(value as any[]);
          } else {
            setValue(key as keyof ArticleFormValues, value);
          }
        });
        if (data.imageUrl) setPreviewImage(data.imageUrl);
      }
    } catch (error) {
      toast.error('Erro ao carregar artigo');
    } finally {
      setLoading(false);
    }
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file, 'articles');
        setValue('imageUrl', url);
        setPreviewImage(url);
        toast.success('Imagem carregada com sucesso');
      } catch (error) {
        toast.error('Erro ao fazer upload da imagem');
      }
    }
  };

  const handleGeminiImprove = async () => {
    if (!content) return toast.error('Escreva algo primeiro');
    setIsAiProcessing(true);
    try {
      const improved = await geminiService.improveText(content);
      setValue('content', improved);
      toast.success('Texto aprimorado pela IA!');
    } catch (error) {
      toast.error('Erro ao processar com IA');
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleGeminiSEO = async () => {
    if (!title || !content) return toast.error('Título e conteúdo são necessários');
    setIsAiProcessing(true);
    try {
      const seo = await geminiService.generateSEO(title, content);
      if (seo) {
        setValue('metaTitle', seo.metaTitle);
        setValue('metaDescription', seo.metaDescription);
        toast.success('SEO gerado pela IA!');
      }
    } catch (error) {
      toast.error('Erro ao gerar SEO');
    } finally {
      setIsAiProcessing(false);
    }
  };

  const onSubmit = async (data: ArticleFormValues) => {
    setLoading(true);
    try {
      const db = getDb();
      const articleData = {
        ...data,
        faq: faqs.filter(f => f.question && f.answer),
        tags: data.tags?.split(',').map(t => t.trim()) || [],
        seo: {
          title: data.metaTitle || data.title,
          description: data.metaDescription || data.excerpt,
          keywords: data.tags?.split(',').map(t => t.trim()) || []
        },
        date: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      if (id && id !== 'novo') {
        await setDoc(doc(db, 'articles', id), articleData, { merge: true });
        toast.success('Artigo atualizado!');
      } else {
        await addDoc(collection(db, 'articles'), { ...articleData, views: 0 });
        toast.success('Artigo criado!');
      }
      navigate('/admin/artigos');
    } catch (error) {
      toast.error('Erro ao salvar artigo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/admin/artigos')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-brand-primary">
                {id === 'novo' ? 'Novo Artigo' : 'Editar Artigo'}
              </h1>
              <p className="text-sm text-slate-500">Crie e otimize seu conteúdo com inteligência artificial</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setValue('status', 'draft')}
              className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                watch('status') === 'draft' ? 'bg-slate-100 border-slate-300 text-brand-primary' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              Rascunho
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-brand-primary text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {id === 'novo' ? 'Publicar Artigo' : 'Salvar Alterações'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Título do Artigo</label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input 
                      {...field}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-brand-secondary outline-none transition-all text-lg font-bold"
                      placeholder="Ex: O Futuro da Psicanálise na Era Digital"
                    />
                  )}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Slug (URL)</label>
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <input 
                      {...field}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-brand-secondary outline-none transition-all text-sm font-mono"
                    />
                  )}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-slate-700">Conteúdo</label>
                <button
                  type="button"
                  onClick={handleGeminiImprove}
                  disabled={isAiProcessing}
                  className="flex items-center gap-2 text-xs font-bold text-brand-secondary bg-brand-secondary/10 px-3 py-1.5 rounded-full hover:bg-brand-secondary hover:text-white transition-all disabled:opacity-50"
                >
                  {isAiProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Melhorar com IA
                </button>
              </div>
              <Controller
                name="content"
                control={control}
                render={({ field }) => {
                  const Quill = ReactQuill as any;
                  return (
                    <div className="prose-editor">
                      <Quill 
                        ref={quillRef}
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        className="h-[500px] mb-12"
                      />
                    </div>
                  );
                }}
              />
              {errors.content && <p className="text-red-500 text-xs mt-1 font-medium">{errors.content.message}</p>}
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-secondary" />
                  Otimização SEO
                </h3>
                <button
                  type="button"
                  onClick={handleGeminiSEO}
                  disabled={isAiProcessing}
                  className="text-xs font-bold text-brand-secondary hover:underline disabled:opacity-50"
                >
                  Auto-gerar SEO
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Meta Title</label>
                  <Controller
                    name="metaTitle"
                    control={control}
                    render={({ field }) => (
                      <input {...field} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Palavras-chave</label>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <input {...field} placeholder="IA, Psicanálise, Futuro" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    )}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Meta Description</label>
                  <Controller
                    name="metaDescription"
                    control={control}
                    render={({ field }) => (
                      <textarea {...field} rows={3} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none" />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-secondary" />
                  Perguntas Frequentes (FAQ)
                </h3>
                <button
                  type="button"
                  onClick={addFaq}
                  className="flex items-center gap-1 text-xs font-bold text-brand-secondary hover:bg-brand-secondary/10 px-2 py-1 rounded transition-all"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar Pergunta
                </button>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group">
                    <button 
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                    <div className="space-y-3">
                      <input 
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        placeholder="Pergunta"
                        className="w-full bg-transparent border-b border-slate-200 py-1 text-sm font-bold focus:border-brand-secondary outline-none"
                      />
                      <textarea 
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        placeholder="Resposta"
                        rows={2}
                        className="w-full bg-transparent text-xs text-slate-600 focus:border-brand-secondary outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
                {faqs.length === 0 && (
                  <p className="text-center py-4 text-xs text-slate-400 italic">Nenhuma pergunta adicionada.</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                Configurações GEO (SEO Local)
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Controller
                    name="geoEnabled"
                    control={control}
                    render={({ field }) => (
                      <input 
                        type="checkbox" 
                        id="geoEnabled"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-secondary focus:ring-brand-secondary"
                      />
                    )}
                  />
                  <label htmlFor="geoEnabled" className="text-sm font-bold text-slate-700">Habilitar Geolocalização para este artigo</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nome do Local</label>
                    <Controller
                      name="locationName"
                      control={control}
                      render={({ field }) => (
                        <input {...field} placeholder="Ex: São Paulo, Brasil" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Latitude</label>
                    <Controller
                      name="latitude"
                      control={control}
                      render={({ field }) => (
                        <input 
                          type="number" 
                          step="any"
                          value={field.value || ''}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Longitude</label>
                    <Controller
                      name="longitude"
                      control={control}
                      render={({ field }) => (
                        <input 
                          type="number" 
                          step="any"
                          value={field.value || ''}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-brand-secondary" />
                Imagem de Destaque
              </h3>
              
              <div className="space-y-3">
                <div 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="aspect-video w-full bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden group"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Plus className="w-8 h-8 text-slate-300 group-hover:text-brand-secondary mb-2" />
                      <span className="text-xs font-bold text-slate-400 group-hover:text-brand-primary">Carregar Arquivo</span>
                    </>
                  )}
                  <input 
                    id="image-upload"
                    type="file" 
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ou cole a URL da imagem</label>
                  <Controller
                    name="imageUrl"
                    control={control}
                    render={({ field }) => (
                      <input 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPreviewImage(e.target.value);
                        }}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" 
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <SettingsIcon className="w-4 h-4 text-brand-secondary" />
                Classificação
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Categoria</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold">
                      <option value="">Selecione...</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Psicanálise">Psicanálise</option>
                      <option value="Ciência">Ciência</option>
                      <option value="Comportamento">Comportamento</option>
                    </select>
                  )}
                />
                {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Resumo Curto</label>
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field }) => (
                    <textarea {...field} rows={4} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none" placeholder="Breve introdução do artigo..." />
                  )}
                />
                {errors.excerpt && <p className="text-red-500 text-xs mt-1 font-medium">{errors.excerpt.message}</p>}
              </div>
            </div>

            <div className="bg-brand-primary p-6 rounded-xl shadow-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-secondary rounded-lg flex items-center justify-center font-bold text-brand-primary">MC</div>
                <span className="font-bold">Status da Publicação</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <span className="font-bold text-brand-secondary uppercase text-[10px] tracking-widest">{watch('status')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Visibilidade:</span>
                  <span className="font-bold">Público</span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] text-white/40 leading-relaxed italic">
                    Dica: Use a inteligência artificial para otimizar o tempo de revisão e aumentar o alcance do seu artigo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
