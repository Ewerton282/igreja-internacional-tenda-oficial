import React from 'react';
import { LIDERES } from '../data/churchData';

export const Lideranca: React.FC = () => {
  return (
    <section id="lideranca" className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-2">
          LIDERANÇA
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight mb-12">
          Quem cuida da tenda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LIDERES.map((lider, idx) => (
            <div key={idx} className="bg-[#F4EFEA] border border-[#E5DDD3] overflow-hidden flex flex-col group hover:border-[#BD5A2C] transition-all">
              <div className="relative aspect-[346/431] w-full overflow-hidden bg-stone-200">
                <img
                  src={lider.image}
                  alt={`${lider.role} ${lider.name}`}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1.5">
                  {lider.role}
                </span>
                <h3 className="text-xl font-serif font-medium text-stone-900">
                  {lider.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
