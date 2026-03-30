import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Post } from '../types';

const categories = ['All', 'Camp Life', 'NYSC Updates', 'Opportunities', 'Stories'];

const allPosts: Post[] = [
  {
    id: '1',
    title: 'Everything You Need to Know About NYSC Call-up Letter',
    category: 'NYSC Updates',
    excerpt: 'A comprehensive guide on how to print your call-up letter, what documents you need, and common issues to avoid.',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-20',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: '10 Essential Items to Pack for NYSC Camp',
    category: 'Camp Life',
    excerpt: 'Don\'t make the mistake of going to camp unprepared. Here\'s everything you need to make your camp experience comfortable.',
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-18',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Top Side Hustles for Corps Members in 2024',
    category: 'Opportunities',
    excerpt: 'Make the most of your service year with these lucrative side hustle ideas that won\'t interfere with your PPA duties.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-15',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'How I Started a Business During NYSC',
    category: 'Stories',
    excerpt: 'One corper\'s journey from batch mate to successful entrepreneur, and how NYSC provided the perfect launching pad.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-12',
    readTime: '8 min read'
  },
  {
    id: '5',
    title: 'Navigating Your First Week at Camp',
    category: 'Camp Life',
    excerpt: 'Survival tips, what to expect, and how to make friends quickly during your first week in the orientation camp.',
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-10',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'NYSC Allowance Increase: What You Need to Know',
    category: 'NYSC Updates',
    excerpt: 'Breaking down the new allowance structure, when it takes effect, and how it affects current corps members.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-08',
    readTime: '4 min read'
  },
  {
    id: '7',
    title: 'Remote Job Opportunities for Corps Members',
    category: 'Opportunities',
    excerpt: 'Discover legitimate remote work opportunities perfect for corps members looking to earn extra income online.',
    image: 'https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-05',
    readTime: '6 min read'
  },
  {
    id: '8',
    title: 'My Most Memorable CDS Experience',
    category: 'Stories',
    excerpt: 'How community development service turned into a life-changing experience that shaped my career path.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-03',
    readTime: '7 min read'
  },
  {
    id: '9',
    title: 'Understanding PPA Posting and Redeployment',
    category: 'NYSC Updates',
    excerpt: 'Complete guide to PPA assignments, when and how to request redeployment, and what documents you need.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-01',
    readTime: '5 min read'
  }
];

export default function Content() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? allPosts
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Library</h1>
          <p className="text-xl text-gray-600">
            Everything you need to navigate your NYSC journey successfully
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-green-600">
                    {post.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <button className="text-green-600 font-semibold hover:text-green-700">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
