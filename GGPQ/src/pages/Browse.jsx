import React, { useState } from 'react';
import { CATEGORIES } from '../data/ContentData';
import ContentCard from '../components/ContentCard';
import { Search as SearchIcon, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import UpgradeModal from '../components/UpgradeModal';
import VideoPlayer from '../components/VideoPlayer';
import { useUser } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';

const Browse = () => {
  const allItems = CATEGORIES.flatMap(c => c.items);
  const [activeVideo, setActiveVideo] = useState(null);
  const { user, addToHistory } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handlePlay = (item) => {
    if (item.isPremium && user?.type !== 'Premium') {
      setShowUpgradeModal(true);
      return;
    }
    setActiveVideo(item);
    addToHistory(item);
  };

  
  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto">
      <SEO 
        title="Browse Library" 
        description="Explore the full TFC library of live events, e-sports, and exclusive shows." 
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Explore Content</h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Discover your next favorite show</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search library..." 
              className="bg-surface border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-all w-64"
            />
          </div>
          <button className="p-3 bg-surface border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ContentCard key={item.id} item={item} onPlay={handlePlay} />
        ))}
      </div>

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


export default Browse;
