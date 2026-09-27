import React, { useRef } from 'react';
import { EVENT_PHOTOS } from '../data/mockData';

interface PhotoPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl: string;
  onSelectPhoto: (photo: { url: string; name: string; size: string }) => void;
}

export const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  isOpen,
  onClose,
  currentPhotoUrl,
  onSelectPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
          onSelectPhoto({
            url: event.target.result as string,
            name: file.name,
            size: `${fileSizeMB} MB • Uploaded photo`,
          });
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-lg shadow-2xl flex flex-col space-y-4 border border-[#eaedff] animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg text-[#131b2e]">Choose Event Media</h3>
            <p className="text-xs text-[#444652]">
              Select an official high-resolution summit photo or upload your own selfie.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#444652] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Upload custom button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-[#4a66c2] bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#2f4da8] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            <span>Upload From Device / Take a Selfie</span>
          </button>
        </div>

        {/* Pre-approved Conference Gallery */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#131b2e] uppercase tracking-wider">
            Official Summit Gallery
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EVENT_PHOTOS.map((photo) => {
              const isSelected = currentPhotoUrl === photo.url;
              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    onSelectPhoto({
                      url: photo.url,
                      name: photo.name,
                      size: photo.size,
                    });
                    onClose();
                  }}
                  className={`group relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'border-[#2f4da8] ring-2 ring-[#dce1ff]' : 'border-transparent'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="p-1.5 bg-white">
                    <p className="text-[11px] font-semibold text-[#131b2e] truncate">
                      {photo.name}
                    </p>
                    <p className="text-[10px] text-[#757683] truncate">{photo.caption}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#2f4da8] text-white rounded-full flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#444652] hover:bg-[#f2f3ff]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
