import React, { useState, useEffect } from 'react';
import TfcSafeParticleHero from '../components/TfcSafeParticleHero';
import ContentCarousel from '../components/ContentCarousel';
import { fetchCategories, mockVideos } from '../services/mockData';
import VideoPlayer from '../components/VideoPlayer';
import { useUser } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import UpgradeModal from '../components/UpgradeModal';

const Home = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const { user, addToHistory } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handlePlay = (item) => {
    if (item.isPremium && user?.type !== 'Premium') {
      setShowUpgradeModal(true);
      return;
    }
    setActiveVideo(item);
    addToHistory(item);
  };

  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Home" 
        description="Stream the world's best live events and exclusive content on TFC." 
      />
      
      {/* FULL SCREEN HERO WITH SCREENSHOT AND TFC ANIMATION */}
      <div className="relative w-full h-screen">
        {/* BACKGROUND LAYER - YOUR MMA SCREENSHOT */}
        <div className="absolute inset-0">
          <img 
            src="/Screenshot 2026-01-30 231135.png"
            alt="MMA Platform"
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.4) contrast(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* MIDDLE LAYER - TFC ANIMATION */}
        <div className="absolute inset-0">
          <TfcSafeParticleHero />
        </div>

        {/* TOP LAYER - VISUAL ENHANCEMENTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="py-12 space-y-12">
        {categories.map((cat) => (
          <ContentCarousel 
            key={cat.id} 
            category={cat.title} 
            items={cat.items}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {activeVideo && (
          <VideoPlayer 
            url={activeVideo.videoUrl || 'https://www.youtube.com/watch?v=ScMzIvxBSi4'}
            title={activeVideo.title}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
};

export default Home;