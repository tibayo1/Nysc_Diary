import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Content from './pages/Content';
import PostDetail from './pages/PostDetail';
import CorperOfTheWeek from './pages/CorperOfTheWeek';
import Advertise from './pages/Advertise';
import Community from './pages/Community';
import About from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  /** Navigate to a page. Pass a postId to open a specific article. */
  const navigate = (page: string, postId?: string) => {
    if (postId) setSelectedPostId(postId);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'content':
        return (
          <Content
            onSelectPost={(id) => navigate('post-detail', id)}
          />
        );
      case 'post-detail':
        return selectedPostId ? (
          <PostDetail
            postId={selectedPostId}
            onBack={() => setCurrentPage('content')}
          />
        ) : (
          <Content onSelectPost={(id) => navigate('post-detail', id)} />
        );
      case 'corper-of-the-week':
        return <CorperOfTheWeek />;
      case 'advertise':
        return <Advertise />;
      case 'community':
        return <Community />;
      case 'about':
        return <About onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
