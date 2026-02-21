export const HERO_CONTENT = {
  id: 'h1',
  title: 'Apex Legends: Global Series',
  subtitle: 'Championship 2026',
  description: 'The world\'s best squads compete for the ultimate title in the heart of London. Experience every shot, every rotation, and every clutch in stunning 4K HDR.',
  image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070',
  videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  isPremium: true,
  category: 'Featured',
  rating: 'TV-MA',
  year: '2026',
  duration: 'Live Now'
};

export const CATEGORIES = [
  {
    id: 'c1',
    title: 'Featured Events',
    items: [
      { id: 'v1', title: 'Formula 1: Miami Grand Prix', duration: '2h 15m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v2', title: 'E-Sports: Valorant Masters', duration: '1h 45m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v3', title: 'World Cup: Finals 2026', duration: '2h 30m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v4', title: 'NBA All-Star Game', duration: '1h 20m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1504450758481-7338ebe7524a?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    ]
  },
  {
    id: 'c2',
    title: 'Trending Now',
    items: [
      { id: 'v5', title: 'Cyberpunk 2077: Phantom Liberty', duration: '45m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v6', title: 'The Last of Us Part III', duration: '1h 30m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v7', title: 'GTA VI: Vice City Stories', duration: '2h 00m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v8', title: 'Elden Ring: Shadow of Erdtree', duration: '1h 10m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    ]
  },
  {
    id: 'c3',
    title: 'New Releases',
    items: [
      { id: 'v9', title: 'Mars Colonization: Live Feed', duration: '2h 10m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v10', title: 'Deep Sea Discovery', duration: '1h 50m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de7?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v11', title: 'Arctic Survival: Season 4', duration: '1h 05m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v12', title: 'Silicon Valley Insider', duration: '1h 40m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    ]
  },
  {
    id: 'c4',
    title: 'Top Picks For You',
    items: [
      { id: 'v13', title: 'Neon Nights: Tokyo', duration: '55m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1503891450247-ee5f8bbaf7ef?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v14', title: 'Sahara Expedition', duration: '1h 45m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v15', title: 'The Great Barrier Reef', duration: '2h 15m', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
      { id: 'v16', title: 'Amazon Rain Forest', duration: '1h 30m', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=600', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    ]
  }
];

