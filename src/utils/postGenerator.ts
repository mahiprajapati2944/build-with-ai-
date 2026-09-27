import { EventData, EventProfile } from '../types';

export function generatePostCopy(
  highlights: string,
  tone: string,
  event: EventData,
  author: EventProfile,
  variantIndex: number = 0
): string {
  const hashtagsString = event.hashtags.join(' ');
  const hostTag = `@${event.hostEntity.replace(/\s+/g, '')}`;

  // Clean prompt highlights
  const cleanHighlights = highlights.trim() || 'Incredible keynote on agentic AI workflows and sustainable cloud scaling. Great meeting the community!';

  if (tone === 'grateful') {
    const variants = [
      `Thrilled to attend Day 1 of ${event.hashtags[0] || '#TechSummit2024'}! 🚀

The morning keynote by ${hostTag} set the tone for where enterprise AI is heading over the next 18 months. Three big takeaways that resonated:

1️⃣ Moving from passive chatbots to autonomous agent workflows.
2️⃣ Data gravity is driving infrastructure closer to the edge.
3️⃣ Community and peer exchange are what make this ecosystem thrive.

Big congratulations to the team at ${event.hostEntity} for organizing an incredible summit! Who else is around San Francisco this week? Let's connect! ☕️

${hashtagsString} #Leadership #ProductManagement`,

      `Such an energizing start to ${event.hashtags[0] || '#TechSummit2024'}! 🌟

Listening to real builders tackle complex architectures reminded me why in-person gatherings matter so much.

My biggest takeaway from today:
"${cleanHighlights}"

Huge gratitude to ${hostTag} and all the organizers for curating such a rich technical agenda. Looking forward to Day 2!

${hashtagsString} #Community #Innovation #TechLeadership`,

      `Grateful for the thought-provoking conversations happening here at ${event.name}! 💡

A key insight that stuck with me today:
${cleanHighlights}

When brilliant minds come together around hard engineering challenges, the entire industry moves forward. Thank you ${hostTag} for creating this space.

Who else is on-site? Would love to say hello!

${hashtagsString} #Networking #Builders #FutureOfWork`,
    ];
    return variants[variantIndex % variants.length];
  }

  if (tone === 'professional') {
    const variants = [
      `Key observations from ${event.name}:

The conversation has clearly shifted from theoretical AI capabilities to sustainable production deployments. 

Key strategic takeaways:
• ${cleanHighlights}
• Architectural simplicity is becoming the ultimate differentiator.
• Organizations that ground autonomy in robust governance will capture outsized velocity.

Commendable execution by ${hostTag} in convening industry leaders around practical roadmaps.

${hashtagsString} #EnterpriseTech #Strategy #Scalability`,

      `Attending ${event.name} with ${author.company}.

The industry is navigating an inflection point where speed-to-value outweighs model parameter count. Today's sessions highlighted:

1. Operationalizing agent workflows with deterministic constraints.
2. ${cleanHighlights}
3. Aligning infrastructure spend with tangible business ROI.

A valuable summit hosted by ${hostTag}. Looking forward to synthesizing these insights into our product roadmap.

${hashtagsString} #ProductStrategy #TechnologyLeadership #EnterpriseAI`,
    ];
    return variants[variantIndex % variants.length];
  }

  if (tone === 'takeaways') {
    const variants = [
      `3 actionable takeaways from ${event.name} that I'm bringing back to my team on Monday:

1. Autonomy requires guardrails: don't build agents without automated evaluation harnesses.
2. ${cleanHighlights}
3. Friction is the enemy: simplify developer and attendee onboarding.

Major kudos to ${event.hostEntity} for delivering substantive technical depth rather than marketing fluff.

What's the best insight you've heard this week?

${hashtagsString} #EngineeringCulture #ProductExcellence #TechTakeaways`,

      `Quick field notes from ${event.hashtags[0] || '#TechSummit2024'}:

📌 Insight 1: ${cleanHighlights}
📌 Insight 2: Data gravity dictates where modern workflows live.
📌 Insight 3: Peer exchange accelerates collective problem solving.

Thanks to ${hostTag} for hosting a stellar gathering!

${hashtagsString} #ActionableInsights #TechConferences #ContinuousLearning`,
    ];
    return variants[variantIndex % variants.length];
  }

  // Thought leadership / Provocative
  return `An unpopular opinion after Day 1 of ${event.name}:

Most organizations are still treating modern AI like a search box, when they should be re-architecting their entire workflow pipeline.

During today's sessions, this became undeniably clear:
"${cleanHighlights}"

The teams winning in this cycle aren't the ones with the largest budgets—they're the ones willing to rethink fundamental assumptions.

Curious: is your team experimenting with autonomous workflows yet, or still evaluating?

${hashtagsString} #ThoughtLeadership #FutureOfTech ${hostTag}`;
}
