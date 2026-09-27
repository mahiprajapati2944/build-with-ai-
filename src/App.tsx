import React, { useState } from 'react';
import { Header } from './components/Header';
import { AttendeeView } from './components/AttendeeView';
import { OrganizerView } from './components/OrganizerView';
import { TemplatesView } from './components/TemplatesView';
import { AnalyticsView } from './components/AnalyticsView';
import { BottomNav } from './components/BottomNav';
import { QrModal } from './components/QrModal';
import { PhotoPickerModal } from './components/PhotoPickerModal';
import { SettingsModal } from './components/SettingsModal';
import {
  INITIAL_EVENT,
  INITIAL_POST,
  INITIAL_USER,
} from './data/mockData';
import { EventData, EventProfile, LinkedInPostData, PostTemplate } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'attendee' | 'organizer'>('attendee');
  const [activeNavTab, setActiveNavTab] = useState<'create' | 'templates' | 'analytics' | 'account'>('create');
  
  const [eventData, setEventData] = useState<EventData>(INITIAL_EVENT);
  const [userData, setUserData] = useState<EventProfile>(INITIAL_USER);
  const [postData, setPostData] = useState<LinkedInPostData>(INITIAL_POST);

  // Modal triggers
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Desktop view mode toggle (Responsive Fluid vs Mobile Device Frame)
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateEvent = (updated: Partial<EventData>) => {
    setEventData((prev) => ({
      ...prev,
      ...updated,
    }));
    showToast('Event settings saved & published to attendee portals!');
  };

  const handleUpdateUser = (updated: Partial<EventProfile>) => {
    setUserData((prev) => {
      const nextUser = { ...prev, ...updated };
      setPostData((postPrev) => ({
        ...postPrev,
        author: nextUser,
      }));
      return nextUser;
    });
    showToast('Profile updated!');
  };

  const handleUpdatePost = (updated: Partial<LinkedInPostData>) => {
    setPostData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleSelectTemplate = (template: PostTemplate) => {
    setPostData((prev) => ({
      ...prev,
      content: template.sampleCopy,
    }));
    setActiveNavTab('create');
    setCurrentView('attendee');
    showToast(`Loaded "${template.title}" template!`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        user={userData}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeNavTab={activeNavTab}
        onNavTabChange={(tab) => {
          if (tab === 'account') {
            setIsSettingsOpen(true);
          } else {
            setActiveNavTab(tab);
          }
        }}
      />

      {/* Device View Bar for Desktop previewing */}
      <div className="hidden lg:flex justify-end max-w-7xl mx-auto w-full px-8 pt-3 pb-1">
        <div className="flex items-center gap-2 text-xs text-[#444652] bg-white border border-[#eaedff] px-3 py-1 rounded-full shadow-sm">
          <span>Viewport Mode:</span>
          <button
            type="button"
            onClick={() => setDeviceFrameMode(false)}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              !deviceFrameMode ? 'bg-[#2f4da8] text-white' : 'text-[#444652] hover:text-[#131b2e]'
            }`}
          >
            Responsive Desktop
          </button>
          <button
            type="button"
            onClick={() => setDeviceFrameMode(true)}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              deviceFrameMode ? 'bg-[#2f4da8] text-white' : 'text-[#444652] hover:text-[#131b2e]'
            }`}
          >
            Mobile Frame (390px)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full px-4 sm:px-6 lg:px-8 py-5 pb-24 md:pb-12 ${
          deviceFrameMode
            ? 'max-w-[420px] mx-auto border-x border-[#eaedff] shadow-xl my-4 rounded-2xl bg-white overflow-hidden'
            : 'max-w-7xl mx-auto'
        }`}
      >
        {/* Render Tab / View Content */}
        {activeNavTab === 'templates' && (
          <TemplatesView onSelectTemplate={handleSelectTemplate} />
        )}

        {activeNavTab === 'analytics' && <AnalyticsView event={eventData} />}

        {activeNavTab === 'create' && (
          <>
            {currentView === 'attendee' ? (
              <AttendeeView
                event={eventData}
                user={userData}
                post={postData}
                onUpdatePost={handleUpdatePost}
                onOpenPhotoPicker={() => setIsPhotoPickerOpen(true)}
              />
            ) : (
              <OrganizerView
                event={eventData}
                onUpdateEvent={handleUpdateEvent}
                onSwitchToAttendeeView={() => setCurrentView('attendee')}
                onOpenQrModal={() => setIsQrModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation for Mobile Devices */}
      <BottomNav
        activeTab={activeNavTab}
        onTabChange={(tab) => {
          if (tab === 'account') {
            setIsSettingsOpen(true);
          } else {
            setActiveNavTab(tab);
          }
        }}
      />

      {/* Modals */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        attendeeUrl={eventData.attendeeUrl}
      />

      <PhotoPickerModal
        isOpen={isPhotoPickerOpen}
        onClose={() => setIsPhotoPickerOpen(false)}
        currentPhotoUrl={postData.photoUrl}
        onSelectPhoto={(photo) => {
          handleUpdatePost({
            photoUrl: photo.url,
            photoName: photo.name,
            photoSize: photo.size,
          });
          showToast(`Attached ${photo.name}`);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={userData}
        onUpdateUser={handleUpdateUser}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
