import React, { useState, useEffect } from 'react';
import { Quote, MessageSquarePlus, Send, CheckCircle2, Heart, Sparkles, X } from 'lucide-react';
import { CHURCH_INFO, Testemunho } from '../data/churchData';

const LOCAL_STORAGE_KEY = 'tenda_visitor_testimonies_v1';

export const Testemunhos: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testemunho[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('Restauração Familiar');
  const [highlight, setHighlight] = useState('');
  const [text, setText] = useState('');
  const [shareOnWhatsApp, setShareOnWhatsApp] = useState(false);

  // Load testimonies from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTestimonies(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlight.trim() || !text.trim()) return;

    const newTestimony: Testemunho = {
      id: `testimony-${Date.now()}`,
      name: name.trim() || 'Visitante da Tenda',
      city: city.trim() || 'São Paulo - SP',
      category: category || 'Bênção & Milagre',
      highlight: highlight.trim(),
      text: text.trim(),
      date: 'Publicado recentemente',
    };

    const updated = [newTestimony, ...testimonies];
    setTestimonies(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (shareOnWhatsApp) {
      const msg = encodeURIComponent(
        `*Novo Testemunho para a Igreja Internacional Tenda*\n\n*Nome:* ${newTestimony.name} (${newTestimony.city})\n*Categoria:* ${newTestimony.category}\n*Resumo:* "${newTestimony.highlight}"\n\n*Relato:* ${newTestimony.text}`
      );
      window.open(`https://wa.me/5511959705669?text=${msg}`, '_blank');
    }

    // Reset form
    setName('');
    setCity('');
    setHighlight('');
    setText('');
    setShareOnWhatsApp(false);
    setIsModalOpen(false);

    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 5000);
  };

  return (
    <section id="testemunhos" className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E1D7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-2">
              HISTÓRIAS DE FÉ & TRANSFORMAÇÃO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight">
              Testemunhos dos Visitantes
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm sm:text-base text-stone-700 max-w-md leading-relaxed font-normal">
              Um espaço aberto para você contar o que Deus tem operado na sua vida e na sua família através da Tenda.
            </p>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#B85526] hover:bg-[#A0451C] text-white text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Compartilhar Meu Testemunho
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccessToast && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Glória a Deus!</strong> Seu testemunho foi compartilhado com sucesso e já está disponível para abençoar outros visitantes.
              </span>
            </div>
            <button
              onClick={() => setIsSuccessToast(false)}
              className="text-emerald-700 hover:text-emerald-900 text-xs ml-4 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Content State: Empty vs Submitted List */}
        {testimonies.length === 0 ? (
          <div className="bg-white border border-[#E8E1D7] p-8 sm:p-14 rounded-xs text-center max-w-3xl mx-auto shadow-xs">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#FAF7F2] border border-[#E8E1D7] text-[#B85526] flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 mb-3 font-medium">
              Seja o primeiro a compartilhar seu testemunho
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto font-light">
              Nenhum relato foi cadastrado ainda. Se você recebeu uma cura, uma porta aberta, paz no coração ou foi acolhido na Tenda, conte para a igreja e inspire outras vidas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-6 py-3 bg-[#B85526] hover:bg-[#A0451C] text-white text-sm font-medium rounded-xs transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Escrever Meu Testemunho Agora
              </button>
              <a
                href={CHURCH_INFO.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#D9CFC2] text-stone-800 text-sm font-medium rounded-xs transition-colors cursor-pointer text-center"
              >
                Falar com a Pastoral
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonies.map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-[#E5DDD3] p-7 rounded-xs shadow-xs hover:border-[#BD5A2C]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Unboxed clean metadata kicker */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-4 pb-3 border-b border-[#F5EFEB]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#BD5A2C] font-semibold">{t.category || 'Testemunho'}</span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-stone-500">{t.city || 'São Paulo'}</span>
                      </div>
                      <Quote className="w-5 h-5 text-stone-300" />
                    </div>

                    <h4 className="font-serif text-lg text-stone-900 mb-3 font-medium leading-snug">
                      "{t.highlight}"
                    </h4>

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light whitespace-pre-line mb-6">
                      {t.text}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5EFEB] flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900 font-serif">
                      {t.name}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px]">
                      {t.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action bar */}
            <div className="p-6 bg-white border border-[#E8E1D7] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-stone-700">
                Mostrando <strong>{testimonies.length}</strong> {testimonies.length === 1 ? 'relato compartilhado' : 'relatos compartilhados'} por irmãos e visitantes.
              </span>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F0EAE1] border border-[#D9CFC2] text-stone-800 text-xs sm:text-sm font-medium rounded-xs transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#B85526]" />
                Adicionar Outro Testemunho
              </button>
            </div>
          </div>
        )}

        {/* Modal: Share Testimony Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
            <div className="bg-white border border-[#E8E1D7] rounded-xs shadow-2xl max-w-xl w-full p-6 sm:p-8 my-8 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1">
                  EDIFIQUE A IGREJA
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-medium">
                  Compartilhe seu Testemunho
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
                  Seu relato ficará visível nesta página para todos os visitantes que buscam fortalecimento em Deus.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                      Seu Nome ou Como Quer Ser Chamado
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Maria Santos ou 'Anônimo'"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                      Bairro ou Cidade
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: São Miguel Paulista - SP"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    Área da Bênção / Motivo
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                  >
                    <option value="Restauração Familiar">Restauração Familiar & Casamento</option>
                    <option value="Cura & Milagre">Cura Divina & Saúde</option>
                    <option value="Emprego & Finanças">Porta de Emprego & Provisão</option>
                    <option value="Libertação & Paz">Libertação Espiritual & Paz na Alma</option>
                    <option value="Acolhimento na Tenda">Acolhimento & Comunhão na Igreja</option>
                    <option value="Célula & Juventude">Frutos na Célula / Juventude</option>
                    <option value="Outro">Outra Bênção Recebida</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    Título / Frase de Destaque
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Deus restaurou a saúde do meu filho após o culto de oração"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                    Conte a sua história com detalhes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Descreva como você chegou, o que Deus fez e como isso transformou você ou sua casa..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
                    <input
                      type="checkbox"
                      checked={shareOnWhatsApp}
                      onChange={(e) => setShareOnWhatsApp(e.target.checked)}
                      className="mt-0.5 rounded border-[#D9CFC2] text-[#B85526] focus:ring-[#B85526]"
                    />
                    <span>
                      Também enviar uma cópia deste testemunho pelo WhatsApp da igreja para a liderança pastoral.
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F0EAE1]">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 text-xs sm:text-sm text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#B85526] hover:bg-[#A0451C] text-white text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Publicar Testemunho
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
