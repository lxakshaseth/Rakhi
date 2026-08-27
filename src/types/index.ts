export type SceneId = 
  | 'intro'
  | 'envelope'
  | 'timeline'
  | 'ceremony'
  | 'quiz'
  | 'emotional'
  | 'gift'
  | 'letter'
  | 'finale';

export interface TimelineMemory {
  id: string;
  year: string;
  title: string;
  description: string;
  tag?: string;
  image?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  polaroidRotation?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    reaction: string;
    isWinnerChoice?: boolean;
  }[];
}

export interface EmotionalMessage {
  id: number;
  line: string;
  subtext?: string;
  highlight?: boolean;
}

export interface GiftDemandItem {
  id: string;
  category: string;
  title: string;
  icon: string; // emoji or icon key
  description: string;
  options?: string[];
  isCustom?: boolean;
}

export interface RakhiConfig {
  sisterName: string;
  brotherName: string;
  sisterNickname?: string;
  brotherNickname?: string;
  occasionYear: string;
  brotherPhoneNumber?: string; // Optional WhatsApp phone number for sending invoice
  introTitle: string;
  introSubtitle: string;
  introButtonText: string;
  envelopeText: {
    heading: string;
    subheading: string;
    buttonText: string;
    sealStamp: string;
  };
  timelineTitle: string;
  timelineSubtitle: string;
  timelineMemories: TimelineMemory[];
  ceremony: {
    title: string;
    subtitle: string;
    tilak: {
      instruction: string;
      successTitle: string;
      successSubtitle: string;
    };
    aarti: {
      instruction: string;
      successTitle: string;
      successSubtitle: string;
    };
    rakhiTie: {
      instruction: string;
      successTitle: string;
      successSubtitle: string;
    };
    completionQuote: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    questions: QuizQuestion[];
    result: {
      winnerTitle: string;
      winnerSubtitle: string;
      winnerNote: string;
      badgeText: string;
    };
  };
  emotionalMessages: {
    sectionTitle: string;
    sectionSubtitle: string;
    messages: EmotionalMessage[];
    finalStatement: {
      line1: string;
      line2: string;
    };
  };
  giftBox: {
    title: string;
    subtitle: string;
    buttonText: string;
    insideMessage: string;
    secretLocationClue: string;
    giftNote: string;
    demandSection: {
      title: string;
      subtitle: string;
      giftDemandsList: GiftDemandItem[];
      cashTiers: string[];
    };
  };
  finalLetter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postscript?: string;
  };
  finale: {
    title: string;
    subtitle: string;
    tagline: string;
    replayButtonText: string;
  };
  audio: {
    bgMusicUrl: string;
    defaultVolume: number;
  };
}
