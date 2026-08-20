import React, { useState, useEffect } from 'react';
import { SINGAPORE_GOLF_COURSES } from './data/courses';
import { GolfCourse, LiveWeatherData, LightningStrike, IncidentReport } from './types';
import { fetchAllLiveWeatherData, generateLiveStrikes } from './services/weatherApi';

import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { MapTrackerView } from './components/MapTrackerView';
import { CoursesView } from './components/CoursesView';
import { ForecastView } from './components/ForecastView';
import { SafetyPricingView } from './components/SafetyPricingView';

import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { ReportWeatherModal } from './components/ReportWeatherModal';
import { SirenModal } from './components/SirenModal';
import { CallMarshallModal } from './components/CallMarshallModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'courses' | 'forecast' | 'safety'>('map');
  const [courses] = useState<GolfCourse[]>(SINGAPORE_GOLF_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse>(SINGAPORE_GOLF_COURSES[0]);
  const [weatherData, setWeatherData] = useState<LiveWeatherData | null>(null);
  const [strikes, setStrikes] = useState<LightningStrike[]>([]);
  const [reports, setReports] = useState<IncidentReport[]>([]);

  // User & Auth
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState('Event Organizer');

  // Emergency Siren State
  const [isSirenActive, setIsSirenActive] = useState(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSirenOpen, setIsSirenOpen] = useState(false);
  const [isCallMarshallOpen, setIsCallMarshallOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Fetch real-time Singapore NEA data
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await fetchAllLiveWeatherData();
        if (isMounted) {
          setWeatherData(data);
        }
      } catch (err) {
        console.error('Error loading live weather:', err);
      }
    }

    loadData();
    const interval = setInterval(loadData, 60000); // 1-minute live refresh

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Update dynamic strike cluster whenever selected course changes
  useEffect(() => {
    setStrikes(generateLiveStrikes(selectedCourse.lat, selectedCourse.lng));
  }, [selectedCourse]);

  // Audio synthesizer for emergency siren when activated
  useEffect(() => {
    let osc: OscillatorNode | null = null;
    let audioCtx: AudioContext | null = null;
    let intervalId: any = null;

    if (isSirenActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
          let freqToggle = true;

          intervalId = setInterval(() => {
            if (!audioCtx) return;
            const now = audioCtx.currentTime;
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.type = 'sawtooth';
            o.frequency.setValueAtTime(freqToggle ? 880 : 550, now);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            o.connect(g);
            g.connect(audioCtx.destination);
            o.start(now);
            o.stop(now + 0.4);
            freqToggle = !freqToggle;
          }, 500);
        }
      } catch (e) {
        console.warn('AudioContext not allowed without user interaction:', e);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isSirenActive]);

  const nearestStrikeKm = strikes.length
    ? Math.min(...strikes.map((s) => s.distanceKm))
    : 1.8;

  const dangerLevel = nearestStrikeKm < 2.0 ? 'DANGER' : 'CAUTION';

  const handleAddReport = (report: IncidentReport) => {
    setReports((prev) => [report, ...prev]);
  };

  const handleLoginSuccess = (name: string, role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col relative font-sans selection:bg-sky-500/30 selection:text-sky-300">
      {/* Top Header */}
      <TopAppBar
        dangerLevel={dangerLevel}
        nearestStrikeKm={nearestStrikeKm}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSiren={() => setIsSirenOpen(true)}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
      />

      {/* Main Screen Views */}
      <main className="flex-1 pt-16 relative">
        {activeTab === 'map' && (
          <MapTrackerView
            selectedCourse={selectedCourse}
            courses={courses}
            strikes={strikes}
            weatherData={weatherData}
            onSelectCourse={setSelectedCourse}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenSiren={() => setIsSirenOpen(true)}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            selectedCourse={selectedCourse}
            weatherData={weatherData}
            onSelectCourse={setSelectedCourse}
            onSwitchToMap={() => setActiveTab('map')}
            onOpenSiren={() => setIsSirenOpen(true)}
          />
        )}

        {activeTab === 'forecast' && (
          <ForecastView
            selectedCourse={selectedCourse}
            courses={courses}
            weatherData={weatherData}
            userRole={userRole}
            onSelectCourse={setSelectedCourse}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenCallMarshall={() => setIsCallMarshallOpen(true)}
            onOpenSiren={() => setIsSirenOpen(true)}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyPricingView
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onOpenSirenTest={() => setIsSirenOpen(true)}
          />
        )}
      </main>

      {/* Bottom Nav Bar (Mobile & Desktop Sidebar) */}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modal Dialogs */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          setUserRole('Event Pro Organiser');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ReportWeatherModal
        isOpen={isReportOpen}
        selectedCourse={selectedCourse}
        onClose={() => setIsReportOpen(false)}
        onSubmitReport={handleAddReport}
      />

      <SirenModal
        isOpen={isSirenOpen}
        selectedCourse={selectedCourse}
        onClose={() => setIsSirenOpen(false)}
        onToggleSiren={setIsSirenActive}
        isSirenActive={isSirenActive}
      />

      <CallMarshallModal
        isOpen={isCallMarshallOpen}
        selectedCourse={selectedCourse}
        onClose={() => setIsCallMarshallOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        reports={reports}
        isSirenActive={isSirenActive}
      />
    </div>
  );
}
