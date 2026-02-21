import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { X, Maximize, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ url, title, onClose }) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full group" onMouseMove={() => setShowControls(true)}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          onProgress={() => {}}
          style={{ objectFit: 'cover' }}
        />

        {/* Custom Overlays */}
        <AnimatePresence>
          {showControls && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 flex flex-col justify-between p-6"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Bottom Bar */}
              <div className="flex items-center space-x-6">
                <button onClick={() => setPlaying(!playing)} className="text-white hover:text-primary transition-colors">
                  {playing ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current" />}
                </button>
                <button onClick={() => setMuted(!muted)} className="text-white hover:text-primary transition-colors">
                  {muted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: '30%' }} // Mock progress
                  />
                </div>
                <button className="text-white hover:text-primary">
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
