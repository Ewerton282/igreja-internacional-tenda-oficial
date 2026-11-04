export interface ServiceSchedule {
  id: string;
  day: string;
  time: string;
  title: string;
  description: string;
  category: 'celebration' | 'study' | 'youth' | 'prayer';
}

export interface SermonMessage {
  id: string;
  title: string;
  speaker: string;
  role: string;
  date: string;
  series: string;
  scripture: string;
  duration: string;
  audioUrl?: string;
  videoPlaceholderUrl?: string;
  keyThought: string;
  notes: string[];
}

export interface Ministry {
  id: string;
  name: string;
  kicker: string;
  description: string;
  leader: string;
  meetingTime: string;
  image: string;
  highlight: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  category: 'Geral' | 'Família' | 'Jovens' | 'Ação Social';
  date: string;
  time: string;
  location: string;
  description: string;
  isRegistrationRequired: boolean;
  registrationSpotsLeft?: number;
}

export interface SmallGroup {
  id: string;
  name: string;
  neighborhood: string;
  dayTime: string;
  leader: string;
  focus: string;
  spotsOpen: boolean;
}
