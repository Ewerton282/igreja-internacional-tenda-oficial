import React, { useState } from 'react';
import { X, Check, MapPin, Calendar, Users, Heart } from 'lucide-react';
import { CHURCH_INFO, CULTOS } from '../data/churchData';

// ==========================================
// 1. PLAN VISIT MODAL
// ==========================================
interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
  const defaultService = CULTOS[0] ? `${CULTOS[0].day.charAt(0) + CULTOS[0].day.slice(1).toLowerCase()} (${CULTOS[0].time} - ${CULTOS[0].title})` : 'Culto da Família';
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceDay: defaultService,
    adultsCount: '1',
    kidsCount: '0',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-xs border border-[#E5DDD3] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-900 rounded-xs hover:bg-stone-200/60 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-2">
              Você é Nosso Convidado de Honra!
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Olá, <strong className="text-stone-900">{formData.name}</strong>! Nossa equipe da tenda
              estará te esperando com muita alegria no{' '}
              <strong className="text-stone-900">{formData.serviceDay}</strong>.
            </p>

            <div className="bg-[#F2ECE4] p-4 border border-[#E4DBD0] text-left text-xs text-stone-700 space-y-2 mb-6">
              <p>📍 <strong>Local:</strong> {CHURCH_INFO.address}, São Paulo - SP</p>
              <p>🕒 <strong>Horário:</strong> Chegue 10 minutos antes para que possamos te dar as boas-vindas.</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#B85526] hover:bg-[#A0451C] text-white font-medium text-sm rounded-xs transition-colors cursor-pointer"
            >
              Concluir
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#BD5A2C]">
                SEJA BEM-VINDO
              </span>
              <h3 className="text-2xl font-serif text-stone-900 mt-1">
                Planeje Sua Visita à Tenda
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Preencha seus dados para que possamos te receber calorosamente.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Seu Nome Completo <span className="text-[#BD5A2C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Como podemos te chamar?"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  WhatsApp <span className="text-[#BD5A2C]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 95970-5669"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Qual culto você deseja participar?
                </label>
                <select
                  value={formData.serviceDay}
                  onChange={(e) => setFormData({ ...formData, serviceDay: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900"
                >
                  {CULTOS.map((c, i) => (
                    <option key={i} value={`${c.day.charAt(0) + c.day.slice(1).toLowerCase()} (${c.time} - ${c.title})`}>
                      {c.day.charAt(0) + c.day.slice(1).toLowerCase()} · {c.time} ({c.title})
                    </option>
                  ))}
                  <option value="Terça às 20h (Aula de Teologia com Apóstola Patrícia)">
                    Terça · 20h (Aula de Teologia)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Adultos
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.adultsCount}
                    onChange={(e) => setFormData({ ...formData, adultsCount: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9CFC2] text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Crianças (Kids)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.kidsCount}
                    onChange={(e) => setFormData({ ...formData, kidsCount: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9CFC2] text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Mensagem ou observação (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tem alguma dúvida ou pedido especial?"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9CFC2] text-stone-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B85526] hover:bg-[#A0451C] text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
              >
                Confirmar Minha Visita
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. CELULA CONNECT MODAL
// ==========================================
interface CelulaModalProps {
  leader: string | null;
  onClose: () => void;
}

export const CelulaModal: React.FC<CelulaModalProps> = ({ leader, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!leader) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-xs border border-[#E5DDD3] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-900 rounded-xs hover:bg-stone-200/60 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-2">
              Conexão Registrada!
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Os líderes ({leader}) entrarão em contato no seu WhatsApp para passar o endereço e te receber de braços abertos!
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#B85526] hover:bg-[#A0451C] text-white font-medium text-sm transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#BD5A2C]">
                GRUPOS PEQUENOS · CÉLULAS
              </span>
              <h3 className="text-2xl font-serif text-stone-900 mt-1">
                Participar da Célula
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Liderança: {leader}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Seu Nome <span className="text-[#BD5A2C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como se chama?"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Seu WhatsApp <span className="text-[#BD5A2C]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 95970-5669"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CFC2] focus:outline-none focus:ring-1 focus:ring-[#B85526] text-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B85526] hover:bg-[#A0451C] text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
              >
                Quero o Endereço da Célula
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
