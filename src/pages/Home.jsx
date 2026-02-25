import React, { useState, useEffect } from 'react';
import TfcSafeParticleHero from '../components/TfcSafeParticleHero';
import ContentCard from '../components/ContentCard';
import { CATEGORIES } from '../data/ContentData';
import { Play } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import { useUser } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import UpgradeModal from '../components/UpgradeModal';
import Navbar from '../components/Navbar';

const Home = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const { user, addToHistory } = useUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const allItems = CATEGORIES.flatMap(c => c.items);

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

      <Navbar />

      {/* TFC PARTICLE ANIMATION AT THE TOP */}
      <div className="relative w-full mt-12" style={{height: '60vh'}}>
        {/* BACKGROUND LAYER - YOUR MMA SCREENSHOT */}
        <div className="absolute inset-0">
          <img
            src="/Screenshot 2026-01-30 231135.png"
            alt="MMA Platform"
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.3) contrast(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
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

      {/* ALL SECTIONS IN ONE PAGE */}
      
      {/* TRENDING VIDEOS SECTION */}
      <section id="home" className="min-h-screen py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-12 text-center uppercase tracking-tighter">Trending Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allItems.slice(0, 8).map((item) => (
              <ContentCard key={item.id} item={item} onPlay={handlePlay} />
            ))}
          </div>
        </div>
      </section>

      {/* TOP FIGHTERS SECTION */}
      <section id="top-fighters" className="min-h-screen py-20 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-12 text-center uppercase tracking-tighter">Top Fighters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((fighter) => (
              <div key={fighter} className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                <div className="h-64 bg-gradient-to-br from-red-600 to-gray-800 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white">F{fighter}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Fighter {fighter}</h3>
                  <p className="text-gray-400 text-sm mb-3">Professional MMA Fighter</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Wins: {15 - fighter}</span>
                    <span>Losses: {fighter - 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section id="events" className="min-h-screen py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-12 text-center uppercase tracking-tighter">Upcoming Events</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((event) => (
              <div key={event} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">TFC Championship Event {event}</h3>
                    <p className="text-gray-400 mb-2">Premium MMA Event • Live Streaming</p>
                    <p className="text-gray-500 text-sm">Date: December {10 + event}, 2024 • Time: 8:00 PM EST</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen py-20 px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8 uppercase tracking-tighter">About TFC</h2>
          <div className="bg-gray-800/50 rounded-lg p-8 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              TFC (Total Full Contact) is the premier destination for elite MMA competition and entertainment. 
              We bring together the world's best fighters in the most spectacular combat sports events.
            </p>
            <p className="text-gray-400 mb-6">
              Our platform offers exclusive live streaming, premium content, and interactive experiences 
              that connect fans directly with their favorite fighters and events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">500+</div>
                <div className="text-gray-300">Elite Fighters</div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">1M+</div>
                <div className="text-gray-300">Active Fans</div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">100+</div>
                <div className="text-gray-300">Live Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS SECTION */}
      <section id="contact" className="min-h-screen py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-12 text-center uppercase tracking-tighter">Contact Us</h2>
          <div className="bg-gray-800/50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white text-xl font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">contact@tfc.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">123 MMA Street, Las Vegas, NV</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold mb-4">Send Message</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows="4"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


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