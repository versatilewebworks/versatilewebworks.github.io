import { BlogPost } from '../types/blog';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Fast JSON Formatter',
    slug: 'fast-json-formatter',
    description: 'A tiny serverless utility to pretty-print and validate JSON.',
    coverImage: '/images/json.png',
    tags: ['developer-tools', 'json'],
    category: 'developer-tools',
    date: '2026-01-15',
  },
  {
    id: '2',
    title: 'CSS Gradient Generator',
    slug: 'css-gradient-generator',
    description: 'Create beautiful gradients and copy ready-to-use CSS.',
    coverImage: '/images/gradient.png',
    tags: ['design', 'css'],
    category: 'design',
    date: '2026-03-02',
  },
  {
    id: '3',
    title: 'Stenotypist Tips',
    slug: 'stenotypist-workflow',
    description: 'Best practices and tools for modern stenotypists.',
    coverImage: '/images/steno.png',
    tags: ['stenotypist', 'workflow'],
    category: 'productivity',
    date: '2026-04-10',
  },
  {
    id: '4',
    title: 'Developer Tools Roundup',
    slug: 'developer-tools-roundup',
    description: 'Weekly curated list of lightweight developer utilities.',
    coverImage: '/images/tools.png',
    tags: ['developer-tools', 'roundup'],
    category: 'developer-tools',
    date: '2026-05-20',
  },
];
