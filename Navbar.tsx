import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface NavbarProps {
  onOpenPlanVisit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPlanVisit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Quem somos', href: '#quem-somos' },
    { label: 'Cultos & Células', href: '#cultos' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Ministérios', href: '#ministerios' },
    { label: 'Seja Membro', href: '#seja-membro' },
    { label: 'Oração', href: '#oracao' },
    { label: 'Testemunhos', href: '#testemunhos' },
    { label: 'Liderança', href: '#lideranca' },
    { label: 'Doações', href: '#doacoes' },
    { label: 'Visite', href: '#visite' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Zone: Red Official Logo Badge */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <img
            src={CHURCH_INFO.logo}
            alt={CHURCH_INFO.name}
            className="h-10 sm:h-11 w-auto rounded-xs shadow-xs object-contain"
          />
          <span className="hidden sm:inline font-serif font-bold text-stone-900 text-base xl:text-lg tracking-tight group-hover:text-[#B85526] transition-colors">
            {CHURCH_INFO.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs xl:text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#B85526] transition-colors whitespace-nowrap py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPlanVisit}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#B85526] hover:bg-[#A0451C] rounded-md transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            Planeje sua visita
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-md transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E1D7] bg-[#FAF7F2] px-6 py-5 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3.5 text-sm font-medium text-stone-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#B85526] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanVisit();
                }}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#B85526] rounded-md hover:bg-[#A0451C] transition-colors"
              >
                Planeje sua visita
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
