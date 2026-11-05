import React from 'react';
import { Youtube, Play } from 'lucide-react';
import { CHURCH_INFO, CULTOS } from '../data/churchData';

interface HeroProps {
  onOpenPlanVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPlanVisit }) => {
  const sundayService = CULTOS.find((c) => c.day.toLowerCase() === 'domingo');
  const sundayTime = sundayService ? sundayService.time : '10h';

  return (
    <section className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-stone-950 text-white">
      {/* Background Photography (Sunset Gathering Tent) */}
      <div className="absolute inset-0 z-0">
        <img
          src={CHURCH_INFO.heroBg}
          alt="Tenda da Igreja Internacional ao pôr do sol"
          className="w-full h-full object-cover object-[65%_center] sm:object-[60%_center] md:object-center filter brightness-95"
        />
        {/* Soft atmospheric gradient from left for typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl text-left">
          {/* Live broadcast status badge */}
          <a
            href={CHURCH_INFO.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs text-stone-200 hover:text-white transition-all mb-4 group w-fit cursor-pointer shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="font-semibold text-red-400 uppercase tracking-wider text-[11px]">Transmissão Ao Vivo</span>
            <span className="text-stone-400">•</span>
            <span>Domingos das {sundayTime}</span>
            <Play className="w-2.5 h-2.5 text-stone-300 fill-stone-300 ml-0.5 group-hover:text-red-400 group-hover:fill-red-400 transition-colors" />
          </a>

          {/* Kicker */}
          <p className="text-xs sm:text-sm tracking-widest uppercase text-[#E08552] font-semibold mb-3">
            IGREJA INTERNACIONAL
          </p>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white mb-6 leading-none">
            Tenda
          </h1>

          {/* Verse / Subtitle */}
          <p className="text-sm sm:text-lg text-stone-100 font-light leading-relaxed max-w-xl mb-8 [text-wrap:balance]">
            "Alarga o espaço da tua tenda" — Isaías 54:2. Um lugar de encontro com Deus, para todas as nações.
          </p>

          {/* Action Buttons: Visit & YouTube Live */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenPlanVisit}
              className="px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#B85526] hover:bg-[#A0451C] rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95 text-center"
            >
              Planeje sua visita
            </button>

            <a
              href={CHURCH_INFO.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95 group text-center"
            >
              <Youtube className="w-5 h-5 text-white fill-white transition-transform group-hover:scale-110" />
              <span>Cultos Ao Vivo no YouTube (Dom {sundayTime})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

