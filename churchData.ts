export const CHURCH_INFO = {
  name: 'Igreja Internacional Tenda',
  tagline: '"Alarga o espaço da tua tenda" — Isaías 54:2. Um lugar de encontro com Deus, para todas as nações.',
  address: 'Av. Nordestina, 1839 - São Miguel Paulista',
  city: 'São Paulo - SP · CEP 08042-000',
  foundedDate: '30 de dezembro de 2021',
  phone: '(11) 95970-5669',
  whatsapp: '(11) 95970-5669',
  email: 'IgrejainternacionalTenda@gmail.com',
  pixKey: '44.705.310/0001-87',
  pixCopiaECola: '00020101021126350013BR.GOV.BR.PIX0114447053100001875204000053039865802BR5926IGREJA INTERNACIONAL TENDA6009SAO PAULO62070503***6304ABC2',
  cnpj: '44.705.310/0001-87',
  logo: '/assets/church/logo_tenda_official.png',
  heroBg: '/assets/church/hero_tent_clean.png',
  ministeriosBanner: '/assets/images/church_kids_ministry_1793125685667.jpg',
  qrCode: '/assets/church/pix_qr_code.png',
  mapPreview: '/assets/church/map_preview.png',
  social: {
    instagram: 'https://www.instagram.com/igrejatenda12?obrf=b2V0bzF2czRkNHNp',
    instagramHandle: '@igrejatenda12',
    youtube: 'https://youtube.com/@igrejainternacionaltenda8866?si=VjHWey_eSAFzZc23',
    youtubeHandle: '@igrejainternacionaltenda8866',
    facebook: 'https://www.facebook.com/share/1DxguxwoRD/',
    whatsappUrl: 'https://wa.me/5511959705669?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Igreja%20Internacional%20Tenda',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Nordestina,+1839+-+S%C3%A3o+Miguel+Paulista,+S%C3%A3o+Paulo+-+SP',
};

export const CULTOS = [
  {
    day: 'DOMINGO',
    time: '10h às 12h',
    title: 'Culto da Família',
  },
  {
    day: 'SEXTA',
    time: '19h às 20h',
    title: 'Culto de Oração',
  },
  {
    day: '2º SÁBADO',
    time: '19h às 21h',
    title: 'Culto dos Jovens',
  },
];

export interface CelulaItem {
  id: string;
  day: string;
  time: string;
  title: string;
  leader: string;
  desc: string;
  tag?: string;
}

export const CELULAS: CelulaItem[] = [
  {
    id: 'cel-jovens',
    day: 'SÁBADO',
    time: '18h',
    title: 'Célula de Jovens',
    leader: 'Gabriel',
    desc: 'Comunhão, adoração e fortalecimento na fé para a juventude.',
    tag: 'Juventude',
  },
  {
    id: 'cel-janta',
    day: 'SEGUNDA',
    time: '19h',
    title: 'Célula da Janta',
    leader: 'Pastor Mauro Silva',
    desc: 'Comunhão especial ao redor da mesa com partilha da Palavra e jantar fraterno.',
    tag: 'Comunhão à Mesa',
  },
  {
    id: 'cel-bolo',
    day: 'QUINTA',
    time: '20h',
    title: 'Célula do Bolo',
    leader: 'Pastor Mauro Silva',
    desc: 'Café acolhedor, bolo e edificação bíblica em ambiente familiar.',
    tag: 'Café & Palavra',
  },
];

export const TEOLOGIA = {
  day: 'TERÇA',
  time: '20h',
  title: 'Aula de Teologia',
  leader: 'Apóstola Patrícia Lobatchevsky',
  desc: 'Aprofundamento bíblico, raízes da fé cristã e capacitação ministerial para toda a igreja.',
  tag: 'Escola de Ensino',
};

export const VALORES = [
  {
    title: 'Deus no centro',
    desc: 'Adoração e oração movem tudo o que fazemos.',
  },
  {
    title: 'Acolhimento',
    desc: 'Aqui todos têm lugar, sem julgamento e sem pressa.',
  },
  {
    title: 'Família',
    desc: 'Cuidamos uns dos outros de perto, nas células.',
  },
  {
    title: 'Palavra',
    desc: 'A Bíblia é a base da nossa fé e das nossas decisões.',
  },
  {
    title: 'Serviço',
    desc: 'Usamos nossos dons para abençoar a nossa cidade.',
  },
];

export interface MinisterioItem {
  id: string;
  title: string;
  category: string;
  leader?: string;
  target?: string;
  schedule?: string;
  desc: string;
  highlights?: string[];
  isFeatured?: boolean;
}

export const MINISTERIOS: MinisterioItem[] = [
  {
    id: 'kids',
    title: 'Ministério Kids (Tenda Kids)',
    category: 'Infantil',
    leader: 'Acsa',
    target: 'Crianças de 0 a 11 anos',
    schedule: 'Domingos às 10h (durante o Culto da Família)',
    desc: 'Um ambiente seguro, acolhedor e cheio de alegria para ensinar os princípios da Palavra de Deus às crianças com atividades lúdicas, louvor e oficinas bíblicas.',
    highlights: ['Salas adaptadas por faixa etária', 'Ensino bíblico contextualizado', 'Cuidado, amor e diversão'],
    isFeatured: true,
  },
  {
    id: 'jovens',
    title: 'Ministério de Jovens',
    category: 'Juventude',
    leader: 'Pr. Mauro Silva e Ágata',
    target: 'Adolescentes e Jovens',
    schedule: 'Sábados às 18h (Célula) & Cultos',
    desc: 'Fé viva, amizades com propósito e capacitação da nova geração para viver o Evangelho com ousadia e paixão por Cristo.',
    highlights: ['Célula de Jovens aos sábados', 'Discipulado prático', 'Encontros de comunhão'],
  },
  {
    id: 'louvor',
    title: 'Louvor & Adoração',
    category: 'Adoração',
    leader: 'Agnes',
    target: 'Músicos e Ministros de Adoração',
    schedule: 'Ensaios semanais & Ministrações nos Cultos',
    desc: 'Conduzir a congregação à presença manifesta do Espírito Santo através de canções de adoração, entrega e louvor sincero ao Senhor.',
    highlights: ['Vozes e instrumental', 'Unção e comunhão', 'Sensibilidade ao Espírito Santo'],
  },
  {
    id: 'oracao',
    title: 'Ministério de Oração & Intercessão',
    category: 'Oração',
    leader: 'Alexandre',
    target: 'Toda a igreja e comunidade',
    schedule: 'Sextas-feiras às 19h (Culto de Oração) & Vigílias',
    desc: 'Sustentando as famílias, a liderança e os pedidos de intercessão da igreja no altar diante de Deus.',
    highlights: ['Mural de orações', 'Intercessão constante', 'Clamor pela cidade e vidas'],
  },
  {
    id: 'midia',
    title: 'Mídia, Comunicação & Tecnologia',
    category: 'Comunicação',
    leader: 'Fernando, Nicolle & Ewerton',
    target: 'Transmissão, Design e Tecnologia',
    schedule: 'Durante todos os cultos e eventos',
    desc: 'Levando a mensagem de Cristo além das quatro paredes através de transmissões ao vivo, mídias sociais, som, iluminação e fotografia.',
    highlights: ['Transmissões ao vivo', 'Cobertura fotográfica e redes', 'Mesa de som e projeção'],
  },
  {
    id: 'limpeza',
    title: 'Limpeza & Organização',
    category: 'Zelo & Cuidado',
    leader: 'Gabriel',
    target: 'Serviço e mordomia na casa de Deus',
    schedule: 'Preparação semanal & pós-cultos',
    desc: 'Cuidando com zelo, amor e excelência da casa do Senhor para que todos encontrem um ambiente limpo, agradável e acolhedor.',
    highlights: ['Zelo e cuidado com a Tenda', 'Organização dos espaços', 'Amor manifestado em serviço'],
  },
  {
    id: 'secretaria',
    title: 'Secretaria & Administração',
    category: 'Administração & Apoio',
    leader: 'Raissa',
    target: 'Membros, liderança e atendimento da igreja',
    schedule: 'Atendimento e suporte contínuo',
    desc: 'Atendimento aos membros e visitantes, cadastros de membresia, certificados de batismo, cartas de recomendação e suporte administrativo integral à igreja.',
    highlights: ['Atendimento a membros e visitantes', 'Documentação e certificados eclesiásticos', 'Organização e secretaria geral'],
  },
  {
    id: 'teologia',
    title: 'Escola de Teologia & Ensino',
    category: 'Capacitação',
    leader: 'Apóstola Patrícia Lobatchevsky',
    target: 'Membros, líderes e obreiros',
    schedule: 'Terças-feiras às 20h',
    desc: 'Aprofundamento nas Sagradas Escrituras, teologia bíblica prática e formação de discípulos fortes na fé.',
    highlights: ['Aulas presenciais com Apóstola Patrícia', 'Material didático bíblico', 'Formação ministerial'],
  },
  {
    id: 'cozinha',
    title: 'Ministério da Cozinha & Apoio',
    category: 'Comunhão & Serviço',
    leader: 'Obreira Luíza',
    target: 'Comunhão à mesa e apoio aos eventos',
    schedule: 'Encontros, cafés fraternos e eventos especiais',
    desc: 'Servindo com amor, dedicação e zelo para promover a comunhão ao redor da mesa em cafés, jantares fraternos e conferências da Tenda.',
    highlights: ['Apoio a todos os eventos e cultos especiais', 'Cuidado e dedicação em cada detalhe', 'Comunhão e acolhimento à mesa'],
  },
  {
    id: 'implantacao',
    title: 'Implantação da Igreja pelo Mundo',
    category: 'Missões Globais',
    leader: 'Apóstolo Christiam Lobatchevsky',
    target: 'Nações, expansão e missões internacionais',
    schedule: 'Projetos missionários e novas frentes',
    desc: 'Alargar o espaço da tenda e estender as estacas do Reino de Deus por todas as nações, capacitando pioneiros e implantando igrejas com propósito bíblico sólido.',
    highlights: ['Visão apostólica e expansão global', 'Alcance a novas cidades e nações', 'Treinamento e envio de obreiros'],
  },
  {
    id: 'acolhimento',
    title: 'Acolhimento & Diaconia',
    category: 'Hospitalidade',
    leader: 'Raissa',
    target: 'Visitantes e Membros',
    schedule: 'Recepção em todos os cultos',
    desc: 'Receber cada pessoa com o abraço e o amor de Cristo, acolhendo novos visitantes e cuidando do bem-estar na Tenda.',
    highlights: ['Recepção calorosa na entrada', 'Apoio aos novos convertidos', 'Aconselhamento inicial'],
  },
];

export const LIDERES = [
  {
    name: 'Christian Lobatchevsky',
    role: 'APÓSTOLO',
    image: '/assets/church/leader_christiam.jpg,
  },
  {
    name: 'Patrícia Lobatchevsky',
    role: 'APÓSTOLA',
    image: '/assets/church/leader_patricia.jpg?,
  },
  {
    name: 'Mauro Silva',
    role: 'PASTOR',
    image: '/assets/church/leader_mauro.jpg,
  },
];

export interface Testemunho {
  id: string;
  name: string;
  city?: string;
  category?: string;
  highlight: string;
  text: string;
  date: string;
}

// Comentários pré-preenchidos removidos conforme solicitado.
// Os relatos exibidos virão de testemunhos enviados diretamente pelos visitantes do site.
export const TESTEMUNHOS: Testemunho[] = [];

export interface EventoItem {
  id: string;
  title: string;
  dateBadge: {
    day: string;
    month: string;
  };
  time: string;
  dayOfWeek: string;
  category: 'Culto Especial' | 'Vigília' | 'Juventude' | 'Família' | 'Ensino';
  location: string;
  description: string;
  highlight?: string;
  bannerImage?: string;
  isFeatured?: boolean;
  badgeText?: string;
}

export const EVENTOS: EventoItem[] = [
  {
    id: 'evento-culto-jovens',
    title: 'Culto dos Jovens — Juventude Tenda',
    dateBadge: { day: '2º Sáb', month: 'MENSAL' },
    time: '19h às 21h',
    dayOfWeek: 'Todo Segundo Sábado do Mês',
    category: 'Juventude',
    location: 'Templo Principal · Av. Nordestina, nº 1839',
    description: 'Uma noite poderosa de adoração vibrante, comunhão verdadeira e palavra viva para a juventude! Um encontro para adolescentes e jovens se conectarem com Deus e viverem o propósito do Reino.',
    highlight: '“Ninguém o despreze pelo fato de você ser jovem, mas seja um exemplo para os fiéis na palavra, no procedimento, no amor, na fé e na pureza.” (1 Timóteo 4:12) — Traga seus amigos!',
    bannerImage: '/public/assets/church/culto_jovens.jpg',
    isFeatured: true,
    badgeText: 'CULTOS MENSAIS DA JUVENTUDE',
  },
  {
    id: 'evento-santa-ceia',
    title: 'Santa Ceia do Senhor',
    dateBadge: { day: '2º Dom', month: 'MENSAL' },
    time: '10h às 12h',
    dayOfWeek: 'Todo Segundo Domingo do Mês',
    category: 'Culto Especial',
    location: 'Templo Principal · Av. Nordestina, nº 1839',
    description: 'Celebração solene em memória do sacrifício e comunhão com Cristo. Momento sagrado de partir o pão, participar do cálice e renovar nossa aliança como família da fé.',
    highlight: '“Porque, sempre que comerem deste pão e beberem deste cálice, vocês anunciam a morte do Senhor até que ele venha.” (1 Coríntios 11:26) — Fazei isto em memória de Mim.',
    bannerImage: '/assets/aistudio/91580c8e5d6c61d6d735b79b4e3b2279_4c6f71a9.jpg',
  },
];

export interface PedidoOracaoItem {
  id: string;
  name: string;
  city?: string;
  category: string;
  text: string;
  date: string;
  isConfidential: boolean;
  prayCount: number;
}

export const CATEGORIAS_ORACAO = [
  'Saúde & Cura',
  'Família & Casamento',
  'Portas de Emprego & Finanças',
  'Libertação & Paz Interior',
  'Filhos & Juventude',
  'Causa Impossível & Justiça',
  'Crescimento Espiritual',
  'Outro Motivo',
];


