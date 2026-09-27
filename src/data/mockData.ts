import { EventData, EventProfile, LinkedInPostData, PostTemplate, PostTone, SpotlightItem } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1Uk6p-LoQ5pyC6YFtUHqvMtr102eSRzIyRiH1ypFcBN6Dwi2_A4M8iCfHpTJ3ipsFOd2CpfNuQJvzZiapjFoSbk2m7S59w1vqGzT-vPfQE4_8_ypw2LsmnziGJKWYevd0oWisNSPX1jpUr0LxSKfBzdWcsIPph45yd5JOX2TaDlqpuZgTq9pa1ANflS26e2YHoR30C3nVj5auoSKV9K9_iHI1AyNb-geMedzw_mAaWKi0O8QDfVai-FmC8',
  sarahAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9lcgQt5znR4M-ZgafGvI-J9aK-Y2ilDfbcEeVm2mjZ0w_ie2VfkYbzmz3PhCo8VRzOEuCKSGwLF5dtvqOagypi7N2uHkFzhHCARibgVCrLh2wJ0eo1ow-wNNDgfi5VIye_HFRhfkxG5ltNqwcThTb9b1LytDHo3CjM6w6h9m_nNik_YndWnYHivlRgHE7tcG_MXrYBEAU-9YNLayu1bEAy6JqktptGXhq2FTgGBG0S6w0ds-ov7kO',
  keynotePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4IS7ahA3fzx_clJraNcPCyx1i5mmAel1ERrMuthn5vHklYofuYf_UnIUsdFZrpi2scQ4ghQfKDa9KVUJh0ImtsugUnoBezC4DbL13IIkyjfbpB3N04UVHiHo853EBQxx7EtD_KkClEyHuMVJA4FklzC3-IEjg5EnASuw6fTh2Ae0YwO3LJm_thrEndM-Wlb6J_y3i40AkGCsVDqpfmiwF9gMp6vW_hbCgP2V3ZfG8nsistvRh7En',
  elenaSpeaker: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlU2TStTcXyWCmd7lDXgddWY57JnUIxDcbCFQQpjlnH-D8Hv8o6OYhN7GoDCRrf6BN0ea7wGILS5mvUnzwycawjOoLvAM_UFSTMVAVCFbRGodJ5AOAZOV92ZBBjDZVvXrobk0eMuk721eWhgzb2NoMN96HOonswSdDig8e454WbZs9F7Ewqj67ZlvLPwucsueiAf0FQmn41Y5GhDQ2wybNv3Is7_9RxC65xTQdcVNNdm81jG6CDEUT',
  mainStageCrowd: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOO3JnxLre0nx_ZuT0fyq1zLWVzbbiNVCdXvZthlXbq3hYWRalpTZptZ8jqk9UW5zoDgR5op0OVMrEs2JtM21rA1-wgxrrH593oxuW8odXnWjeHa5SkLOASw6iza6Zpj_SUJOEpas2ygaZZejgB7hfsGT7JTDU32wy-Tj7EkxtjWphdatzAqxt4MnZS3g-OFehvDhmJWXeG7t9SpWiy9MWa0jZ2eEDLbz7VeYUh-u1GHr0VE0IzOnO',
};

export const INITIAL_USER: EventProfile = {
  name: 'Sarah Jenkins',
  headline: 'Senior Product Lead @ CloudFlow | Tech Innovator',
  avatar: ASSETS.sarahAvatar,
  company: 'CloudFlow',
};

export const INITIAL_EVENT: EventData = {
  id: 'tech-summit-2024',
  name: 'Tech Innovation Summit 2024',
  hostEntity: 'PulseScale Technologies',
  dates: 'Oct 24–26, 2024',
  location: 'San Francisco, CA',
  hashtags: ['#TechSummit2024', '#AIInnovation', '#PulseScale'],
  profiles: {
    linkedin: 'linkedin.com/company/pulsescale',
    twitter: '@PulseScaleHQ',
    website: 'summit.pulsescale.io',
  },
  metrics: {
    generatedPosts: 428,
    impressions: '1.2M',
    adoptionRate: '84%',
    targetMilestone: 500,
    currentMilestone: 428,
  },
  attendeeUrl: 'eventpulse.io/attend/tech-summit-2024',
};

export const TONE_OPTIONS: PostTone[] = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Executive summary with strategic foresight and industry impact',
  },
  {
    id: 'grateful',
    label: 'Grateful',
    icon: 'favorite',
    description: 'Warm, appreciative celebration of organizers, speakers and community',
  },
  {
    id: 'takeaways',
    label: 'Takeaways',
    description: 'Bullet-point synthesized action items for peers and engineering teams',
  },
  {
    id: 'thought-leadership',
    label: 'Thought Leader',
    icon: 'lightbulb',
    description: 'Provocative point-of-view challenging conventional status quo',
  },
];

