import React from 'react';
import { Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-gray-800/50 py-16 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-black text-primary italic mb-6">TFC</h2>
          <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
            The world's premier destination for high-stakes competition, exclusive entertainment, and global live events. Redefining the future of content, one stream at a time.
          </p>
          <div className="flex space-x-6">
            {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
              <a key={i} href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Platform</h3>
          <ul className="space-y-4">
            {['Browse Library', 'Live Events', 'Subscription', 'TFC Rewards', 'Affiliate'].map((item) => (
              <li key={item}><a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Legal</h3>
          <ul className="space-y-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Help Center', 'Contact Us'].map((item) => (
              <li key={item}><a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
          © 2026 TFC NETWORK. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Global Status: Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
