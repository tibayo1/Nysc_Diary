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
import DiaryTalksPage from './pages/DiaryTalks';
import AdminDiaryTalks from './pages/AdminDiaryTalks';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titles: Record<string, string> = {
      'home': 'NYSC Diary — Creating a Community of Opportunities',
      'content': 'Content Library | NYSC Diary',
      'post-detail': 'Article | NYSC Diary',
      'corper-of-the-week': 'Corper of the Week | NYSC Diary',
      'advertise': 'Advertise With Us | NYSC Diary',
      'community': 'Community Forum | NYSC Diary',
      'diarytalks': 'DiaryTalks – AI Answers for NYSC Questions | NYSC Diary',
      'admin-diarytalks': 'Admin Dashboard | DiaryTalks',
      'about': 'About Us | NYSC Diary',
    };
    document.title = titles[currentPage] || titles['home'];
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
      case 'diarytalks':
        return <DiaryTalksPage onNavigate={navigate} />;
      case 'admin-diarytalks':
        return <AdminDiaryTalks onBack={() => setCurrentPage('diarytalks')} />;
      case 'about':
        return <About onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  // DiaryTalks pages use their own layout (no shared header/footer)
  const isFullscreenPage = currentPage === 'diarytalks' || currentPage === 'admin-diarytalks';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isFullscreenPage && <Header currentPage={currentPage} onNavigate={navigate} />}
      <main>{renderPage()}</main>
      {!isFullscreenPage && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default App;
