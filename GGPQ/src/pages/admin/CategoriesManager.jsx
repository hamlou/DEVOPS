import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/mockData';
import { motion } from 'framer-motion';
import { Layers, Plus, Edit2, Trash2, Folder, Video } from 'lucide-react';

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Taxonomy <span className="text-primary italic">Engine</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Organize your content structure</p>
        </div>
        <button className="flex items-center space-x-3 bg-primary text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">
          <Plus className="w-5 h-5" />
          <span>New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-gray-800 rounded-[2.5rem] p-8 hover:border-primary transition-all group"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Folder className="w-6 h-6" />
              </div>
              <div className="flex space-x-2">
                <button className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{cat.title}</h3>
            <div className="flex items-center space-x-2 text-gray-500 font-black uppercase text-[10px] tracking-widest">
              <Video className="w-3 h-3" />
              <span>{cat.items.length} Active Videos</span>
            </div>

            <div className="mt-8 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManager;
