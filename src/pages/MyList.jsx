import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, Plus } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

import SEO from '../components/SEO';

import UpgradeModal from '../components/UpgradeModal';

const MyList = () => {
  const { myList, toggleMyList, user, addToHistory } = useUser();
  const [activeVideo, setActiveVideo] = useState(null);
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
    <div className="p-8 md:p-16 max-w-6xl mx-auto min-h-screen">
      <SEO 
        title="My List" 
        description="Your personal TFC collection. Access your favorite shows and events anytime." 
      />
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">My List / Favorites</h2>

      {myList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myList.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-video bg-surface rounded-3xl overflow-hidden border border-gray-800 transition-all duration-300 group-hover:border-primary group-hover:-translate-y-2 shadow-xl hover:shadow-primary/10">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handlePlay(item)}
                      className="bg-primary p-3 rounded-full text-black hover:scale-110 transition-transform"
                    >
                      <Play className="w-6 h-6 fill-black" />
                    </button>

                    <button 
                      onClick={() => toggleMyList(item)}
                      className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <Heart className="w-6 h-6 fill-current" />
                    </button>
                  </div>
                </div>

                {item.isPremium && (
                  <div className="absolute top-4 right-4 bg-primary text-black text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-lg">
                    Premium
                  </div>
                )}
              </div>
              <div className="mt-4 px-2">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 uppercase font-black tracking-widest mt-1">2026 • Live Performance</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 bg-surface/50 border-2 border-dashed border-gray-800 rounded-[3rem]">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Plus className="w-10 h-10 text-gray-500" />
          </div>
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-center px-8">Your list is empty.<br />Add some shows to watch later!</p>
        </div>
      )}

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


export default MyList;
