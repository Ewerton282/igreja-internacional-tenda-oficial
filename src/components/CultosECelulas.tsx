import React from 'react';
import { Youtube, BookOpen, Utensils, Cake, Users, Clock, Sparkles } from 'lucide-react';
import { CULTOS, CELULAS, TEOLOGIA, CHURCH_INFO } from '../data/churchData';

interface CultosECelulasProps {
  onOpenConnect: (celulaLeader: string) => void;
}

export const CultosECelulas: React.FC<CultosECelulasProps> = ({ onOpenConnect }) => {
  return (
    <section id="cultos" className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nossos Cultos Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-2">
                CELEBRAÇÕES & ADORAÇÃO
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight">
                Nossos cultos
              </h2>
            </div>
            <p className="text-stone-600 text-sm max-w-md">
              Momentos de adoração profunda, ministração da Palavra e oração comunitária na Av. Nordestina, 1839.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 items-start divide-y md:divide-y-0 md:divide-x divide-[#D9CFC2]">
            {CULTOS.map((culto, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-8 md:pt-0 md:pl-8' : ''}>
                <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-2">
                  {culto.day}
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 mb-2 font-normal">
                  {culto.time}
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-1">
                  {culto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-4">
                  {culto.day === 'DOMINGO'
                    ? 'Culto com toda a família reunida, louvor congregacional e ministração com espaço especial para as crianças no Ministério Kids.'
                    : culto.day === 'SEXTA'
                    ? 'Encontro de oração, clamor, intercessão e busca espiritual para renovar a fé e começar o final de semana na presença do Senhor.'
                    : 'Adoração jovem, louvor contemporâneo, palavra viva e comunhão com a juventude no segundo sábado de cada mês.'}
                </p>

                {culto.day.toLowerCase() === 'domingo' && (
                  <div className="mt-2">
                    <a
                      href={CHURCH_INFO.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100/80 px-3.5 py-1.5 rounded-full transition-colors border border-red-200/70"
                    >
                      <Youtube className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                      <span>Transmissão ao vivo aos domingos no YouTube</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Aula de Teologia - Destaque de Ensino */}
        <div className="mb-20 bg-gradient-to-br from-[#241D17] to-[#181310] text-[#FAF7F2] rounded-xs p-8 sm:p-10 border border-stone-800 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#B85526]/10 pointer-events-none blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#B85526]/30 text-[#E89366] border border-[#B85526]/40">
                  <BookOpen className="w-3 h-3" />
                  {TEOLOGIA.tag}
                </span>
                <span className="text-xs text-stone-400">· Todas as terças-feiras</span>
              </div>

              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                  {TEOLOGIA.title}
                </h3>
                <span className="text-xl sm:text-2xl font-serif text-[#E89366]">
                  {TEOLOGIA.day} às {TEOLOGIA.time}
                </span>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                {TEOLOGIA.desc}
              </p>

              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="font-semibold text-stone-200">Ministração:</span>
                <span>{TEOLOGIA.leader}</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenConnect(`${TEOLOGIA.title} com ${TEOLOGIA.leader}`)}
                className="px-5 py-3 text-sm font-medium text-white bg-[#B85526] hover:bg-[#A0451C] rounded-xs transition-colors cursor-pointer text-center shadow-xs"
              >
                Quero Participar da Aula
              </button>
              <a
                href={CHURCH_INFO.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-sm font-medium text-stone-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xs transition-colors text-center"
              >
                Tirar Dúvidas no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Células Section */}
        <div id="celulas" className="pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-2">
                GRUPOS PEQUENOS · COMUNHÃO DE PERTO
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight">
                Células
              </h2>
            </div>
            <p className="text-stone-600 text-sm max-w-md">
              A igreja nos lares: um lugar para crescer na fé, fazer amigos verdadeiros e partilhar a vida em comunhão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CELULAS.map((celula) => {
              const getIcon = () => {
                if (celula.id === 'cel-jovens') return <Users className="w-5 h-5 text-[#BD5A2C]" />;
                if (celula.id === 'cel-janta') return <Utensils className="w-5 h-5 text-[#BD5A2C]" />;
                return <Cake className="w-5 h-5 text-[#BD5A2C]" />;
              };

              return (
                <div
                  key={celula.id}
                  onClick={() => onOpenConnect(`${celula.title} (${celula.leader})`)}
                  className="bg-[#FAF7F2] border border-[#E4DBD0] rounded-xs p-6 sm:p-7 hover:border-[#BD5A2C] hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold">
                        {celula.day}
                      </span>
                      {celula.tag && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAE2D7] text-stone-700">
                          {celula.tag}
                        </span>
                      )}
                    </div>

                    <div className="text-3xl sm:text-4xl font-serif text-stone-900 mb-2 font-normal group-hover:text-[#BD5A2C] transition-colors flex items-center justify-between">
                      <span>{celula.time}</span>
                      <div className="p-2 bg-[#F2ECE4] group-hover:bg-[#EADED2] rounded-full transition-colors">
                        {getIcon()}
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                      {celula.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                      {celula.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between">
                    <span className="text-xs text-stone-600">
                      Liderança: <strong className="text-stone-800 font-medium">{celula.leader}</strong>
                    </span>
                    <span className="text-xs font-semibold text-[#BD5A2C] group-hover:translate-x-1 transition-transform">
                      Participar &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

