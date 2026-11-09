import React, { useState, useEffect } from 'react';
import { HeartHandshake, Lock, Globe, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface PedidoOracaoData {
  id?: number;
  name: string;
  whatsapp: string;
  category: string;
  request_text: string;
  is_confidential: boolean;
  created_at?: string;
}

export const CATEGORIAS_ORACAO = [
  'Saúde & Cura',
  'Família & Lar',
  'Vida Financeira',
  'Causas na Justiça',
  'Libertação & Proteção',
  'Restauração Espiritual',
  'Outros Motivos'
];

export const PedidosOracao: React.FC = () => {
  const [prayers, setPrayers] = useState<PedidoOracaoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(CATEGORIAS_ORACAO[0]);
  const [requestText, setRequestText] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. FUNÇÃO QUE CARREGA OS PEDIDOS DO BANCO SQL
  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pedidos_oracao')
        .select('*')
        .eq('manter_confidencial', false) // Só mostra o que NÃO for confidencial
        .order('criado_em', { ascending: false });

      if (error) throw error;

      if (data) {
        // Mapeia os nomes das colunas do banco para o seu estado do React
        const mappedPrayers = data.map((p: any) => ({
          id: p.id,
          name: p.nome,
          whatsapp: p.whatsapp,
          category: p.motivo,
          request_text: p.pedido,
          is_confidential: p.manter_confidencial,
          created_at: p.criado_em
        }));
        setPrayers(mappedPrayers);
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  // 2. FUNÇÃO QUE SALVA O NOVO PEDIDO NO BANCO SQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    try {
      setSubmitting(true);
      
      const { error } = await supabase
        .from('pedidos_oracao')
        .insert([
          {
            nome: name.trim() || 'Anônimo',
            whatsapp: phone.trim(),
            motivo: category,
            pedido: requestText.trim(),
            manter_confidencial: isConfidential
          }
        ]);

      if (error) throw error;

      setSuccessMessage('Pedido de oração enviado com sucesso! Estaremos orando por você.');
      
      // Limpa o formulário
      setName('');
      phone && setPhone('');
      setRequestText('');
      setIsConfidential(false);

      // Atualiza a lista na tela
      fetchPrayers();

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Houve um erro ao enviar seu pedido. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-slate-800">
          <HeartHandshake className="text-rose-500" /> Pedidos de Oração
        </h1>
        <p className="text-slate-600 mt-2">Levemos as nossas petições diante de Deus em comunidade</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulário de Envio */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Deixe seu Pedido</h2>
          
          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 size={18} /> {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Seu Nome (Opcional)</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Deixe em branco para enviar como Anônimo"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">WhatsApp (Opcional)</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Motivo do Pedido</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {CATEGORIAS_ORACAO.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Seu Pedido de Oração</label>
              <textarea 
                rows={4}
                value={requestText} 
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="Escreva aqui o seu motivo de oração de forma detalhada..."
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <input 
                type="checkbox" 
                id="confidential"
                checked={isConfidential}
                onChange={(e) => setIsConfidential(e.target.checked)}
                className="mt-1 rounded text-rose-500 focus:ring-rose-500"
              />
              <label htmlFor="confidential" className="text-xs text-slate-600 cursor-pointer">
                <span className="font-semibold text-slate-700 flex items-center gap-1 mb-0.5">
                  <Lock size={12} /> Pedido Confidencial
                </span>
                Marque esta caixa se deseja que seu pedido seja visto <strong>apenas pelos pastores</strong> e não apareça no mural público do site.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium p-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-rose-400"
            >
              <Send size={16} /> {submitting ? 'Enviando...' : 'Enviar Pedido de Oração'}
            </button>
          </form>
        </div>

        {/* Mural Público de Pedidos */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-2">
            <Globe size={20} className="text-emerald-500" /> Mural de Oração da Família Tenda
          </h2>

          {loading ? (
            <p className="text-slate-500 text-center py-8">Carregando pedidos de oração...</p>
          ) : prayers.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Nenhum pedido público no momento. Seja o primeiro a colocar sua família em oração!</p>
          ) : (
            <div className="space-y-4">
              {prayers.map((prayer) => (
                <div key={prayer.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-800 text-sm">{prayer.name}</span>
                    <span className="bg-rose-50 text-rose-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-rose-100">
                      {prayer.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm whitespace-pre-line bg-slate-50/50 p-2.5 rounded-md border border-slate-100/50">
                    "{prayer.request_text}"
                  </p>
                  <div className="text-[10px] text-slate-400 mt-2 text-right">
                    {prayer.created_at ? new Date(prayer.created_at).toLocaleDateString('pt-BR') : ''}
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
