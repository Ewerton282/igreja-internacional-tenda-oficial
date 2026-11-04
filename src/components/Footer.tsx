import React from 'react';
import { Instagram, Youtube, Facebook, MessageCircle, Mail, Phone } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] py-14 border-t border-[#E8E1D7] text-stone-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center gap-6">
        {/* Social Icons Strip */}
        <div className="flex items-center gap-4 text-stone-700">
          <a
            href={CHURCH_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD3] hover:text-[#C13584] transition-colors"
            title="Instagram"
            aria-label="Instagram da Igreja"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={CHURCH_INFO.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD3] hover:text-[#FF0000] transition-colors"
            title="YouTube"
            aria-label="Canal do YouTube da Igreja"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href={CHURCH_INFO.social.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD3] hover:text-[#128C7E] transition-colors"
            title="WhatsApp"
            aria-label="WhatsApp da Igreja"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href={CHURCH_INFO.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD3] hover:text-[#1877F2] transition-colors"
            title="Facebook"
            aria-label="Facebook da Igreja"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${CHURCH_INFO.email}`}
            className="p-2.5 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD3] hover:text-[#BD5A2C] transition-colors"
            title="E-mail"
            aria-label="Enviar E-mail"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Contact direct lines */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-600">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#BD5A2C]" />
            <a href={`mailto:${CHURCH_INFO.email}`} className="hover:text-stone-900 underline">
              {CHURCH_INFO.email}
            </a>
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
            <a href={CHURCH_INFO.social.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 underline">
              WhatsApp: {CHURCH_INFO.whatsapp}
            </a>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-stone-400" />
            <span>{CHURCH_INFO.phone}</span>
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-normal text-stone-800 text-sm">
            © 2026 {CHURCH_INFO.name}
          </p>
          <p className="text-xs text-stone-500">
            {CHURCH_INFO.address} · {CHURCH_INFO.city}
          </p>
        </div>
      </div>
    </footer>
  );
};
