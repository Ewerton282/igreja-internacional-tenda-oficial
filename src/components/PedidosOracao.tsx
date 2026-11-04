import React, { useState, useEffect } from 'react';
import { HeartHandshake, Lock, Globe, Send, CheckCircle2, MessageCircle, Clock, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { CHURCH_INFO, CATEGORIAS_ORACAO, PedidoOracaoItem } from '../data/churchData';

const PRAYERS_STORAGE_KEY = 'tenda_visitor_prayers_v2';
const PRAYED_IDS_KEY = 'tenda_prayed_items_v2';

export const PedidosOracao: React.FC = () => {
  const [prayers, setPrayers] = useState<PedidoOracaoItem[]>([]);
  const [prayedIds, setPrayedIds] = useState<string[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todos');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(CATEGORIAS_ORACAO[0]);
  const [text, setText] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [sendWhatsAppDirect, setSendWhatsAppDirect] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Load from localStorage (without mock/sample messages)
  useEffect(() => {
    try {
      // Clear legacy sample keys if any exist in the browser
      try {
        localStorage.removeItem('tenda_visitor_prayers_v1');
        localStorage.removeItem('tenda_prayed_items_v1');
      } catch {
        // ignore
      }

      const storedPrayers = localStorage.getItem(PRAYERS_STORAGE_KEY);
      if (storedPrayers) {
        const parsed = JSON.parse(storedPrayers);
        // Ensure no lingering sample items appear
        const userPrayers = Array.isArray(parsed)
          ? parsed.filter((p: PedidoOracaoItem) => !p.id?.startsWith('prayer-sample-'))
          : [];
        setPrayers(userPrayers);
      } else {
        setPrayers([]);
      }

      const storedPrayedIds = localStorage.getItem(PRAYED_IDS_KEY);
      if (storedPrayedIds) {
        setPrayedIds(JSON.parse(storedPrayedIds));
      }
    } catch {
      setPrayers([]);
    }
  }, []);

  const handlePrayClick = (prayerId: string) => {
    if (prayedIds.includes(prayerId)) return;

    const newPrayed = [...prayedIds, prayerId];
    setPrayedIds(newPrayed);
    try {
      localStorage.setItem(PRAYED_IDS_KEY, JSON.stringify(newPrayed));
    } catch {
      // ignore
    }

    const updated = prayers.map((p) =>
      p.id === prayerId ? { ...p, prayCount: p.prayCount + 1 } : p
    );
    setPrayers(updated);
    try {
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newPrayer: PedidoOracaoItem = {
      id: `prayer-${Date.now()}`,
      name: name.trim() || 'Irmão(ã) em Oração',
      category: category,
      text: text.trim(),
      date: 'Hoje',
      isConfidential: isConfidential,
      prayCount: 1,
    };

    const updated = [newPrayer, ...prayers];
    setPrayers(updated);
    try {
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Automatically mark the user as praying for their own request
    const newPrayed = [...prayedIds, newPrayer.id];
    setPrayedIds(newPrayed);
    try {
      localStorage.setItem(PRAYED_IDS_KEY, JSON.stringify(newPrayed));
    } catch {
      // ignore
    }

    if (sendWhatsAppDirect) {
      const privacyMsg = isConfidential
        ? '(Pedido Confidencial para a Pastoral)'
        : '(Pedido para Intercessão)';
      const msg = encodeURIComponent(
        `*Pedido de Oração - Igreja Internacional Tenda*\n${privacyMsg}\n\n*Nome:* ${newPrayer.name}\n${phone ? `*WhatsApp:* ${phone}\n` : ''}*Motivo:* ${newPrayer.category}\n\n*Clamor:* ${newPrayer.text}`
      );
      window.open(`https://wa.me/5511959705669?text=${msg}`, '_blank');
    }

    // Reset Form
    setName('');
    setPhone('');
    setText('');
    setIsConfidential(false);
    setSendWhatsAppDirect(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 6000);
  };

  // Filter public prayers for the wall
  const publicPrayers = prayers.filter((p) => !p.isConfidential);
  const filteredWallPrayers =
    activeCategoryFilter === 'todos'
      ? publicPrayers
      : publicPrayers.filter((p) => p.category === activeCategoryFilter);

  return (
    <section id="oracao" className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E1D7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-2">
              ALTAR DE CLAMOR & INTERCESSÃO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight">
              Pedidos de Oração
            </h2>
          </div>
          <div className="max-w-lg text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica." — Filipenses 4:6
          </div>
        </div>

        {/* 2-Column Layout: Form on Left, Prayer Wall on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Prayer Request Form */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E5DDD3] p-6 sm:p-8 rounded-xs shadow-xs sticky top-28">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0EAE1]">
                <div className="w-10 h-10 rounded-full bg-[#BD5A2C]/10 text-[#BD5A2C] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900">
                    Apresentar seu Pedido
                  </h3>
                  <p className="text-xs text-stone-500">
                    Nossa equipe e pastores oram por cada clamor.
                  </p>
                </div>
              </div>

              {submittedSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs flex items-start gap-3 text-xs leading-relaxed animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pedido recebido com reverência!</strong> Oramos para que o Senhor toque a sua vida e lhe dê a vitória.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    Seu Nome (ou Deixe em Branco para Sigilo)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Maria de Lourdes ou 'Em Oração'"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    WhatsApp (Opcional - Para Palavra Pastoral)
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    Motivo da Oração
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                  >
                    {CATEGORIAS_ORACAO.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    Descreva seu Pedido de Oração
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Descreva sua necessidade diante de Deus. Toda súplica com fé move o coração do Pai..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors resize-none"
                    required
                  />
                </div>

                {/* Privacy Toggle */}
                <div className="pt-2 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 p-2.5 bg-[#FAF7F2] rounded-xs border border-[#E8E1D7]">
                    <input
                      type="checkbox"
                      checked={isConfidential}
                      onChange={(e) => setIsConfidential(e.target.checked)}
                      className="mt-0.5 rounded border-[#D9CFC2] text-[#B85526] focus:ring-[#B85526]"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-stone-500" />
                        Manter confidencial apenas com os pastores
                      </span>
                      <span className="text-[11px] text-stone-500 leading-normal">
                        Se marcado, o pedido não será publicado no mural público do site.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 px-1">
                    <input
                      type="checkbox"
                      checked={sendWhatsAppDirect}
                      onChange={(e) => setSendWhatsAppDirect(e.target.checked)}
                      className="mt-0.5 rounded border-[#D9CFC2] text-[#B85526] focus:ring-[#B85526]"
                    />
                    <span>
                      Enviar também diretamente pelo WhatsApp da igreja ({CHURCH_INFO.whatsapp})
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#B85526] hover:bg-[#A0451C] text-white text-sm font-medium rounded-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  Enviar Pedido de Oração
                </button>

                <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
                  <ShieldCheck className="w-4 h-4 text-stone-400" />
                  <span>Respeito pastoral, discrição e acolhimento garantidos.</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Public Prayer Wall & Pastoral Notice */}
          <div className="lg:col-span-7 space-y-6">
            {/* Urgent Pastoral Callout Card */}
            <div className="p-6 bg-[#F4EDE4] border border-[#E2D7CB] rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#BD5A2C]/10 text-[#BD5A2C] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900">
                    Culto de Oração Semanal
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    Toda <strong>Sexta-feira das 19h às 20h</strong> nos reunimos presencialmente no templo para interceder por todos os pedidos entregues na Tenda.
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/5511959705669?text=${encodeURIComponent('Paz do Senhor, preciso de oração e suporte pastoral urgente.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-stone-50 border border-[#D9CFC2] text-stone-800 text-xs font-medium rounded-xs transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shadow-2xs shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Oração Urgente no WhatsApp
              </a>
            </div>

            {/* Prayer Wall Title and Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#BD5A2C]" />
                  Mural de Intercessão
                </h3>
                <p className="text-xs text-stone-600 font-light">
                  Una sua fé à destes irmãos clicando em <strong>"Estou Orando"</strong>.
                </p>
              </div>

              {/* Segmented Filter */}
              <div className="flex items-center gap-1 bg-[#EFEAE2] p-1 rounded-xs overflow-x-auto max-w-full">
                <button
                  onClick={() => setActiveCategoryFilter('todos')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'todos'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('Saúde & Cura')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'Saúde & Cura'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Saúde
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('Família & Casamento')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'Família & Casamento'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Família
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('Portas de Emprego & Finanças')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === 'Portas de Emprego & Finanças'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Emprego
                </button>
              </div>
            </div>

            {/* List of Prayer Cards */}
            <div className="space-y-4">
              {filteredWallPrayers.length === 0 ? (
                <div className="p-8 sm:p-12 text-center bg-white border border-[#E8E1D7] rounded-xs shadow-2xs">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF7F2] border border-[#E8E1D7] flex items-center justify-center text-[#BD5A2C]">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-medium text-stone-900 mb-1">
                    Nenhum pedido público no mural no momento
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Você pode apresentar o seu motivo de oração preenchendo o formulário ao lado. Se preferir sigilo, marque a opção confidencial para que apenas os pastores leiam.
                  </p>
                </div>
              ) : (
                filteredWallPrayers.map((p) => {
                  const hasPrayed = prayedIds.includes(p.id);

                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-[#E5DDD3] p-5 sm:p-6 rounded-xs shadow-2xs hover:border-[#BD5A2C]/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Unboxed clean metadata kicker with separators */}
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-3 pb-2.5 border-b border-[#F7F2EC]">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#BD5A2C]">
                              {p.category}
                            </span>
                            <span aria-hidden="true" className="text-stone-300">·</span>
                            <span>{p.city || 'São Paulo'}</span>
                          </div>
                          <span className="font-mono text-[11px] text-stone-400">
                            {p.date}
                          </span>
                        </div>

                        <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-normal mb-5">
                          "{p.text}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#F7F2EC]">
                        <div className="flex items-center gap-2 text-xs text-stone-600">
                          <span className="font-medium font-serif text-stone-900">
                            {p.name}
                          </span>
                        </div>

                        <button
                          onClick={() => handlePrayClick(p.id)}
                          disabled={hasPrayed}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xs transition-all cursor-pointer ${
                            hasPrayed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#D9CFC2] text-stone-800 active:scale-95'
                          }`}
                        >
                          {hasPrayed ? (
                            <>
                              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Você orou por este pedido ({p.prayCount})</span>
                            </>
                          ) : (
                            <>
                              <HeartHandshake className="w-3.5 h-3.5 text-[#BD5A2C]" />
                              <span>Estou Orando ({p.prayCount})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
