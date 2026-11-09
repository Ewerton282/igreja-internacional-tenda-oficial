import React, { useState, useEffect } from 'react';
import { MessageSquare, User, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface TestemunhoData {
  id?: number;
  name: string;
  bairro_cidade: string;
  motivo_bencao: string;
  titulo: string;
  historia: string;
  aprovado?: boolean;
  created_at?: string;
}

export const CATEGORIAS_TESTEMUNHO = [
  'Cura & Milagre',
  'Restauração Familiar',
  'Porta de Emprego / Financeiro',
  'Libertação',
  'Crescimento Espiritual',
  'Outro Livramento'
];

export const Testemunhos: React.FC = () => {
  const [testimonies, setTestimonies] = useState<TestemunhoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(CATEGORIAS_TESTEMUNHO[0]);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. CARREGAR TESTEMUNHOS APROVADOS DO BANCO SQL
  const fetchTestimonies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testemunhos')
        .select('*')
        .eq('aprovado', true) // Só mostra o que você já aprovou no Supabase!
        .order('criado_em', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedData = data.map((t: any) => ({
          id: t.id,
          name: t.nome,
          bairro_cidade: t.bairro_cidade,
          motivo_bencao: t.motivo_bencao,
          titulo: t.titulo,
          historia: t.historia,
          created_at: t.criado_em
        }));
        setTestimonies(mappedData);
      }
    } catch (error) {
      console.error('Erro ao carregar testemunhos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  // 2. SALVAR O NOVO TESTEMUNHO NO BANCO SQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !story.trim()) return;

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('testemunhos')
        .insert([
          {
            nome: name.trim(),
            bairro_cidade: location.trim(),
            motivo_bencao: category,
            titulo: title.trim(),
            historia: story.trim(),
            aprovado: false // Começa como falso para passar pela sua aprovação
          }
        ]);

      if (error) throw error;

      setSuccessMessage('Testemunho enviado com sucesso! Ele será publicado após a moderação.');
      
      // Limpa os campos
      setName('');
      setLocation('');
      setCategory(CATEGORIAS_TESTEMUNHO[0]);
      setTitle('');
      setStory('');

      setTimeout(() => setSuccessMessage(''), 6000);
    } catch (error) {
      console.error('Erro ao enviar testemunho:', error);
      alert('Houve um erro ao enviar seu testemunho. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-slate-800">
          <MessageSquare className="text-amber-500" /> Testemunhos de Fé
        </h1>
        <p className="text-slate-600 mt-2">Grandes coisas fez o Senhor por nós, e por isso estamos alegres! (Salmos 126:3)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-1">
            <Sparkles size={18} className="text-amber-500" /> Conte a sua Bênção
          </h2>

          {successMessage && (
            <div className="mb-4 p-3 bg-amber-50 text-amber-800 rounded-lg flex items-center gap-2 border border-amber-200 text-sm">
              <CheckCircle2 size={18} className="text-amber-600" /> {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Seu Nome</label>
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Irmão João"
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Bairro / Cidade</label>
                <input 
                  type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: São Miguel - SP"
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Área da Bênção</label>
              <select 
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {CATEGORIAS_TESTEMUNHO.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Título do Testemunho</label>
              <input 
                type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Deus abriu uma porta onde não tinha parede!"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Relato Completo</label>
              <textarea 
                rows={5} required value={story} onChange={(e) => setStory(e.target.value)}
                placeholder="Escreva detalhadamente o que o Senhor fez na sua vida..."
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button 
              type="submit" disabled={submitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium p-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-amber-300"
            >
              <Send size={16} /> {submitting ? 'Enviando...' : 'Publicar Testemunho'}
            </button>
          </form>
        </div>

        {/* Mural de Testemunhos */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Mural de Glórias</h2>

          {loading ? (
            <p className="text-slate-500 text-center py-8">Carregando testemunhos...</p>
          ) : testimonies.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Os testemunhos enviados aparecerão aqui assim que forem aprovados pela liderança. Seja o primeiro a edificar a igreja!</p>
          ) : (
            <div className="space-y-4">
              {testimonies.map((test) => (
                <div key={test.id} className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
                  <span className="bg-amber-50 text-amber-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-100 mb-2 inline-block">
                    {test.motivo_bencao}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base mb-1">{test.titulo}</h3>
                  <p className="text-slate-600 text-sm whitespace-pre-line bg-slate-50/50 p-3 rounded-md border border-slate-100/50 mb-3">
                    "{test.historia}"
                  </p>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-50 pt-2">
                    <span className="flex items-center gap-1 font-medium text-slate-500"><User size={12} /> {test.name}</span>
                    {test.bairro_cidade && <span className="flex items-center gap-1"><MapPin size={12} /> {test.bairro_cidade}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
