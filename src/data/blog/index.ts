import { BlogPost } from './types';

// Water treatment focused blog categories
export const blogCategories = [
  { name: 'Water Quality', slug: 'water-quality', icon: '💧' },
  { name: 'Water Testing', slug: 'water-testing', icon: '🧪' },
  { name: 'Water Softeners', slug: 'water-softeners', icon: '🔧' },
  { name: 'Filtration Systems', slug: 'filtration', icon: '🔍' },
  { name: 'Reverse Osmosis', slug: 'reverse-osmosis', icon: '💦' },
  { name: 'Well Water', slug: 'well-water', icon: '🏠' },
  { name: 'City Water', slug: 'city-water', icon: '🏙️' },
  { name: 'Health & Safety', slug: 'health-safety', icon: '🛡️' },
  { name: 'Maintenance', slug: 'maintenance', icon: '🔨' },
  { name: 'Buying Guide', slug: 'buying-guide', icon: '📋' },
];

// Sample blog posts - Connie will add more
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'signs-you-need-water-softener',
    title: '7 Signs You Need a Water Softener in Your Home',
    excerpt: 'Hard water can damage your appliances, dry out your skin, and leave spots on dishes. Here are the telltale signs it\'s time to invest in a water softening system.',
    date: '2024-03-15',
    author: 'CWT Editorial Team',
    category: 'Water Softeners',
    image: '/blog/water-softener-signs.jpg',
    readTime: '6 min read',
    content: `Hard water is a common problem affecting millions of homes across the United States. If you're experiencing any of these issues, it might be time to consider a water softener.`,
    sections: [
      {
        title: '1. Scale Buildup on Fixtures',
        content: 'White, chalky deposits on faucets, showerheads, and sinks are a clear sign of hard water. These mineral deposits not only look unsightly but can also reduce water flow over time.'
      },
      {
        title: '2. Dry Skin and Hair',
        content: 'Hard water leaves a residue on your skin that can cause dryness, irritation, and even exacerbate conditions like eczema. Your hair may also feel dry and look dull after washing.'
      },
      {
        title: '3. Spots on Dishes and Glassware',
        content: 'If your dishes come out of the dishwasher with spots or a cloudy film, hard water is likely the culprit. These mineral deposits can be difficult to remove and make your glassware look dirty.'
      },
      {
        title: '4. Faded Laundry',
        content: 'Hard water can cause your clothes to fade faster and feel stiff or scratchy. You might also notice you need to use more detergent to get your laundry clean.'
      },
      {
        title: '5. Reduced Appliance Lifespan',
        content: 'Water heaters, dishwashers, and washing machines can suffer from scale buildup, reducing their efficiency and lifespan. A water softener can help protect your investment.'
      },
      {
        title: '6. High Energy Bills',
        content: 'Scale buildup in your water heater forces it to work harder, increasing your energy costs. Soft water helps appliances run more efficiently.'
      },
      {
        title: '7. Soap Scum in Shower',
        content: 'That stubborn film on your shower walls and doors? It\'s soap scum caused by hard water reacting with soap. It\'s difficult to clean and keeps coming back.'
      }
    ],
    keywords: ['water softener', 'hard water', 'scale buildup', 'water quality'],
    imageAlt: 'Water softener system installed in a modern home utility room'
  },
  {
    id: 2,
    slug: 'understanding-water-test-results',
    title: 'Understanding Your Water Test Results: A Complete Guide',
    excerpt: 'Got your water test back but don\'t know what the numbers mean? We break down common contaminants, safe levels, and what actions to take.',
    date: '2024-03-10',
    author: 'CWT Editorial Team',
    category: 'Water Testing',
    image: '/blog/water-test-results.jpg',
    readTime: '8 min read',
    content: `Water testing can reveal a lot about what's coming out of your tap. Understanding your results is the first step toward ensuring your family's safety.`,
    sections: [
      {
        title: 'Common Contaminants Explained',
        content: 'Water tests typically check for bacteria, lead, nitrates, pH levels, hardness, and various minerals. Each has different health implications and treatment options.'
      },
      {
        title: 'EPA Standards vs. Your Results',
        content: 'The EPA sets legal limits for contaminants in public water systems. Compare your results to these standards to understand if action is needed.'
      },
      {
        title: 'When to Take Action',
        content: 'Some contaminants require immediate attention, while others are more about long-term health. We\'ll help you prioritize based on your specific results.'
      }
    ],
    keywords: ['water testing', 'water quality', 'contaminants', 'EPA standards'],
    imageAlt: 'Water test report with highlighted results and safety guidelines'
  },
  {
    id: 3,
    slug: 'reverse-osmosis-vs-filtration',
    title: 'Reverse Osmosis vs. Whole House Filtration: Which Do You Need?',
    excerpt: 'Confused about water treatment options? We compare reverse osmosis systems with whole house filtration to help you choose the right solution.',
    date: '2024-03-05',
    author: 'CWT Editorial Team',
    category: 'Filtration Systems',
    image: '/blog/ro-vs-filtration.jpg',
    readTime: '7 min read',
    content: `Choosing between reverse osmosis and whole house filtration depends on your water quality, budget, and specific concerns. Here's what you need to know.`,
    sections: [
      {
        title: 'What is Reverse Osmosis?',
        content: 'Reverse osmosis (RO) systems use a semi-permeable membrane to remove up to 99% of contaminants. They\'re typically installed under the sink for drinking water.'
      },
      {
        title: 'What is Whole House Filtration?',
        content: 'Whole house systems treat all water entering your home. They\'re great for addressing hardness, chlorine, and sediment throughout your plumbing.'
      },
      {
        title: 'Making the Right Choice',
        content: 'Many homes benefit from both systems working together. RO for drinking water purity, and whole house filtration for general water quality improvement.'
      }
    ],
    keywords: ['reverse osmosis', 'water filtration', 'whole house', 'drinking water'],
    imageAlt: 'Comparison of reverse osmosis and whole house water filtration systems'
  }
];

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
};

export const getRelatedPosts = (currentPostId: number, category: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(p => p.id !== currentPostId && p.category === category)
    .slice(0, limit);
};
