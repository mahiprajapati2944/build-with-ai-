import React, { useState } from 'react';
import { EventData, EventProfile, LinkedInPostData } from '../types';
import { TONE_OPTIONS } from '../data/mockData';
import { generatePostCopy } from '../utils/postGenerator';

interface AttendeeViewProps {
  event: EventData;
  user: EventProfile;
  post: LinkedInPostData;
  onUpdatePost: (updated: Partial<LinkedInPostData>) => void;
  onOpenPhotoPicker: () => void;
}

export const AttendeeView: React.FC<AttendeeViewProps> = ({
  event,
  user,
  post,
  onUpdatePost,
  onOpenPhotoPicker,
}) => {
  const [highlights, setHighlights] = useState(
    'Incredible keynote on agentic AI workflows and sustainable cloud scaling. Great meeting the community!'
  );
  const [selectedTone, setSelectedTone] = useState<string>('grateful');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.reactions.total);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleGenerate = (newTone?: string) => {
    setIsGenerating(true);
    const toneToUse = newTone || selectedTone;
    setTimeout(() => {
      const nextIndex = variantIndex + 1;
      setVariantIndex(nextIndex);
      const newContent = generatePostCopy(highlights, toneToUse, event, user, nextIndex);
      onUpdatePost({
        content: newContent,
        tone: toneToUse,
      });
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleToggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleToneSelect = (toneId: string) => {
    setSelectedTone(toneId);
    handleGenerate(toneId);
  };

  const handleRemovePhoto = () => {
    onUpdatePost({
      photoUrl: '',
      photoName: 'No media attached',
      photoSize: '0 MB',
    });
  };

  // Generate current content if empty, and build LinkedIn share intent URL
  const currentPostContent =
    post.content || generatePostCopy(highlights, selectedTone, event, user, variantIndex);

  const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
    currentPostContent
  )}`;

  const handleOpenLinkedInClick = () => {
    // 1. Ensure latest post is generated and in state
    const textToShare =
      post.content || generatePostCopy(highlights, selectedTone, event, user, variantIndex);
    if (!post.content) {
      onUpdatePost({ content: textToShare });
    }

    // 2. Copy text to clipboard immediately so the user has it ready
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare).catch(() => {});
    }

    // 3. Show feedback
    setShareFeedback('Post text copied to clipboard! Opening LinkedIn...');
    setTimeout(() => setShareFeedback(null), 4000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Event Context Banner Card */}
      <div className="bg-white rounded-xl border border-[#eaedff] shadow-[0_1px_3px_0_rgba(15,23,42,0.06)] p-4 sm:p-5 transition-all">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#2f4da8] shrink-0">
            <span className="material-symbols-outlined text-[26px]">terminal</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-base sm:text-lg text-[#131b2e] truncate">
                {event.name}
              </span>
              <span
                className="material-symbols-outlined text-[16px] text-[#2f4da8]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <span className="text-xs sm:text-sm text-[#444652] truncate">
              Hosted by {event.hostEntity}
            </span>
          </div>
        </div>

        {/* Clickable Social Tags Horizontal Row */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-3.5 no-scrollbar">
          {event.hashtags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                if (!highlights.includes(tag)) {
                  setHighlights((prev) => `${prev} ${tag}`);
                }
              }}
              className="bg-[#f2f3ff] text-[#2f4da8] px-3 py-1 rounded-full text-xs font-mono shrink-0 hover:bg-[#e2e7ff] transition-colors"
            >
              {tag}
            </button>
          ))}
          <button
            type="button"
            className="bg-[#f2f3ff] text-[#444652] px-3 py-1 rounded-full text-xs font-mono shrink-0 hover:bg-[#e2e7ff] transition-colors"
          >
            @{event.hostEntity.replace(/\s+/g, '')}
          </button>
          <a
            href={`https://${event.profiles.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f2f3ff] text-[#444652] px-3 py-1 rounded-full text-xs font-mono shrink-0 flex items-center space-x-1 hover:bg-[#e2e7ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">link</span>
            <span>{event.profiles.website}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Control Workspace & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Post Generator Inputs (5 or 6 cols on desktop) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl border border-[#eaedff] shadow-[0_1px_3px_0_rgba(15,23,42,0.06)] p-4 sm:p-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[#2f4da8] text-[20px]">
                  magic_button
                </span>
                <h2 className="font-semibold text-base sm:text-lg text-[#131b2e]">
                  Create Your LinkedIn Post
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#444652] uppercase tracking-wider">
                Step 1 of 2
              </span>
            </div>

            {/* Photo Upload / Attachment Area */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-medium text-[#131b2e]">
                Event Photo Attachment
              </label>
              <div className="bg-[#f2f3ff] rounded-lg p-3 flex flex-col space-y-2">
                {post.photoUrl ? (
                  /* Preloaded Active Media Card */
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm border border-[#e2e7ff]">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={post.photoUrl}
                        alt="Attached event media"
                        className="w-12 h-12 object-cover rounded shrink-0 border border-slate-200"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-sm font-medium text-[#131b2e] truncate">
                          {post.photoName || 'keynote-session.jpg'}
                        </span>
                        <span className="text-[11px] text-[#444652]">
                          {post.photoSize || '2.4 MB • Ready to publish'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        type="button"
                        onClick={onOpenPhotoPicker}
                        title="Swap photo"
                        aria-label="Change photo"
                        className="p-1.5 rounded text-[#444652] hover:text-[#2f4da8] hover:bg-[#f2f3ff] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">cached</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        title="Remove photo"
                        aria-label="Remove photo"
                        className="p-1.5 rounded text-[#444652] hover:text-red-600 hover:bg-[#f2f3ff] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 text-center bg-white rounded-lg border border-dashed border-[#c4c5d4]">
                    <p className="text-xs text-[#444652]">No photo attached.</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onOpenPhotoPicker}
                  className="flex items-center justify-center py-2 text-[#444652] hover:text-[#2f4da8] space-x-1.5 text-xs sm:text-sm font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add_photo_alternate
                  </span>
                  <span>Tap to swap photo or take a selfie</span>
                </button>
              </div>
            </div>

            {/* Highlights Input Field */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="takeaway-input"
                  className="text-xs sm:text-sm font-medium text-[#131b2e]"
                >
                  Key Highlights / Takeaways
                </label>
                <span className="text-[11px] font-medium text-[#2f4da8] bg-[#dce1ff] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  AI-Enhanced
                </span>
              </div>
              <div className="relative w-full">
                <textarea
                  id="takeaway-input"
                  rows={3}
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  placeholder="What resonated with you the most during this session?"
                  className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-lg p-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4a66c2] transition-all resize-none shadow-inner border border-transparent focus:border-[#4a66c2]"
                />
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 pointer-events-none">
                  <span className="text-xs font-mono text-[#757683]">
                    {highlights.length} chars
                  </span>
                </div>
              </div>

              {/* Quick inspiration chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
                <span className="text-[11px] text-[#757683] shrink-0">Quick prompts:</span>
                {[
                  'Agentic AI workflows',
                  'Cloud cost reduction',
                  'Networking with founders',
                  'Keynote takeaways',
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setHighlights((prev) =>
                        prev ? `${prev}. Also: ${chip}` : `Key insights on ${chip}`
                      );
                    }}
                    className="text-[11px] bg-slate-100 hover:bg-[#dce1ff] text-[#444652] hover:text-[#2f4da8] px-2 py-0.5 rounded transition-colors shrink-0 cursor-pointer"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector Chips */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-medium text-[#131b2e]">
                Post Tone &amp; Narrative
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TONE_OPTIONS.slice(0, 3).map((tone) => {
                  const isActive = selectedTone === tone.id;
                  return (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => handleToneSelect(tone.id)}
                      className={`py-2 px-2 rounded-lg text-xs sm:text-sm font-medium text-center transition-all flex items-center justify-center space-x-1 ${
                        isActive
                          ? 'bg-[#2f4da8] text-white shadow-sm'
                          : 'bg-[#f2f3ff] text-[#444652] hover:bg-[#e2e7ff]'
                      }`}
                    >
                      {tone.icon && (
                        <span
                          className="material-symbols-outlined text-[15px]"
                          style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          {tone.icon}
                        </span>
                      )}
                      <span className="truncate">{tone.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button: Generate */}
            <button
              id="generate-button"
              type="button"
              disabled={isGenerating}
              onClick={() => handleGenerate()}
              className="w-full bg-[#4a66c2] hover:bg-[#2f4da8] text-white py-3 px-4 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-[0_4px_12px_rgba(74,102,194,0.25)] active:scale-[0.99] transition-all disabled:opacity-70 cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isGenerating ? 'animate-spin' : 'animate-pulse'
                }`}
              >
                {isGenerating ? 'refresh' : 'auto_awesome'}
              </span>
              <span>{isGenerating ? 'Synthesizing with AI...' : 'Generate LinkedIn Post'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Authentic Live LinkedIn Post Preview (6 cols on desktop) */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#2f4da8] text-[20px]">
                visibility
              </span>
              <h2 className="font-semibold text-base sm:text-lg text-[#131b2e]">
                Live LinkedIn Post Preview
              </h2>
            </div>
            <div className="flex items-center space-x-1 bg-[#6ffbbe] text-[#005236] px-2.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="text-[11px] font-semibold">Verified Template</span>
            </div>
          </div>

          {/* Authentic LinkedIn Feed Simulator Card */}
          <div className="bg-white rounded-xl border border-[#c4c5d4]/40 shadow-[0_2px_8px_0_rgba(15,23,42,0.08)] overflow-hidden">
            {/* LinkedIn Top Meta Bar */}
            <div className="p-4 pb-2 flex items-start justify-between">
              <div className="flex space-x-3 items-center">
                <img
                  src={user.avatar}
                  alt={`${user.name} portrait`}
                  className="w-12 h-12 rounded-full object-cover shrink-0 shadow-sm border border-slate-200"
                />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm sm:text-base text-[#131b2e] leading-snug">
                      {user.name}
                    </span>
                    <span className="text-xs text-[#757683] font-normal">• 1st</span>
                  </div>
                  <span className="text-xs text-[#444652] line-clamp-1">
                    {user.headline}
                  </span>
                  <div className="flex items-center space-x-1 text-[#757683] mt-0.5">
                    <span className="text-[11px]">Just now</span>
                    <span className="text-[11px]">•</span>
                    <span className="material-symbols-outlined text-[13px]">public</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="Post actions"
                className="text-[#757683] hover:text-[#131b2e] p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>

            {/* Post Body Copy */}
            <div className="px-4 py-2 space-y-2 text-[#131b2e] text-sm sm:text-base leading-relaxed select-text font-normal whitespace-pre-line">
              {post.content}
            </div>

            {/* Attached Event Media */}
            {post.photoUrl && (
              <div className="w-full mt-2 relative bg-slate-900">
                <img
                  src={post.photoUrl}
                  alt="Tech Summit Keynote Presentation"
                  className="w-full h-auto object-cover max-h-80"
                />
              </div>
            )}

            {/* Social Metrics Reaction Strip */}
            <div className="px-4 py-2 flex items-center justify-between text-xs text-[#444652] border-b border-[#eaedff]">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1 items-center">
                  <span className="w-4 h-4 rounded-full bg-[#2f4da8] flex items-center justify-center text-[10px] text-white">
                    👍
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#5bb8fe] flex items-center justify-center text-[10px] text-[#00476e]">
                    👏
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#ffdad6] flex items-center justify-center text-[10px]">
                    ❤️
                  </span>
                </div>
                <span className="font-mono ml-1 font-medium">{likeCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{post.commentsCount} comments</span>
                <span>•</span>
                <span>{post.repostsCount} reposts</span>
              </div>
            </div>

            {/* LinkedIn Reaction Bar */}
            <div className="px-2 py-1 bg-[#f2f3ff] flex justify-around items-center text-[#444652]">
              <button
                type="button"
                onClick={handleToggleLike}
                className={`flex items-center space-x-1 py-1.5 px-3 rounded hover:bg-white transition-colors ${
                  liked ? 'text-[#2f4da8] font-semibold' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  thumb_up
                </span>
                <span className="text-xs sm:text-sm font-semibold">Like</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Comments are active on LinkedIn when posted.');
                }}
                className="flex items-center space-x-1 py-1.5 px-3 rounded hover:bg-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span className="text-xs sm:text-sm font-semibold">Comment</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-1 py-1.5 px-3 rounded hover:bg-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">repeat</span>
                <span className="text-xs sm:text-sm font-semibold">Repost</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-1 py-1.5 px-3 rounded hover:bg-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span className="text-xs sm:text-sm font-semibold">Send</span>
              </button>
            </div>
          </div>

          {/* Post Action Controls */}
          <div className="flex flex-col space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                id="copy-btn"
                type="button"
                onClick={handleCopy}
                className="bg-white hover:bg-[#f2f3ff] text-[#131b2e] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 border border-[#eaedff] shadow-sm active:bg-[#e2e7ff] transition-all cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    copied ? 'text-emerald-600' : 'text-[#2f4da8]'
                  }`}
                >
                  {copied ? 'check_circle' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>

              <button
                id="regenerate-btn"
                type="button"
                onClick={() => handleGenerate()}
                className="bg-white hover:bg-[#f2f3ff] text-[#131b2e] py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 border border-[#eaedff] shadow-sm active:bg-[#e2e7ff] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#006398]">
                  refresh
                </span>
                <span>Regenerate</span>
              </button>
            </div>

            {/* Primary Action: Direct Native LinkedIn Post Link */}
            <a
              id="open-linkedin-link"
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOpenLinkedInClick}
              className="w-full bg-[#2f4da8] hover:bg-[#4a66c2] text-white py-3 px-4 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-md hover:shadow-lg active:scale-[0.99] transition-all text-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              <span>Open LinkedIn &amp; Post</span>
            </a>

            {shareFeedback && (
              <div className="p-2.5 rounded-lg bg-[#e2e7ff] text-[#00164f] text-xs font-medium flex items-center gap-2 border border-[#b6c4ff] animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-[16px] text-[#2f4da8]">
                  check_circle
                </span>
                <span>{shareFeedback}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
