import React, { useState } from 'react';
import { Check, Copy, Heart, ShieldCheck, MessageCircle, Smartphone, Building2, QrCode } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const Doacoes: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedDigits, setCopiedDigits] = useState(false);

  // CNPJ formatado e apenas dígitos
  const formattedCnpj = CHURCH_INFO.pixKey;
  const rawCnpj = CHURCH_INFO.pixKey.replace(/\D/g, '');

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(formattedCnpj);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleCopyRawDigits = () => {
    navigator.clipboard?.writeText(rawCnpj);
    setCopiedDigits(true);
    setTimeout(() => setCopiedDigits(false), 3000);
  };

  return (
    <section id="doacoes" className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E1D7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2ECE4] border border-[#E5DDD3] rounded-full text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#BD5A2C]/20" />
            <span>OFERTA E DÍZIMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight mb-4">
            Doações & Contribuições
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal mb-6">
            Sua contribuição sustenta a obra de Deus em São Miguel Paulista: a manutenção do templo, os cultos, as células, os ministérios e as ações sociais de acolhimento. Contribua com alegria e fé no coração.
          </p>
          <blockquote className="italic text-xs sm:text-sm text-stone-600 border-l-2 border-[#BD5A2C] pl-4 py-1 inline-block text-left bg-[#F7F3EC]/70">
            “Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria.”
            <span className="block not-italic font-semibold text-stone-700 text-xs mt-1">2 Coríntios 9:7</span>
          </blockquote>
        </div>

        {/* Illustrative Banner: Generosidade Bíblica */}
        <div className="relative rounded-xs overflow-hidden border border-[#E4DBD0] shadow-sm mb-10 group">
          <div className="relative aspect-16/9 sm:aspect-24/9 max-h-[300px] w-full overflow-hidden bg-stone-200">
            <img
              src="/public/assets/church/doacoes_banner.jpg"
              alt="Mãos segurando sementes de trigo ao pôr do sol, símbolo bíblico de semeadura e generosidade"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-lg z-10 text-white">
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md mb-2 border border-white/20">
                <Heart className="w-3 h-3 text-[#E89366]" />
                Semear com Alegria
              </span>
              <p className="text-sm sm:text-base font-serif italic text-white/95 drop-shadow-sm">
                "Aquele que supre a semente ao que semeia também multiplicará a vossa sementeira." — 2 Coríntios 9:10
              </p>
            </div>
          </div>
        </div>

        {/* Card Principal: Chave PIX (CNPJ) & QR Code Oficial */}
        <div className="bg-white border-2 border-[#E5DDD3] shadow-sm rounded-xs p-6 sm:p-10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF7F2] rounded-full -mr-12 -mt-12 pointer-events-none border border-[#E8E1D7]/60" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-[#F0EAE1]">
            {/* Coluna Esquerda: Chave e Informações */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold">
                    CHAVE PIX OFICIAL (CNPJ)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Chave Ativa
                  </span>
                </div>
                <div className="text-2xl sm:text-4xl font-mono text-stone-900 font-bold tracking-tight">
                  {formattedCnpj}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#BD5A2C]" />
                  Favorecido: <strong className="text-stone-900">{CHURCH_INFO.name}</strong> (CNPJ)
                </p>
              </div>

              {/* Ações de Cópia */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={handleCopyKey}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#B85526] hover:bg-[#A0451C] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  title="Copiar CNPJ com pontuação"
                >
                  {copiedKey ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Chave CNPJ Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Chave CNPJ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyRawDigits}
                  className="px-4 py-3 text-xs font-medium text-stone-700 bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E5DDD3] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Copiar apenas os números para bancos que não aceitam pontos ou traços"
                >
                  {copiedDigits ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-800 font-semibold">Números copiados!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Copiar apenas números ({rawCnpj})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                <QrCode className="w-4 h-4 text-[#BD5A2C] shrink-0" />
                <span>
                  No celular, você pode copiar a chave. No computador, basta escanear o QR Code ao lado pelo app do banco.
                </span>
              </div>
            </div>

            {/* Coluna Direita: QR Code Oficial */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#FAF7F2] border border-[#E5DDD3] p-6 rounded-xs text-center">
              <span className="text-[11px] uppercase tracking-wider text-[#BD5A2C] font-semibold mb-3 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                QR CODE OFICIAL PIX
              </span>
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-white p-2 rounded-xs border border-[#E5DDD3] shadow-xs overflow-hidden">
                <img
                  src="/public/assets/church/pix_qr_code.png?v=2"
                  alt="QR Code Oficial para Doações PIX — Igreja Internacional Tenda"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-stone-700 mt-3 font-medium">
                Aponte a câmera no aplicativo do seu banco
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {CHURCH_INFO.name}
              </p>
            </div>
          </div>

          {/* Garantia & Segurança */}
          <div className="pt-5 flex items-center gap-2.5 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Transferência 100% segura pelo aplicativo de qualquer instituição financeira (Nubank, Itaú, Bradesco, Caixa, Banco do Brasil, Santander, Inter, etc.).
            </span>
          </div>
        </div>

        {/* Passo a Passo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-[#FAF7F2] border border-[#E5DDD3] p-5 rounded-xs">
            <div className="w-8 h-8 rounded-full bg-[#B85526] text-white flex items-center justify-center font-serif font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-serif text-base text-stone-900 font-medium mb-1.5">
              Abra seu Banco
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Acesse o aplicativo do seu banco pelo celular ou internet banking e vá até a área <strong>PIX</strong>.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E5DDD3] p-5 rounded-xs">
            <div className="w-8 h-8 rounded-full bg-[#B85526] text-white flex items-center justify-center font-serif font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-serif text-base text-stone-900 font-medium mb-1.5">
              Escolha Chave CNPJ
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Selecione <strong>Transferir por Chave</strong>, escolha o tipo <strong>CNPJ</strong> e cole o número <strong>{formattedCnpj}</strong>.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E5DDD3] p-5 rounded-xs">
            <div className="w-8 h-8 rounded-full bg-[#B85526] text-white flex items-center justify-center font-serif font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-serif text-base text-stone-900 font-medium mb-1.5">
              Confirme e Abençoe
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Confira se o nome do titular é <strong>{CHURCH_INFO.name}</strong>, digite o valor e confirme a transferência.
            </p>
          </div>
        </div>

        {/* Rodapé de Dúvidas / Comprovante */}
        <div className="bg-[#F4EFEA] border border-[#E5DDD3] p-5 sm:p-6 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white border border-[#E5DDD3] rounded-full text-[#128C7E] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-stone-900 text-sm">
                Deseja enviar comprovante ou falar com a tesouraria?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Nossa equipe pastoral e administrativa atende com carinho pelo WhatsApp.
              </p>
            </div>
          </div>

          <a
            href={CHURCH_INFO.social.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xs transition-colors shrink-0 flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-emerald-800" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
