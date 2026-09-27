import React, { useState } from 'react';
import { TEMPLATES } from '../data/mockData';
import { PostTemplate } from '../types';

interface TemplatesViewProps {
  onSelectTemplate: (template: PostTemplate) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Keynote', 'Networking', 'Takeaways', 'Speaker'];

  const filtered =
    selectedCategory === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#eaedff]">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#2f4da8] text-[22px]">dataset</span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#131b2e]">
            Proven Event Post Templates
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#444652]">
          Pre-structured formats designed to maximize reach, engagement, and peer connections on LinkedIn.
        </p>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#2f4da8] text-white shadow-sm'
                  : 'bg-[#f2f3ff] text-[#444652] hover:bg-[#e2e7ff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-[#eaedff] flex flex-col justify-between hover:border-[#4a66c2] transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#2f4da8] bg-[#dce1ff] px-2.5 py-0.5 rounded-full">
                  {tpl.category}
                </span>
                <span className="text-xs text-[#757683]">Verified Framework</span>
              </div>

              <h3 className="font-semibold text-base text-[#131b2e]">{tpl.title}</h3>
              <p className="text-xs text-[#444652]">{tpl.description}</p>

              <div className="bg-[#f2f3ff] p-3 rounded-lg text-xs text-[#131b2e] font-sans leading-relaxed whitespace-pre-line line-clamp-6 italic">
                "{tpl.sampleCopy}"
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-[#eaedff]">
              <button
                type="button"
                onClick={() => onSelectTemplate(tpl)}
                className="w-full py-2 px-3 rounded-lg bg-[#f2f3ff] hover:bg-[#2f4da8] text-[#2f4da8] hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                Use This Template in Workbench
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
