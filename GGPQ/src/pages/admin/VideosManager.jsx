import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, ShieldCheck, Video, Image as ImageIcon, X } from 'lucide-react';

const VideosManager = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setVideos(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Content <span className="text-primary italic">Library</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Manage your global video distribution</p>
        </div>
        <button 
          onClick={() => { setEditingVideo(null); setIsModalOpen(true); }}
          className="flex items-center space-x-3 bg-primary text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Video</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-surface border border-gray-800 p-6 rounded-3xl flex items-center space-x-4">
        <div className="bg-black/40 flex-1 flex items-center px-6 py-3 rounded-2xl border border-gray-800 focus-within:border-primary transition-all">
          <Search className="w-5 h-5 text-gray-500 mr-4" />
          <input 
            type="text" 
            placeholder="Search by title, ID or category..." 
            className="bg-transparent border-none outline-none text-white font-bold w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Video Table */}
      <div className="bg-surface border border-gray-800 rounded-[3rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-gray-800">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Content</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Views</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredVideos.map((video) => (
              <tr key={video.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-14 bg-gray-900 rounded-lg overflow-hidden relative border border-gray-800">
                      <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                    </div>
                    <div>
                      <p className="font-black text-white group-hover:text-primary transition-colors">{video.title}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">ID: {video.id} • {video.duration}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  {video.isPremium ? (
                    <div className="flex items-center space-x-2 text-primary">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Premium</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Free Tier</span>
                  )}
                </td>
                <td className="px-8 py-6 font-bold text-white">{(video.views || 0).toLocaleString()}</td>
                <td className="px-8 py-6">
                  <span className="flex items-center space-x-2 text-green-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Published</span>
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingVideo(video); setIsModalOpen(true); }}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(video.id)}
                      className="p-3 bg-white/5 hover:bg-red-500/20 rounded-xl text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal Mock */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-gray-800 p-10 rounded-[3rem] max-w-2xl w-full relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-3xl font-black uppercase mb-8">
                {editingVideo ? 'Edit' : 'Register New'} <span className="text-primary italic">Content</span>
              </h3>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Video Title</label>
                  <input type="text" className="w-full bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 font-bold focus:border-primary transition-all" defaultValue={editingVideo?.title} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Duration</label>
                  <input type="text" className="w-full bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 font-bold focus:border-primary transition-all" defaultValue={editingVideo?.duration} />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Thumbnail URL</label>
                  <div className="flex space-x-4">
                    <input type="text" className="flex-1 bg-black/40 border border-gray-800 rounded-2xl px-6 py-4 font-bold focus:border-primary transition-all" defaultValue={editingVideo?.thumbnail} />
                    <button className="p-4 bg-white/5 border border-gray-800 rounded-2xl text-gray-400 hover:text-white transition-all">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${editingVideo?.isPremium ? 'bg-primary' : 'bg-gray-800'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editingVideo?.isPremium ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Premium Content</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-primary text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] hover:scale-105 transition-transform"
                >
                  {editingVideo ? 'Save Changes' : 'Publish Content'}
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-10 border border-gray-800 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideosManager;
