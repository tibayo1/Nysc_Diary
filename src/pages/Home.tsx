import { ArrowRight, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Post, Corper } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const latestPosts: Post[] = [
  {
    id: '1',
    title: 'Everything You Need to Know About NYSC Call-up Letter',
    category: 'NYSC Updates',
    excerpt: 'A comprehensive guide on how to print your call-up letter and what to expect...',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-20',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: '10 Essential Items to Pack for NYSC Camp',
    category: 'Camp Life',
    excerpt: 'Don\'t make the mistake of going to camp unprepared. Here\'s everything you need...',
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-18',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Top Side Hustles for Corps Members in 2024',
    category: 'Opportunities',
    excerpt: 'Make the most of your service year with these lucrative side hustle ideas...',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-15',
    readTime: '6 min read'
  }
];

const featuredCorper: Corper = {
  id: '1',
  name: 'Adaeze Okonkwo',
  state: 'Lagos State',
  ppa: 'Ministry of Education',
  story: 'From starting a tech community in her LGA to impacting over 200 students, Adaeze is redefining service...',
  image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=800',
  date: '2024-03-20'
};

const trendingTopics = [
  { icon: BookOpen, title: 'Call-up Letters', count: '1.2k reading' },
  { icon: Users, title: 'Camp Life', count: '890 reading' },
  { icon: TrendingUp, title: 'PPA Tips', count: '654 reading' },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your NYSC Plug for Everything
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              News, Opportunities, Stories, Community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('content')}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center"
              >
                Explore Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('advertise')}
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
              >
                Advertise With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
          <button
            onClick={() => onNavigate('content')}
            className="text-green-600 font-semibold hover:text-green-700 flex items-center"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              onClick={() => onNavigate('content')}
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
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Corper of the Week</h2>
            <button
              onClick={() => onNavigate('corper-of-the-week')}
              className="text-green-600 font-semibold hover:text-green-700 flex items-center"
            >
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div
            className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-sm p-8 md:flex items-center gap-8 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('corper-of-the-week')}
          >
            <img
              src={featuredCorper.image}
              alt={featuredCorper.name}
              className="w-full md:w-64 h-64 object-cover rounded-xl"
            />
            <div className="mt-6 md:mt-0 flex-1">
              <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Featured Corper
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {featuredCorper.name}
              </h3>
              <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                <span>{featuredCorper.state}</span>
                <span>•</span>
                <span>{featuredCorper.ppa}</span>
              </div>
              <p className="text-gray-700 text-lg">{featuredCorper.story}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate('content')}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <topic.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-600">{topic.count}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 text-green-50">
            Connect with thousands of corps members across Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('community')}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Join WhatsApp Group
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Submit Your Story
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
