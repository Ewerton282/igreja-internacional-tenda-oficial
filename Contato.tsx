import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Instagram, Youtube, Facebook, Send, Check, Copy } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: 'Dúvidas Gerais',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CHURCH_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-2">
            FALE CONOSCO
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight mb-4">
            Canais de Contato & Redes Sociais
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Estamos prontos para te ouvir, orar com você ou tirar qualquer dúvida sobre a nossa igreja,
            células e cultos na Av. Nordestina.
          </p>
        </div>

        {/* 4 Cards Grid: WhatsApp, Email, Instagram, YouTube */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {/* Card 1: WhatsApp */}
          <div className="bg-[#F2ECE4] border border-[#E4DBD0] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xs bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1">
                WHATSAPP
              </span>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-1">
                {CHURCH_INFO.whatsapp}
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Atendimento rápido para dúvidas e pedidos de oração.
              </p>
            </div>
            <a
              href={CHURCH_INFO.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-center text-xs font-medium text-white bg-[#128C7E] hover:bg-[#0E7064] rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Card 2: E-mail */}
          <div className="bg-[#F2ECE4] border border-[#E4DBD0] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xs bg-[#BD5A2C]/15 text-[#BD5A2C] flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1">
                E-MAIL OFICIAL
              </span>
              <h3 className="text-sm font-semibold text-stone-900 mb-1 break-all">
                {CHURCH_INFO.email}
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Para assuntos ministeriais e institucionais.
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`mailto:${CHURCH_INFO.email}`}
                className="flex-1 py-2.5 px-2 text-center text-xs font-medium text-white bg-[#B85526] hover:bg-[#A0451C] rounded-xs transition-colors flex items-center justify-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 text-xs text-stone-700 bg-white/80 hover:bg-white border border-[#D9CFC2] rounded-xs transition-colors cursor-pointer"
                title="Copiar e-mail"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card 3: Instagram */}
          <div className="bg-[#F2ECE4] border border-[#E4DBD0] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xs bg-[#E1306C]/15 text-[#E1306C] flex items-center justify-center mb-4">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1">
                INSTAGRAM
              </span>
              <h3 className="text-base font-serif font-semibold text-stone-900 mb-1">
                {CHURCH_INFO.social.instagramHandle}
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Fotos, avisos semanais, versículos e bastidores.
              </p>
            </div>
            <a
              href={CHURCH_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-center text-xs font-medium text-white bg-[#C13584] hover:bg-[#A82B71] rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir no Instagram</span>
            </a>
          </div>

          {/* Card 4: YouTube */}
          <div className="bg-[#F2ECE4] border border-[#E4DBD0] p-6 rounded-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xs bg-[#FF0000]/15 text-[#FF0000] flex items-center justify-center mb-4">
                <Youtube className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1">
                YOUTUBE
              </span>
              <h3 className="text-base font-serif font-semibold text-stone-900 mb-1 truncate">
                {CHURCH_INFO.social.youtubeHandle}
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Transmissões ao vivo, louvores e palavras bíblicas.
              </p>
            </div>
            <a
              href={CHURCH_INFO.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-center text-xs font-medium text-white bg-[#CC0000] hover:bg-[#B30000] rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Youtube className="w-4 h-4" />
              <span>Acessar Canal</span>
            </a>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="bg-[#F2ECE4] border border-[#E4DBD0] p-6 sm:p-10 max-w-3xl mx-auto rounded-xs">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-stone-900 mb-2">
              Envie uma Mensagem para a Tenda
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Nossa equipe pastoral responderá com muito carinho.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 bg-white/70 p-6 border border-[#D9CFC2] rounded-xs animate-fadeIn">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-stone-900 mb-1">
                Mensagem Enviada com Sucesso!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mb-5">
                Obrigado pelo contato, <strong>{formData.name}</strong>. Em breve retornaremos.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', contact: '', subject: 'Dúvidas Gerais', message: '' });
                }}
                className="px-5 py-2 text-xs font-medium text-stone-800 bg-stone-200/80 hover:bg-stone-300 rounded-xs transition-colors cursor-pointer"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Seu Nome <span className="text-[#BD5A2C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Como se chama?"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    WhatsApp ou E-mail <span className="text-[#BD5A2C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="(11) 99999-9999 ou seu@email.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Assunto
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900 rounded-xs"
                >
                  <option value="Dúvidas Gerais">Dúvidas Gerais sobre a Igreja</option>
                  <option value="Pedido de Oração">Pedido de Oração & Intercessão</option>
                  <option value="Participar de uma Célula">Quero Participar de uma Célula</option>
                  <option value="Agendar Visita">Agendar Visita com a Família</option>
                  <option value="Ação Social / Voluntariado">Voluntariado & Ação Social</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Sua Mensagem <span className="text-[#BD5A2C]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escreva sua mensagem ou pedido aqui..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900 rounded-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B85526] hover:bg-[#A0451C] text-white font-medium text-sm rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