export const INITIAL_POST: LinkedInPostData = {
  id: 'post-1',
  author: INITIAL_USER,
  content: `Thrilled to attend Day 1 of #TechSummit2024! 🚀

The morning keynote by @PulseScale set the tone for where enterprise AI is heading over the next 18 months. Three big takeaways that resonated:

1️⃣ Moving from passive chatbots to autonomous agent workflows.
2️⃣ Data gravity is driving infrastructure closer to the edge.
3️⃣ Community and peer exchange are what make this ecosystem thrive.

Big congratulations to the team at PulseScale Technologies for organizing an incredible summit! Who else is around San Francisco this week? Let's connect! ☕️

#TechSummit2024 #AIInnovation #PulseScale #Leadership #ProductManagement`,
  photoUrl: ASSETS.keynotePhoto,
  photoName: 'keynote-session.jpg',
  photoSize: '2.4 MB • Ready to publish',
  reactions: {
    likes: 31,
    celebrates: 11,
    hearts: 6,
    total: 48,
  },
  commentsCount: 12,
  repostsCount: 3,
  timestamp: 'Just now',
  tone: 'grateful',
  isLiked: false,
};

export const SPOTLIGHTS: SpotlightItem[] = [
  {
    id: 'spot-1',
    title: 'Keynote: GenAI Frontiers',
    speaker: 'Dr. Elena Chen',
    stats: '92 posts drafted',
    timeAgo: '14m ago',
    photoUrl: ASSETS.elenaSpeaker,
    samplePost: 'Mind blown by Dr. Elena Chen\'s framework on multi-agent alignment. We are transitioning from reactive systems to autonomous co-pilots in production.',
  },
  {
    id: 'spot-2',
    title: 'Main Stage: Seed to Scale',
    speaker: 'Fireside Chat',
    stats: '114 quotes shared',
    timeAgo: '38m ago',
    photoUrl: ASSETS.mainStageCrowd,
    samplePost: 'Key quote from the Seed to Scale panel: "Compute efficiency is the new product differentiator." So grateful to be in the room with top founders today!',
  },
  {
    id: 'spot-3',
    title: 'Breakout: Edge AI & Latency',
    speaker: 'Marcus Vance',
    stats: '68 posts drafted',
    timeAgo: '1h ago',
    photoUrl: ASSETS.keynotePhoto,
    samplePost: 'Local-first AI models running sub-20ms inference on client devices. The future of edge computing is already here at #TechSummit2024.',
  },
];

export const TEMPLATES: PostTemplate[] = [
  {
    id: 'tpl-keynote',
    title: 'Keynote Synthesis & Golden Rule',
    category: 'Keynote',
    description: 'Structure a compelling summary of a major keynote speech with 3 sharp numbered points.',
    promptSnippet: 'Keynote takeaways on AI transformation and infrastructure scaling',
    sampleCopy: `Just stepped out of the morning keynote at #TechSummit2024 and my notebook is full.

The biggest revelation?
AI isn't about replacing human judgment; it's about eliminating cognitive drag.

Top 3 insights:
1. Agentic autonomy requires deterministic evaluation guardrails.
2. Speed of iteration beats raw model parameter scale.
3. The best moats are domain data and user workflows.

Hats off to @PulseScale for putting together a world-class gathering.`,
  },
  {
    id: 'tpl-networking',
    title: 'Community & Peer Connection',
    category: 'Networking',
    description: 'Celebrate meeting mentors, peers, and fellow innovators in the hallways and coffee bars.',
    promptSnippet: 'Networking reflections and coffee chat invitations around San Francisco',
    sampleCopy: `The best part of #TechSummit2024 isn't just the stage presentations—it's the hallway track.

Had inspiring conversations this afternoon on scaling distributed systems and sustainable cloud architectures.

If you're in SF for the summit this week, let's grab coffee! What has been your favorite session so far? ☕️

#TechSummit2024 #AIInnovation #Networking`,
  },
  {
    id: 'tpl-takeaways',
    title: 'Tactical Playbook for Your Team',
    category: 'Takeaways',
    description: 'Directly translate conference learnings into actionable engineering or product experiments.',
    promptSnippet: 'Actionable lessons to implement with our product and engineering teams immediately',
    sampleCopy: `3 frameworks from Day 1 of #TechSummit2024 that I'm taking back to my product team on Monday:

✅ Shift from prompt engineering to harness design
✅ Measure time-to-value per user workflow
✅ Build continuous feedback telemetry into client apps

Thank you @PulseScale for sparking new ideas.`,
  },
  {
    id: 'tpl-speaker',
    title: 'Speaker & Panelist Spotlight',
    category: 'Speaker',
    description: 'Highlight a specific speaker with a direct quote, attribution, and your personal interpretation.',
    promptSnippet: 'Highlighting an incredible talk on generative infrastructure and cloud economics',
    sampleCopy: `"The next frontier isn't bigger models—it's smarter pipelines."

Outstanding session today by the keynote panel at #TechSummit2024. Really made me rethink how we approach distributed workloads.

Kudos to the @PulseScale team for curation!`,
  },
];

export const EVENT_PHOTOS = [
  {
    id: 'photo-1',
    name: 'keynote-session.jpg',
    url: ASSETS.keynotePhoto,
    size: '2.4 MB • Ready to publish',
    caption: 'Conference Keynote Presentation',
  },
  {
    id: 'photo-2',
    name: 'speaker-portrait.jpg',
    url: ASSETS.elenaSpeaker,
    size: '1.8 MB • Ready to publish',
    caption: 'Speaker Spotlight Stage',
  },
  {
    id: 'photo-3',
    name: 'amphitheater-crowd.jpg',
    url: ASSETS.mainStageCrowd,
    size: '3.1 MB • Ready to publish',
    caption: 'Main Stage Audience Amphitheater',
  },
];
