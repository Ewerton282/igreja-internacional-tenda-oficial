import React, { useState } from 'react';
import { 
  Users, 
  Droplets, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  HeartHandshake, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface MemberRequest {
  id: string;
  name: string;
  phone: string;
  stage: string;
  notes?: string;
  date: string;
}

const STORAGE_KEY = 'tenda_membership_requests_v1';

export const SejaMembro: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState('Já sou batizado nas águas');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    const newRequest: MemberRequest = {
      id: `member-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      stage,
      notes: notes.trim(),
      date: new Date().toLocaleDateString('pt-BR'),
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const list = stored ? JSON.parse(stored) : [];
      list.push(newRequest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }

    // Prepare WhatsApp message
    const whatsappMsg = encodeURIComponent(
      `*Quero Ser Membro - Igreja Internacional Tenda*\n\n` +
      `*Nome:* ${newRequest.name}\n` +
      `*WhatsApp:* ${newRequest.phone}\n` +
      `*Situação Atual:* ${newRequest.stage}\n` +
      (newRequest.notes ? `*Mensagem:* ${newRequest.notes}\n\n` : '\n') +
      `Gostaria de participar do processo de membresia e caminhar junto com a família Tenda!`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(`https://wa.me/5511959705669?text=${whatsappMsg}`, '_blank');
    }, 600);
  };

  const steps = [
    {
      num: '01',
      icon: <Droplets className="w-5 h-5 text-[#BD5A2C]" />,
      title: 'Decisão & Batismo',
      desc: 'Confissão pública da fé em Jesus Cristo e o batismo bíblico nas águas por imersão, declarando seu novo nascimento.',
    },
    {
      num: '02',
      icon: <BookOpen className="w-5 h-5 text-[#BD5A2C]" />,
      title: 'Encontro de Novos Membros',
      desc: 'Imersão na visão profética de Isaías 54:2 ("Alarga a tua tenda"), doutrinas bíblicas e a aliança com a igreja local.',
    },
    {
      num: '03',
      icon: <Users className="w-5 h-5 text-[#BD5A2C]" />,
      title: 'Conexão em Célula',
      desc: 'Caminhar de perto em comunidade: Célula de Jovens (Sábado 18h), Célula da Janta (Segunda 19h) ou Célula do Bolo (Quinta 20h).',
    },
    {
      num: '04',
      icon: <Sparkles className="w-5 h-5 text-[#BD5A2C]" />,
      title: 'Ativação Ministerial',
      desc: 'Descobrir e exercitar seus dons espirituais servindo nos ministérios: Kids, Louvor, Acolhimento, Mídia, Limpeza, Cozinha ou Missões.',
    },
  ];

  return (
    <section id="seja-membro" className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E1D7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-3">
            ALIANÇA, PROPÓSITO E FAMÍLIA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
            Seja Membro da Igreja Internacional Tenda
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal mb-6">
            Ser membro é pertencer com profundidade: ter cobertura pastoral, caminhar em unidade, 
            crescer nos fundamentos da Palavra e cumprir o chamado de Deus como família em São Miguel Paulista.
          </p>
          <blockquote className="italic text-xs sm:text-sm text-stone-600 border-l-2 border-[#BD5A2C] pl-4 py-1 inline-block text-left bg-[#F4EFEA]/80">
            “Assim que já não sois estrangeiros, nem forasteiros, mas concidadãos dos santos e da família de Deus.”
            <span className="block not-italic font-semibold text-stone-800 text-xs mt-1">Efésios 2:19</span>
          </blockquote>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5DDD3] p-6 rounded-xs shadow-xs hover:border-[#BD5A2C] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xs bg-[#FAF7F2] border border-[#E8E1D7] flex items-center justify-center group-hover:bg-[#BD5A2C]/10 transition-colors">
                    {st.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-stone-400">
                    {st.num}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#BD5A2C] font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Passo {idx + 1} de 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form and Benefits 2-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white border-2 border-[#E5DDD3] p-6 sm:p-10 rounded-xs shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0EAE1]">
              <div className="w-10 h-10 rounded-full bg-[#BD5A2C]/10 text-[#BD5A2C] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                  Quero Fazer Parte da Família
                </h3>
                <p className="text-xs text-stone-600">
                  Preencha seus dados para iniciarmos o acompanhamento pastoral de membresia.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xs animate-fadeIn text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-emerald-900">
                  Que alegria receber você!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Sua intenção de membresia foi registrada. A mensagem foi direcionada ao nosso WhatsApp para que nossa equipe pastoral entre em contato com todo amor.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setNotes('');
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Enviar outro contato
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome e sobrenome"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#BD5A2C] focus:border-[#BD5A2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    WhatsApp para Contato *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#BD5A2C] focus:border-[#BD5A2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Sua Situação Espiritual Atual
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#BD5A2C] focus:border-[#BD5A2C]"
                  >
                    <option value="Já sou batizado nas águas">Já sou batizado nas águas</option>
                    <option value="Desejo me batizar nas águas">Desejo me batizar nas águas</option>
                    <option value="Venho por transferência de outra igreja">Venho por transferência de outra igreja</option>
                    <option value="Sou novo na fé e quero aprender mais">Sou novo na fé e quero aprender mais</option>
                    <option value="Estou visitando e quero conhecer">Estou visitando e quero conhecer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Mensagem ou Pedido Pastoral (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Conte-nos um pouco sobre você ou se deseja oração..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#BD5A2C] focus:border-[#BD5A2C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#BD5A2C] hover:bg-[#A0451C] text-white text-sm font-semibold rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando...' : 'Confirmar e Abrir no WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Why be a member? */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F2ECE4] border border-[#E4DBD0] p-6 sm:p-8 rounded-xs">
              <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-2">
                O QUE SIGNIFICA SER MEMBRO?
              </span>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                Pertencimento, Cuidado & Aliança
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-light mb-6">
                Na Igreja Internacional Tenda, a membresia não é um título ou burocracia, mas uma aliança bíblica de amor mútuo.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#BD5A2C]/20 text-[#BD5A2C] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">Cobertura e Cuidado Pastoral</h4>
                    <p className="text-xs text-stone-600">Pastores e líderes orando, aconselhando e zelando pela sua vida e família.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#BD5A2C]/20 text-[#BD5A2C] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">Vida em Célula e Comunhão</h4>
                    <p className="text-xs text-stone-600">Amizades cristãs verdadeiras e apoio nas horas de luta e celebração.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#BD5A2C]/20 text-[#BD5A2C] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">Ministério & Propósito</h4>
                    <p className="text-xs text-stone-600">Oportunidade real de servir com alegria e transformar a nossa comunidade.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 bg-stone-900 text-white rounded-xs border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-medium text-white mb-1">
                  Prefere falar diretamente conosco?
                </h4>
                <p className="text-xs text-stone-400">
                  Tire dúvidas sobre batismo e membresia com nossa equipe.
                </p>
              </div>
              <a
                href={CHURCH_INFO.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-xs transition-colors shrink-0 whitespace-nowrap shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Chamar no WhatsApp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
