export interface EventProfile {
  name: string;
  headline: string;
  avatar: string;
  company: string;
}

export interface EventData {
  id: string;
  name: string;
  hostEntity: string;
  dates: string;
  location: string;
  hashtags: string[];
  profiles: {
    linkedin: string;
    twitter: string;
    website: string;
  };
  metrics: {
    generatedPosts: number;
    impressions: string;
    adoptionRate: string;
    targetMilestone: number;
    currentMilestone: number;
  };
  attendeeUrl: string;
}

export interface PostTone {
  id: string;
  label: string;
  icon?: string;
  description: string;
}

export interface LinkedInPostData {
  id: string;
  author: EventProfile;
  content: string;
  photoUrl: string;
  photoName: string;
  photoSize: string;
  reactions: {
    likes: number;
    celebrates: number;
    hearts: number;
    total: number;
  };
  commentsCount: number;
  repostsCount: number;
  timestamp: string;
  tone: string;
  isLiked?: boolean;
}

export interface SpotlightItem {
  id: string;
  title: string;
  speaker: string;
  stats: string;
  timeAgo: string;
  photoUrl: string;
  samplePost?: string;
}

export interface PostTemplate {
  id: string;
  title: string;
  category: 'Keynote' | 'Networking' | 'Takeaways' | 'Speaker' | 'VIP';
  description: string;
  promptSnippet: string;
  sampleCopy: string;
}
