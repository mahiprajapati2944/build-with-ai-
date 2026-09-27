import React, { useState } from 'react';
import { EventData, SpotlightItem } from '../types';
import { SPOTLIGHTS } from '../data/mockData';

interface OrganizerViewProps {
  event: EventData;
  onUpdateEvent: (updated: Partial<EventData>) => void;
  onSwitchToAttendeeView: () => void;
  onOpenQrModal: () => void;
}

export const OrganizerView: React.FC<OrganizerViewProps> = ({
  event,
  onUpdateEvent,
  onSwitchToAttendeeView,
  onOpenQrModal,
}) => {
  const [eventName, setEventName] = useState(event.name);
  const [hostEntity, setHostEntity] = useState(event.hostEntity);
  const [hashtags, setHashtags] = useState<string[]>(event.hashtags);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);
  const [linkedinProfile, setLinkedinProfile] = useState(event.profiles.linkedin);
  const [twitterHandle, setTwitterHandle] = useState(event.profiles.twitter);
  const [websiteUrl, setWebsiteUrl] = useState(event.profiles.website);

  React.useEffect(() => {
    setEventName(event.name);
    setHostEntity(event.hostEntity);
    setHashtags(event.hashtags);
    setLinkedinProfile(event.profiles.linkedin);
    setTwitterHandle(event.profiles.twitter);
    setWebsiteUrl(event.profiles.website);
  }, [event]);

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Spotlight viewer
  const [selectedSpotlight, setSelectedSpotlight] = useState<SpotlightItem | null>(null);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://${event.attendeeUrl}`);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = hashtags.filter((t) => t !== tagToRemove);
    setHashtags(updated);
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    let tag = newTagInput.trim();
    if (!tag.startsWith('#')) {
      tag = `#${tag}`;
    }
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
    setNewTagInput('');
    setShowAddTag(false);
  };

  const handleSaveAndPublish = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateEvent({
        name: eventName,
        hostEntity,
        hashtags,
        profiles: {
          linkedin: linkedinProfile,
          twitter: twitterHandle,
          website: websiteUrl,
        },
      });
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2600);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Active Event Status & Quick Pulse Banner */}
      <div className="w-full bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-3 w-3 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-[#444652] uppercase tracking-wider">
                Live Broadcast
              </span>
              <p className="font-semibold text-base sm:text-lg text-[#131b2e] truncate">
                {event.name}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#6ffbbe] text-[#005236] font-semibold text-xs sm:text-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[16px] mr-1">campaign</span>
            {event.metrics.generatedPosts} Posts
          </span>
        </div>
      </div>

      {/* Card 2: Live Reach Engine (High-Impact Overview & Shareable Link) */}
      <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#eaedff] space-y-5">
        {/* Header with Visual Badge */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e2e7ff] text-[#2f4da8] text-xs font-medium mb-1.5">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              Amplification Active
            </div>
            <h2 className="font-semibold text-xl sm:text-2xl text-[#131b2e]">
              Live Reach Engine
            </h2>
            <p className="text-xs sm:text-sm text-[#444652] flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[15px] text-[#2f4da8]">
                calendar_today
              </span>
              {event.dates} • {event.location}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#2f4da8] shrink-0">
            <span className="material-symbols-outlined text-[22px]">hub</span>
          </div>
        </div>

        {/* Metrics 3-Column Display */}
        <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] rounded-lg p-3 sm:p-4">
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs text-[#444652]">Generated</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-bold text-lg sm:text-2xl text-[#131b2e]">
                {event.metrics.generatedPosts}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>34%
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#757683]">verified posts</span>
          </div>

          <div className="flex flex-col px-1 sm:px-2 border-x border-[#eaedff]">
            <span className="text-[11px] sm:text-xs text-[#444652]">Impressions</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-bold text-lg sm:text-2xl text-[#131b2e]">
                {event.metrics.impressions}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#757683]">LinkedIn feed</span>
          </div>

          <div className="flex flex-col pl-1 sm:pl-2">
            <span className="text-[11px] sm:text-xs text-[#444652]">Adoption</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-bold text-lg sm:text-2xl text-[#131b2e]">
                {event.metrics.adoptionRate}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#757683]">attendee cohort</span>
          </div>
        </div>

        {/* Micro Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[#444652]">
            <span>Target: {event.metrics.targetMilestone} Viral Milestone</span>
            <span className="font-semibold text-[#2f4da8]">
              {((event.metrics.currentMilestone / event.metrics.targetMilestone) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#e2e7ff] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4a66c2] rounded-full transition-all duration-500"
              style={{
                width: `${(event.metrics.currentMilestone / event.metrics.targetMilestone) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Attendee Shareable Link Container */}
        <div className="bg-[#f2f3ff] rounded-lg p-3 sm:p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-semibold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006398]">link</span>
              Attendee Shareable Link
            </label>
            <span className="text-[11px] text-emerald-700 font-semibold bg-[#6ffbbe]/40 px-2 py-0.5 rounded-full">
              Instant Generator Ready
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-md px-3 py-2 shadow-sm border border-[#e2e7ff]">
            <span className="material-symbols-outlined text-[18px] text-[#757683] flex-shrink-0">
              alternate_email
            </span>
            <input
              id="attendee-link-input"
              type="text"
              readOnly
              value={event.attendeeUrl}
              className="bg-transparent font-mono text-xs sm:text-sm text-[#131b2e] flex-1 focus:outline-none truncate selection:bg-[#dce1ff]"
            />
            <button
              id="copy-link-btn"
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy Attendee Link"
              className={`px-3 py-1 rounded text-xs sm:text-sm font-medium flex items-center gap-1 flex-shrink-0 transition-colors ${
                copiedLink
                  ? 'bg-[#6ffbbe] text-[#005236]'
                  : 'bg-[#e2e7ff] text-[#2f4da8] hover:bg-[#dce1ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedLink ? 'check' : 'content_copy'}
              </span>
              <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              id="qr-btn"
              type="button"
              onClick={onOpenQrModal}
              className="py-2.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-[#131b2e] text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 shadow-sm border border-[#eaedff] transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#444652]">
                qr_code_2
              </span>
              Attendee QR
            </button>
            <button
              type="button"
              onClick={onSwitchToAttendeeView}
              className="py-2.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-[#131b2e] text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 shadow-sm border border-[#eaedff] transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#2f4da8]">
                visibility
              </span>
              Preview View
            </button>
          </div>
        </div>
      </div>

      {/* Card 1: Event Setup & Social Amplification Form */}
      <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#eaedff] space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#dce1ff] flex items-center justify-center text-[#00164f]">
              <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-[#131b2e]">Event Setup</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#444652]">
            Configure context and parameters to power personalized attendee posts and executive roundups.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Event Name Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="event-name"
              className="text-xs sm:text-sm font-medium text-[#131b2e] flex items-center justify-between"
            >
              <span>Event Name</span>
              <span className="text-[11px] text-[#757683]">Public Title</span>
            </label>
            <input
              id="event-name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. Global AI Congress"
              className="w-full bg-[#f2f3ff] rounded-lg px-3.5 py-2.5 text-sm text-[#131b2e] placeholder:text-[#757683] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4a66c2] border border-transparent focus:border-[#4a66c2] transition-all"
            />
          </div>

          {/* Organizer Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="organizer-name"
              className="text-xs sm:text-sm font-medium text-[#131b2e] flex items-center justify-between"
            >
              <span>Organizer / Host Entity</span>
              <span className="text-[11px] text-[#757683]">Verified Org</span>
            </label>
            <input
              id="organizer-name"
              type="text"
              value={hostEntity}
              onChange={(e) => setHostEntity(e.target.value)}
              placeholder="e.g. Acme Ventures"
              className="w-full bg-[#f2f3ff] rounded-lg px-3.5 py-2.5 text-sm text-[#131b2e] placeholder:text-[#757683] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4a66c2] border border-transparent focus:border-[#4a66c2] transition-all"
            />
          </div>

          {/* Official Hashtags Section */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-[#131b2e] flex items-center justify-between">
              <span>Official Amplification Hashtags</span>
              <span className="text-[11px] text-[#757683]">Injected automatically</span>
            </label>
            <div className="flex flex-wrap gap-1.5 items-center p-2.5 rounded-lg bg-[#f2f3ff] min-h-[46px] border border-transparent focus-within:border-[#4a66c2]">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-[#2f4da8] text-xs font-mono font-medium shadow-sm border border-[#e2e7ff]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                    className="text-[#444652] hover:text-red-600 ml-0.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}

              {showAddTag ? (
                <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#4a66c2]">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="#NewTag"
                    className="text-xs font-mono w-24 focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="text-xs font-semibold text-[#2f4da8]"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddTag(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e2e7ff] text-[#444652] hover:text-[#131b2e] text-xs font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  Add tag
                </button>
              )}
            </div>
          </div>

          {/* Target Profiles & Landing */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-[#131b2e]">
                Target Profiles &amp; Landing
              </label>
              <span className="text-[11px] text-[#757683]">Auto-tagged in posts</span>
            </div>
            <div className="space-y-2">
              {/* LinkedIn */}
              <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-transparent focus-within:bg-white focus-within:border-[#4a66c2] transition-all">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-[#dce1ff] text-[#2f4da8] mr-2.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">work</span>
                </span>
                <input
                  type="text"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  placeholder="LinkedIn company profile URL"
                  className="w-full bg-transparent font-mono text-xs sm:text-sm text-[#131b2e] focus:outline-none truncate"
                />
              </div>

              {/* Twitter / X */}
              <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-transparent focus-within:bg-white focus-within:border-[#4a66c2] transition-all">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-[#dae2fd] text-[#131b2e] mr-2.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">tag</span>
                </span>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="Twitter/X handle"
                  className="w-full bg-transparent font-mono text-xs sm:text-sm text-[#131b2e] focus:outline-none truncate"
                />
              </div>

              {/* Website */}
              <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-transparent focus-within:bg-white focus-within:border-[#4a66c2] transition-all">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-[#cce5ff] text-[#004b73] mr-2.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">language</span>
                </span>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="Official event website"
                  className="w-full bg-transparent font-mono text-xs sm:text-sm text-[#131b2e] focus:outline-none truncate"
                />
              </div>
            </div>
          </div>

          {/* Action Button: Save & Publish */}
          <div className="pt-2">
            <button
              id="publish-btn"
              type="button"
              disabled={isSaving}
              onClick={handleSaveAndPublish}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#4a66c2] hover:bg-[#2f4da8] text-white'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isSaving ? 'animate-spin' : ''
                }`}
              >
                {isSaving ? 'refresh' : savedSuccess ? 'task_alt' : 'check_circle'}
              </span>
              <span>
                {isSaving
                  ? 'Saving Updates...'
                  : savedSuccess
                  ? 'Event Live & Synced!'
                  : 'Save & Publish Event'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Attendee Spotlights Section */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-semibold text-base sm:text-lg text-[#131b2e]">
            Live Attendee Spotlights
          </span>
          <span className="text-xs font-semibold text-[#2f4da8] bg-[#dce1ff] px-2.5 py-0.5 rounded-full">
            Real-time
          </span>
        </div>

        <div className="space-y-2">
          {SPOTLIGHTS.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-sm border border-[#eaedff] hover:border-[#4a66c2] transition-colors"
            >
              <img
                src={spot.photoUrl}
                alt={spot.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm sm:text-base text-[#131b2e] truncate">
                    {spot.title}
                  </p>
                  <span className="text-[11px] text-emerald-700 font-medium">{spot.timeAgo}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#444652] truncate">
                  {spot.speaker} • {spot.stats}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSpotlight(spot)}
                title="View spotlight quote"
                className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] flex items-center justify-center text-[#2f4da8] flex-shrink-0 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Spotlight Details Modal */}
      {selectedSpotlight && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img
                  src={selectedSpotlight.photoUrl}
                  alt={selectedSpotlight.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base text-[#131b2e]">
                    {selectedSpotlight.title}
                  </h4>
                  <p className="text-xs text-[#444652]">{selectedSpotlight.speaker}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpotlight(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-lg text-sm text-[#131b2e] italic">
              "{selectedSpotlight.samplePost}"
            </div>

            <div className="flex justify-between items-center text-xs text-[#757683]">
              <span>Active in attendee feeds</span>
              <span className="font-semibold text-emerald-700">{selectedSpotlight.stats}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard && selectedSpotlight.samplePost) {
                  navigator.clipboard.writeText(selectedSpotlight.samplePost);
                }
                setSelectedSpotlight(null);
                alert('Spotlight quote copied to clipboard!');
              }}
              className="w-full py-2.5 rounded-lg bg-[#2f4da8] text-white font-medium text-sm hover:bg-[#4a66c2] transition-colors"
            >
              Copy Quote for Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
