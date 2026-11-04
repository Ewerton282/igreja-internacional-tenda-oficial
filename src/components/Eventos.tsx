import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Share2, Check, UserCheck, ArrowRight, X, Sparkles, Heart, Maximize2, Eye } from 'lucide-react';
import { EVENTOS, EventoItem, CHURCH_INFO } from '../data/churchData';

export const Eventos: React.FC = () => {
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventoItem | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Lightbox Modal for Banner Image
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Modal Form State
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);

  // Featured Spotlight Event (Culto dos Jovens)
  const featuredEvent = EVENTOS.find((e) => e.isFeatured) || EVENTOS[0];

  const handleOpenAttendanceModal = (event: EventoItem) => {
    setSelectedEventForModal(event);
    setConfirmedSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedEventForModal(null);
    setAttendeeName('');
    setAttendeePhone('');
    setGuestCount('1');
    setConfirmedSuccess(false);
  };

  const handleConfirmAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForModal) return;

    if (!registeredEvents.includes(selectedEventForModal.id)) {
      setRegisteredEvents([...registeredEvents, selectedEventForModal.id]);
    }

    const whatsappMessage = encodeURIComponent(
      `*Confirmação de Presença - Igreja Internacional Tenda*\n\n` +
      `*Evento:* ${selectedEventForModal.title}\n` +
      `*Data / Horário:* ${selectedEventForModal.dayOfWeek} às ${selectedEventForModal.time}\n` +
      `*Nome:* ${attendeeName}\n` +
      `${attendeePhone ? `*Contato:* ${attendeePhone}\n` : ''}` +
      `*Número de Pessoas:* ${guestCount}`
    );

    window.open(`https://wa.me/5511959705669?text=${whatsappMessage}`, '_blank');

    setConfirmedSuccess(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2500);
  };

  const handleShareEvent = (event: EventoItem) => {
    const shareText = `*${event.title}* na Igreja Internacional Tenda!\nData: ${event.dayOfWeek} às ${event.time}\nLocal: ${event.location}\nSaiba mais no site da Tenda.`;
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        // fallback
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 3000);
    }
  };

  return (
    <section id="eventos" className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E1D7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AGENDA & CELEBRAÇÕES ESPECIAIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight">
              Eventos da Tenda
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-700 max-w-lg leading-relaxed font-normal">
            Participe dos momentos especiais que unem nossa igreja: celebrações solenes da Santa Ceia e eventos acolhedores para toda a família.
          </p>
        </div>

        {/* Featured Spotlight Banner: Culto dos Animais */}
        {featuredEvent && featuredEvent.bannerImage && (
          <div className="mb-14 bg-linear-to-br from-[#FFFDF9] via-[#FAF6EF] to-[#F5EFE6] border-2 border-[#D88A58]/40 rounded-xs shadow-md p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Background Accent glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E08552]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Official Poster Banner */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group cursor-pointer max-w-xs sm:max-w-sm w-full">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: featuredEvent.bannerImage!,
                        title: featuredEvent.title,
                      })
                    }
                    className="relative rounded-xs overflow-hidden border-2 border-[#B85526]/20 shadow-lg bg-stone-900 group-hover:border-[#B85526] transition-all"
                  >
                    <img
                      src={featuredEvent.bannerImage}
                      alt={featuredEvent.title}
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-2xs">
                      <Maximize2 className="w-4 h-4" />
                      <span>Clique para ver cartaz completo</span>
                    </div>
                  </div>

                  <p className="text-center text-[11px] text-stone-500 mt-2 flex items-center justify-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-400" />
                    <span>Cartaz Oficial — {featuredEvent.title}</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Event Info & Action */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-[#B85526] text-white text-[11px] font-bold tracking-wider uppercase rounded-xs">
                      {featuredEvent.badgeText || 'PRÓXIMO GRANDE EVENTO'}
                    </span>
                    <span className="text-xs font-semibold text-[#8C3A12]">
                      {featuredEvent.category}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs text-stone-600 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#B85526]" />
                      {featuredEvent.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-2">
                    {featuredEvent.title}
                  </h3>

                  {featuredEvent.highlight && (
                    <p className="text-sm sm:text-base font-serif italic text-[#8C3A12] mb-4">
                      {featuredEvent.highlight}
                    </p>
                  )}

                  <p className="text-sm text-stone-700 leading-relaxed font-light mb-6">
                    {featuredEvent.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 bg-white border border-[#E5DDD3] rounded-xs">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-900 mb-1">
                        <Calendar className="w-4 h-4 text-[#B85526]" />
                        <span>Data & Horário</span>
                      </div>
                      <p className="text-xs text-stone-600">
                        {featuredEvent.dayOfWeek} às {featuredEvent.time}
                      </p>
                    </div>

                    <div className="p-3.5 bg-white border border-[#E5DDD3] rounded-xs">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-900 mb-1">
                        <MapPin className="w-4 h-4 text-[#B85526]" />
                        <span>Localização</span>
                      </div>
                      <p className="text-xs text-stone-600">
                        {featuredEvent.location}
                      </p>
                    </div>
                  </div>

                  {/* Welcome Notice */}
                  <div className="p-3.5 bg-[#FFF8F0] border-l-4 border-[#B85526] rounded-xs text-xs text-stone-800 mb-6 leading-relaxed">
                    <strong className="text-[#8C3A12] block mb-0.5">Participe e traga seus amigos:</strong>
                    Venha celebrar e adorar a Deus conosco na Av. Nordestina, 1839. Toda a igreja e a juventude da Tenda estão de braços abertos para acolher você!
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenAttendanceModal(featuredEvent)}
                    className="px-6 py-3 bg-[#B85526] hover:bg-[#9E3E14] text-white text-xs sm:text-sm font-semibold rounded-xs transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                  >
                    {registeredEvents.includes(featuredEvent.id) ? (
                      <>
                        <UserCheck className="w-4 h-4 text-emerald-200" />
                        Presença Confirmada!
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-current text-white/90" />
                        Confirmar Presença no Culto
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: featuredEvent.bannerImage!,
                        title: featuredEvent.title,
                      })
                    }
                    className="px-4 py-3 bg-white hover:bg-[#FAF7F2] border border-[#D9CFC2] text-stone-800 text-xs sm:text-sm font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Maximize2 className="w-4 h-4 text-[#B85526]" />
                    <span>Ver Cartaz Oficial</span>
                  </button>

                  <button
                    onClick={() => handleShareEvent(featuredEvent)}
                    className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#D9CFC2] text-stone-600 hover:text-stone-900 rounded-xs transition-colors cursor-pointer"
                    title="Compartilhar evento"
                  >
                    {copiedEventId === featuredEvent.id ? (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-4 h-4" /> Link Copiado!
                      </span>
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section title for agenda list */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8E1D7] pb-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              Celebrações Especiais Programadas
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Confira os detalhes das nossas celebrações e venha participar conosco.
            </p>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            2 celebrações ativas
          </span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {EVENTOS.map((item) => {
            const isRegistered = registeredEvents.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white border border-[#E5DDD3] p-6 sm:p-8 rounded-xs shadow-xs hover:border-[#BD5A2C]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    {/* Date Badge */}
                    <div className="shrink-0 w-16 h-16 sm:w-18 sm:h-18 bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs flex flex-col items-center justify-center text-center p-1 group-hover:border-[#BD5A2C] transition-colors">
                      <span className="text-xs font-mono uppercase font-bold text-[#BD5A2C] tracking-wide">
                        {item.dateBadge.month}
                      </span>
                      <span className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-tight">
                        {item.dateBadge.day}
                      </span>
                    </div>

                    {/* Unboxed Metadata & Title */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                        <span className="text-[#BD5A2C] font-semibold">{item.category}</span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {item.time}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-[#BD5A2C] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Location and Info */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-4 pb-3 border-b border-[#F7F2EC]">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{item.location}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-stone-500 font-medium">{item.dayOfWeek}</span>
                  </div>

                  {/* Banner preview if available in card */}
                  {item.bannerImage && (
                    <div
                      onClick={() =>
                        setLightboxImage({
                          src: item.bannerImage!,
                          title: item.title,
                        })
                      }
                      className="mb-5 rounded-xs overflow-hidden border border-[#E8E1D7] cursor-pointer relative group/img bg-stone-900 shadow-xs"
                    >
                      <img
                        src={item.bannerImage}
                        alt={item.title}
                        className="w-full h-56 object-cover object-top group-hover/img:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-1.5 backdrop-blur-2xs">
                        <Eye className="w-4 h-4" />
                        <span>Clique para ampliar o cartaz oficial</span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium rounded-xs flex items-center gap-1.5 border border-white/10 shadow-xs">
                        <Maximize2 className="w-3 h-3 text-[#E89366]" />
                        <span>Cartaz Oficial</span>
                      </div>
                    </div>
                  )}

                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-light mb-4">
                    {item.description}
                  </p>

                  {item.highlight && (
                    <div className="p-3 bg-[#FAF7F2] border-l-2 border-[#BD5A2C] text-xs text-stone-700 mb-6 font-normal">
                      {item.highlight}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#F7F2EC] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleOpenAttendanceModal(item)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xs transition-colors cursor-pointer shadow-2xs ${
                        isRegistered
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-[#B85526] hover:bg-[#A0451C] text-white'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                          Presença Confirmada
                        </>
                      ) : (
                        <>
                          Quero Participar
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {item.bannerImage && (
                      <button
                        onClick={() =>
                          setLightboxImage({
                            src: item.bannerImage!,
                            title: item.title,
                          })
                        }
                        className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 border border-[#E5DDD3]"
                        title="Ver cartaz em tamanho real"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#B85526]" />
                        <span className="hidden sm:inline">Ver Cartaz</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleShareEvent(item)}
                    className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-[#FAF7F2] rounded-xs transition-colors cursor-pointer border border-transparent hover:border-[#E8E1D7] relative"
                    title="Compartilhar celebração"
                  >
                    {copiedEventId === item.id ? (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-4 h-4" /> Copiado!
                      </span>
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout: Suggest an event or visit */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F4EDE4] border border-[#E2D7CB] rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#BD5A2C]/10 text-[#BD5A2C] flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-stone-900">
                Gostaria de agendar uma visita guiada para seu grupo ou família?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Nossos obreiros e líderes terão grande prazer em recepcionar você em nossos encontros.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/5511959705669?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20celebra%C3%A7%C3%B5es%20da%20Tenda!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#D9CFC2] text-stone-800 text-xs sm:text-sm font-medium rounded-xs transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            Falar com a Secretaria no WhatsApp
          </a>
        </div>

        {/* Attendance Confirmation Modal */}
        {selectedEventForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-[#E8E1D7] rounded-xs shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#BD5A2C] font-semibold block mb-1">
                  CONFIRMAR PRESENÇA
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-medium">
                  {selectedEventForModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
                  {selectedEventForModal.dayOfWeek} às {selectedEventForModal.time} · {selectedEventForModal.location}
                </p>
              </div>

              {confirmedSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xs text-center">
                  <Check className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-serif text-lg font-semibold text-emerald-900 mb-1">
                    Presença Confirmada com Sucesso!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Estamos ansiosos para recebê-lo(a) na Igreja Internacional Tenda!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmAttendance} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Maria Oliveira"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                      WhatsApp para Contato
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 95970-5669"
                      value={attendeePhone}
                      onChange={(e) => setAttendeePhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                      Quantas pessoas virão com você?
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#D9CFC2] rounded-xs focus:outline-none focus:border-[#B85526] transition-colors"
                    >
                      <option value="1">Apenas eu (1 pessoa)</option>
                      <option value="2">2 pessoas (Casal / Amigos)</option>
                      <option value="3 a 4">3 a 4 pessoas (Família)</option>
                      <option value="5 ou mais">5 ou mais pessoas (Grupo)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F0EAE1]">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2.5 text-xs sm:text-sm text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#B85526] hover:bg-[#A0451C] text-white text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
                    >
                      Confirmar no WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Lightbox Modal for Poster Banner */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs animate-fadeIn cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#E8E1D7] rounded-xs shadow-2xl max-w-lg w-full p-4 relative"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D7]">
                <h4 className="font-serif font-semibold text-stone-900 text-sm">
                  {lightboxImage.title}
                </h4>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                  aria-label="Fechar cartaz"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xs overflow-hidden max-h-[75vh] flex items-center justify-center bg-stone-100">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                <span className="text-stone-500">
                  Igreja Internacional Tenda · Av. Nordestina, 1839
                </span>
                <a
                  href={lightboxImage.src}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B85526] font-semibold hover:underline"
                >
                  Abrir imagem original
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
