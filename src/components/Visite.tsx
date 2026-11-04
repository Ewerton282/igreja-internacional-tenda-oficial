import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CHURCH_INFO, CULTOS } from '../data/churchData';

export const Visite: React.FC = () => {
  return (
    <section id="visite" className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight mb-4">
          Venha nos visitar
        </h2>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-12 max-w-2xl font-normal">
          Você é nosso convidado. Chegue alguns minutos antes — teremos alguém esperando por você.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address and Services card */}
          <div className="lg:col-span-5 bg-[#F2ECE4] border border-[#E4DBD0] p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-stone-800 leading-relaxed">
                  <strong className="text-stone-900 font-semibold">Endereço:</strong> {CHURCH_INFO.address}, São Paulo - SP
                </p>
              </div>

              <div>
                <p className="text-sm text-stone-800 leading-relaxed">
                  <strong className="text-stone-900 font-semibold">Cultos & Ensino:</strong>{' '}
                  {CULTOS.map((c) => `${c.day.charAt(0).toUpperCase() + c.day.slice(1).toLowerCase()} ${c.time}${c.title.toLowerCase().includes('oração') ? ' (oração)' : ''}`).join(' · ')}
                  {' · '}Terça 20h (teologia)
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={CHURCH_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#BD5A2C] hover:text-[#9E441B] underline font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Traçar rota no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps view */}
          <div className="lg:col-span-7 border border-[#E4DBD0] bg-white overflow-hidden shadow-xs group">
            <a
              href={CHURCH_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden"
              title="Abrir no Google Maps"
            >
              <img
                src={CHURCH_INFO.mapPreview}
                alt="Mapa Av. Nordestina, 1839 - São Miguel Paulista"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 hover:bg-white text-stone-900 px-3 py-1.5 text-xs font-medium rounded-xs shadow-sm flex items-center gap-1 transition-all">
                <span>Ampliar mapa</span>
                <ExternalLink className="w-3 h-3 text-stone-600" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
