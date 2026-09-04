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
import BlogListing from './pages/BlogListing';
import BlogPostPage from './pages/BlogPost';

// ─── Hash-based routing helpers ─────────────────────────────────────────────

const VALID_PAGES = [
  'home', 'content', 'post-detail', 'corper-of-the-week',
  'advertise', 'community', 'diarytalks', 'admin-diarytalks',
  'about', 'blog', 'blog-post',
];

/** Parse window.location.hash into { page, id } */
function parseHash(): { page: string; id: string | null } {
  const raw = window.location.hash.replace(/^#/, ''); // e.g. "blog-post/my-slug"
  const [page, id = null] = raw.split('/');
  return { page: VALID_PAGES.includes(page) ? page : 'home', id };
}

/** Write page (and optional id/slug) to the URL hash */
function pushHash(page: string, id?: string) {
  const hash = id ? `#${page}/${id}` : `#${page}`;
  window.history.pushState(null, '', hash);
}

// ─── Component ───────────────────────────────────────────────────────────────

function App() {
  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(
    initial.page === 'post-detail' ? initial.id : null
  );
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(
    initial.page === 'blog-post' ? initial.id : null
  );

  // Sync page title + scroll on navigation
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
      'blog': 'Blog | NYSC Diary',
      'blog-post': 'Article | NYSC Diary Blog',
    };
    document.title = titles[currentPage] || titles['home'];
  }, [currentPage]);

  // Handle browser back / forward buttons
  useEffect(() => {
    const onPop = () => {
      const { page, id } = parseHash();
      if (page === 'blog-post' && id) setSelectedBlogSlug(id);
      if (page === 'post-detail' && id) setSelectedPostId(id);
      setCurrentPage(page);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /** Navigate to a page, updating the URL hash so refresh works. */
  const navigate = (page: string, idOrSlug?: string) => {
    if (page === 'blog-post' && idOrSlug) setSelectedBlogSlug(idOrSlug);
    else if (idOrSlug) setSelectedPostId(idOrSlug);
    setCurrentPage(page);
    pushHash(page, idOrSlug);
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
      case 'blog':
        return (
          <BlogListing
            onSelectPost={(slug) => navigate('blog-post', slug)}
          />
        );
      case 'blog-post':
        return selectedBlogSlug ? (
          <BlogPostPage
            slug={selectedBlogSlug}
            onBack={() => setCurrentPage('blog')}
            onNavigate={navigate}
          />
        ) : (
          <BlogListing onSelectPost={(slug) => navigate('blog-post', slug)} />
        );
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
