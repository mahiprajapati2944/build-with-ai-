import React from 'react';
import { EventData } from '../types';

interface AnalyticsViewProps {
  event: EventData;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ event }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#2f4da8] text-[22px]">monitoring</span>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#131b2e]">
                Amplification Analytics
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#444652]">
              Real-time telemetry tracking attendee posts, impressions, and viral diffusion.
            </p>
          </div>
          <button
            onClick={() => alert('Analytics export downloaded (CSV)')}
            className="px-3 py-1.5 rounded-lg border border-[#eaedff] text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3.5 bg-[#f2f3ff] rounded-lg">
            <span className="text-[11px] text-[#444652]">Total Generated</span>
            <p className="text-xl sm:text-2xl font-bold text-[#131b2e] mt-0.5">
              {event.metrics.generatedPosts}
            </p>
            <span className="text-[10px] text-emerald-700 font-semibold">+34% vs last day</span>
          </div>

          <div className="p-3.5 bg-[#f2f3ff] rounded-lg">
            <span className="text-[11px] text-[#444652]">Feed Impressions</span>
            <p className="text-xl sm:text-2xl font-bold text-[#131b2e] mt-0.5">
              {event.metrics.impressions}
            </p>
            <span className="text-[10px] text-emerald-700 font-semibold">120K / hour peak</span>
          </div>

          <div className="p-3.5 bg-[#f2f3ff] rounded-lg">
            <span className="text-[11px] text-[#444652]">Cohort Adoption</span>
            <p className="text-xl sm:text-2xl font-bold text-[#131b2e] mt-0.5">
              {event.metrics.adoptionRate}
            </p>
            <span className="text-[10px] text-[#757683]">428 of 510 attendees</span>
          </div>

          <div className="p-3.5 bg-[#f2f3ff] rounded-lg">
            <span className="text-[11px] text-[#444652]">Avg Engagements</span>
            <p className="text-xl sm:text-2xl font-bold text-[#131b2e] mt-0.5">63.4</p>
            <span className="text-[10px] text-[#757683]">per attendee post</span>
          </div>
        </div>
      </div>

      {/* Hourly Velocity Chart Simulator */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#eaedff] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base sm:text-lg text-[#131b2e]">
            Hourly Post Generation Velocity
          </h3>
          <span className="text-xs text-[#757683]">Summit Day 1 (Peak: 10:00 AM Keynote)</span>
        </div>

        <div className="h-44 w-full flex items-end gap-2 pt-6 pb-2 border-b border-[#eaedff]">
          {[
            { time: '8 AM', val: 24, label: 'Breakfast & Registration' },
            { time: '9 AM', val: 45, label: 'Opening Welcome' },
            { time: '10 AM', val: 98, label: 'Morning Keynote (Peak)' },
            { time: '11 AM', val: 78, label: 'Panel Discussions' },
            { time: '12 PM', val: 56, label: 'Lunch & Networking' },
            { time: '1 PM', val: 62, label: 'Afternoon Breakouts' },
            { time: '2 PM', val: 84, label: 'Demo Showcase' },
            { time: '3 PM', val: 52, label: 'Afternoon Tea' },
          ].map((bar, i) => (
            <div key={bar.time} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div
                className="w-full bg-[#4a66c2] group-hover:bg-[#2f4da8] rounded-t transition-all duration-300 relative cursor-pointer"
                style={{ height: `${(bar.val / 100) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none">
                  {bar.val} posts • {bar.label}
                </div>
              </div>
              <span className="text-[10px] text-[#757683] font-mono mt-1">{bar.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Amplifiers & Hashtag Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hashtag Performance */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <h3 className="font-semibold text-base text-[#131b2e]">Top Injected Hashtags</h3>
          <div className="space-y-2.5">
            {[
              { tag: '#TechSummit2024', count: 428, share: '100%' },
              { tag: '#AIInnovation', count: 392, share: '91.5%' },
              { tag: '#PulseScale', count: 364, share: '85.0%' },
              { tag: '#Leadership', count: 184, share: '43.0%' },
            ].map((item) => (
              <div key={item.tag} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-[#2f4da8] font-medium">{item.tag}</span>
                  <span className="text-[#444652]">{item.count} posts ({item.share})</span>
                </div>
                <div className="w-full h-1.5 bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2f4da8] rounded-full"
                    style={{ width: item.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Influencers */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <h3 className="font-semibold text-base text-[#131b2e]">Top Attendee Amplifiers</h3>
          <div className="space-y-2.5">
            {[
              { name: 'Sarah Jenkins', role: 'Senior Product Lead', eng: '1.4K views', badge: '🥇 #1' },
              { name: 'Dr. Elena Chen', role: 'Keynote Speaker', eng: '1.2K views', badge: '🥈 #2' },
              { name: 'Marcus Vance', role: 'VP Engineering', eng: '940 views', badge: '🥉 #3' },
              { name: 'Priya Sharma', role: 'AI Researcher', eng: '820 views', badge: '#4' },
            ].map((inf) => (
              <div
                key={inf.name}
                className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] text-xs"
              >
                <div>
                  <p className="font-semibold text-[#131b2e]">{inf.name}</p>
                  <p className="text-[11px] text-[#757683]">{inf.role}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-[#2f4da8]">{inf.eng}</span>
                  <p className="text-[10px] text-emerald-700">{inf.badge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
