import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Baby, 
  Users, 
  Music, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  Check, 
  ChevronRight,
  Video,
  Utensils,
  Globe,
  FileText
} from 'lucide-react';
import { MINISTERIOS, CHURCH_INFO, MinisterioItem } from '../data/churchData';

const getMinistryIcon = (id: string) => {
  switch (id) {
    case 'kids':
      return <Baby className="w-5 h-5 text-[#E6915C]" />;
    case 'jovens':
      return <Users className="w-5 h-5 text-[#E6915C]" />;
    case 'louvor':
      return <Music className="w-5 h-5 text-[#E6915C]" />;
    case 'oracao':
    case 'intercessao':
      return <Heart className="w-5 h-5 text-[#E6915C]" />;
    case 'midia':
      return <Video className="w-5 h-5 text-[#E6915C]" />;
    case 'limpeza':
      return <Sparkles className="w-5 h-5 text-[#E6915C]" />;
    case 'secretaria':
      return <FileText className="w-5 h-5 text-[#E6915C]" />;
    case 'cozinha':
      return <Utensils className="w-5 h-5 text-[#E6915C]" />;
    case 'implantacao':
      return <Globe className="w-5 h-5 text-[#E6915C]" />;
    case 'teologia':
      return <BookOpen className="w-5 h-5 text-[#E6915C]" />;
    case 'acolhimento':
      return <HeartHandshake className="w-5 h-5 text-[#E6915C]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#E6915C]" />;
  }
};

export const Ministerios: React.FC = () => {
  return (
    <section id="ministerios" className="py-20 sm:py-24 bg-[#2A1E17] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B85526]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D47E48]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#E6915C] font-semibold block mb-2">
              CORPO DE CRISTO EM AÇÃO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F8F5F0] tracking-tight">
              Ministérios & Liderança
            </h2>
          </div>
          <p className="text-sm text-stone-300 max-w-md font-light leading-relaxed">
            Cada ministério é uma oportunidade de servir com zelo, cultivar dons espirituais e estender o amor de Deus a todas as idades e famílias.
          </p>
        </div>

        {/* Featured Ministries Panoramic Banner */}
        <div className="relative rounded-lg overflow-hidden border border-[#523A2C] shadow-2xl mb-14 group">
          <div className="relative aspect-21/9 sm:aspect-24/9 lg:aspect-3/1 w-full max-h-[360px] overflow-hidden bg-stone-900">
            <img
              src={CHURCH_INFO.ministeriosBanner}
              alt="Ministérios da Igreja Internacional Tenda em adoração, oração e família"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter brightness-95"
            />
            {/* Atmospheric gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E17] via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A1E17]/80 via-transparent to-transparent hidden sm:block" />

            {/* Banner Caption / Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-lg z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-[#E6915C] font-medium mb-2">
                <Sparkles className="w-3 h-3 text-[#E6915C]" />
                <span>Unidade · Louvor · Oração · Família</span>
              </span>
              <p className="text-white text-sm sm:text-base font-serif italic drop-shadow-md">
                "Servi uns aos outros, cada um conforme o dom que recebeu." — 1 Pedro 4:10
              </p>
            </div>
          </div>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MINISTERIOS.map((item: MinisterioItem, idx: number) => {
            const isKids = item.id === 'kids';
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-lg p-6 sm:p-7 border transition-all duration-300 relative ${
                  isKids
                    ? 'bg-[#33241C] border-[#B85526] shadow-lg shadow-orange-950/20'
                    : 'bg-[#231812]/70 border-[#523A2C]/80 hover:border-[#8F5A38]'
                }`}
              >
                {/* Kids Spotlight badge */}
                {isKids && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B85526] text-white text-[11px] font-semibold tracking-wide uppercase shadow-sm">
                      <Baby className="w-3 h-3" />
                      Espaço das Crianças
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Header with Icon, Category & Number */}
                  <div className="flex items-center justify-between mb-4 pt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#3B2A20] flex items-center justify-center border border-[#5A3F30]">
                        {getMinistryIcon(item.id)}
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#E6915C] font-semibold block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#F8F5F0] mb-3">
                    {item.title}
                  </h3>

                  {/* Meta Badges: Leader, Target & Schedule */}
                  <div className="space-y-2 mb-4 text-xs">
                    {item.leader && (
                      <div className="flex items-center gap-2 text-stone-200 bg-[#3B2B21]/90 px-2.5 py-1.5 rounded border border-[#543D2F]">
                        <UserCheck className="w-3.5 h-3.5 text-[#E6915C] shrink-0" />
                        <span className="font-medium">
                          Líder: <strong className="text-white font-semibold">{item.leader}</strong>
                        </span>
                      </div>
                    )}
                    {item.target && (
                      <div className="flex items-center gap-2 text-stone-300">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Público: {item.target}</span>
                      </div>
                    )}
                    {item.schedule && (
                      <div className="flex items-center gap-2 text-stone-300">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{item.schedule}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-300 leading-relaxed font-light mb-5">
                    {item.desc}
                  </p>

                  {/* Highlights / Features */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-3 border-t border-[#443023] space-y-1.5 mb-4">
                      {item.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-[#E6915C] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-[#443023]/60 mt-2">
                  <a
                    href={`https://wa.me/5511959705669?text=${encodeURIComponent(
                      `Olá, gostaria de saber mais informações sobre o ${item.title} da Igreja Internacional Tenda!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-medium text-[#E6915C] hover:text-[#F3AA77] transition-colors group/link"
                  >
                    <span>Saber mais ou participar</span>
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Invitation to serve */}
        <div className="mt-14 pt-8 border-t border-[#4A3426] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B2A20] flex items-center justify-center text-[#E6915C] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-stone-300">
              Gostaria de voluntariar seus dons ou falar com nossos líderes ministeriais?
            </p>
          </div>
          <a
            href={CHURCH_INFO.social.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs sm:text-sm font-medium text-[#2A1E17] bg-[#E6915C] hover:bg-[#F3AA77] rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-xs font-semibold"
          >
            Quero Fazer Parte
          </a>
        </div>
      </div>
    </section>
  );
};
