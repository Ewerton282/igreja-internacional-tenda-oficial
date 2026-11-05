import React from 'react';
import { VALORES, CHURCH_INFO } from '../data/churchData';

export const QuemSomos: React.FC = () => {
  return (
    <section id="quem-somos" className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-4xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-3">
            QUEM SOMOS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight mb-6 [text-wrap:balance]">
            Uma tenda aberta, com lugar para você
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl font-normal">
            A Igreja Internacional Tenda é uma família de fé reunida em São Miguel Paulista, na zona leste de São Paulo.
            Vivemos a promessa de Isaías 54:2 — "Alarga o espaço da tua tenda" — cremos que sempre há lugar para mais uma pessoa.
            Nós nos reunimos nos cultos, nas células e nos ministérios para conhecer a Deus, crescer juntos e servir a nossa cidade.
          </p>
        </div>

        {/* Missão & Visão Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Missão */}
          <div className="bg-[#F2ECE4] border border-[#E4DBD0] rounded-xs p-6 sm:p-8">
            <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-3">
              MISSÃO
            </span>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
              Anunciar Jesus e formar discípulos, acolhendo cada pessoa como ela é e conduzindo-a a um compromisso com Deus.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-[#F2ECE4] border border-[#E4DBD0] rounded-xs p-6 sm:p-8">
            <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-3">
              VISÃO
            </span>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
              Alargar a tenda: estar presente em São Miguel Paulista e alcançar todas as nações, com famílias transformadas e uma nova geração firmada na fé.
            </p>
          </div>
        </div>

        {/* Valores Section */}
        <div>
          <p className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-8">
            VALORES
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-12">
            {VALORES.map((val, idx) => (
              <div key={idx} className="pt-4 border-t border-[#D9CFC2]">
                <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Foundation Tagline */}
          <div className="border-l-2 border-[#B85526] pl-4 py-1 text-sm text-stone-700">
            Fundada em <strong className="font-serif text-stone-900 text-base">{CHURCH_INFO.foundedDate}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
