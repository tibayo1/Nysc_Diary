import { useState, useEffect } from 'react';
import {
  BarChart3,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  BookOpen,
  HelpCircle,
  AlertCircle,
  Search,
  ExternalLink,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { Reveal } from '../hooks/useScrollReveal';
import DiaryTalksIcon from '../components/diarytalks/DiaryTalksIcon';
import { knowledgeBase } from '../data/diarytalks-kb';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AdminDiaryTalksProps {
  onBack: () => void;
}

type Tab = 'overview' | 'unanswered' | 'feedback' | 'sources';

interface FeedbackRecord {
  id: string;
  answerId: string;
  rating: string;
  reason?: string;
  createdAt: { seconds: number };
}

interface UnansweredRecord {
  id: string;
  question: string;
  predictedCategory: string;
  createdAt: { seconds: number };
  reviewStatus: string;
}

// Admin email check — in production, use Firebase Auth or Cloudflare Access
const ADMIN_EMAIL = 'tibson1@gmail.com';

export default function AdminDiaryTalks({ onBack }: AdminDiaryTalksProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [feedbackData, setFeedbackData] = useState<FeedbackRecord[]>([]);
  const [unansweredData, setUnansweredData] = useState<UnansweredRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === ADMIN_EMAIL) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access denied. This email is not authorised for admin access.');
    }
  };

  // Fetch Firestore data
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [feedbackSnap, unansweredSnap] = await Promise.all([
          getDocs(query(collection(db, 'diarytalks_feedback'), orderBy('createdAt', 'desc'), limit(100))),
          getDocs(query(collection(db, 'diarytalks_unanswered'), orderBy('createdAt', 'desc'), limit(100))),
        ]);
        setFeedbackData(
          feedbackSnap.docs.map((d) => ({ id: d.id, ...d.data() } as FeedbackRecord))
        );
        setUnansweredData(
          unansweredSnap.docs.map((d) => ({ id: d.id, ...d.data() } as UnansweredRecord))
        );
      } catch {
        // Data will remain empty — dashboard still renders
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  // Stats
  const helpfulCount = feedbackData.filter((f) => f.rating === 'helpful').length;
  const notHelpfulCount = feedbackData.filter((f) => f.rating === 'not_helpful').length;
  const reportedCount = feedbackData.filter((f) => f.rating === 'reported').length;
  const pendingUnanswered = unansweredData.filter((u) => u.reviewStatus === 'pending').length;

  // Filter sources
  const filteredSources = searchQuery
    ? knowledgeBase.filter(
        (e) =>
          e.canonicalQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : knowledgeBase;

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <DiaryTalksIcon size={56} className="mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm font-body text-gray-500 mt-2">Enter your admin email to access the DiaryTalks dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label htmlFor="adminEmail" className="block text-sm font-display font-semibold text-gray-800 mb-2">
              Admin Email
            </label>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                id="adminEmail"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setAuthError(''); }}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors"
              />
            </div>
            {authError && (
              <p className="text-sm text-red-500 font-body mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-nysc-600 text-white py-3 rounded-xl font-display font-semibold hover:bg-nysc-500 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
          <button
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-display mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to DiaryTalks
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'unanswered', label: `Unanswered (${pendingUnanswered})`, icon: HelpCircle },
    { id: 'feedback', label: `Feedback (${feedbackData.length})`, icon: MessageSquare },
    { id: 'sources', label: `Sources (${knowledgeBase.length})`, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DiaryTalksIcon size={36} />
            <div>
              <h1 className="text-lg font-display font-bold text-gray-900">DiaryTalks Admin</h1>
              <p className="text-xs font-body text-gray-400">{ADMIN_EMAIL}</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-display font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-display font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-nysc-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-nysc-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-gray-400 mt-3 font-body">Loading dashboard data...</p>
          </div>
        )}

        {!loading && activeTab === 'overview' && (
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={MessageSquare} label="Total Feedback" value={feedbackData.length} color="text-nysc-600 bg-nysc-50" />
              <StatCard icon={ThumbsUp} label="Helpful" value={helpfulCount} color="text-green-600 bg-green-50" />
              <StatCard icon={ThumbsDown} label="Not Helpful" value={notHelpfulCount} color="text-red-600 bg-red-50" />
              <StatCard icon={HelpCircle} label="Unanswered" value={pendingUnanswered} color="text-amber-600 bg-amber-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-display font-bold text-gray-900 mb-4">Knowledge Base Coverage</h3>
                <div className="space-y-2">
                  {Array.from(new Set(knowledgeBase.map((e) => e.category))).map((cat) => {
                    const count = knowledgeBase.filter((e) => e.category === cat).length;
                    return (
                      <div key={cat} className="flex items-center justify-between text-sm">
                        <span className="font-body text-gray-600">{cat}</span>
                        <span className="font-display font-semibold text-gray-800">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-display font-bold text-gray-900 mb-4">Recent Reports</h3>
                {reportedCount === 0 ? (
                  <p className="text-sm font-body text-gray-400">No reported answers yet.</p>
                ) : (
                  <div className="space-y-3">
                    {feedbackData
                      .filter((f) => f.rating === 'reported')
                      .slice(0, 5)
                      .map((f) => (
                        <div key={f.id} className="flex items-start gap-2 text-sm">
                          <Flag className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-body text-gray-700">Answer ID: {f.answerId}</p>
                            <p className="text-xs text-gray-400">{f.createdAt?.seconds ? new Date(f.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {!loading && activeTab === 'unanswered' && (
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-base font-display font-bold text-gray-900">Unanswered Questions</h3>
                <p className="text-sm font-body text-gray-500 mt-1">Questions that DiaryTalks could not answer from the knowledge base.</p>
              </div>
              {unansweredData.length === 0 ? (
                <div className="p-12 text-center">
                  <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-body text-gray-400">No unanswered questions recorded yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {unansweredData.map((u) => (
                    <div key={u.id} className="p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-body text-gray-800">{u.question}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs font-display font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {u.predictedCategory}
                          </span>
                          <span className="text-xs text-gray-400">
                            {u.createdAt?.seconds ? new Date(u.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-display font-medium ${
                        u.reviewStatus === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {u.reviewStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {!loading && activeTab === 'feedback' && (
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-base font-display font-bold text-gray-900">User Feedback</h3>
              </div>
              {feedbackData.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-body text-gray-400">No feedback received yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {feedbackData.map((f) => (
                    <div key={f.id} className="p-4 flex items-center gap-4">
                      {f.rating === 'helpful' && <ThumbsUp className="w-4 h-4 text-green-500" />}
                      {f.rating === 'not_helpful' && <ThumbsDown className="w-4 h-4 text-red-500" />}
                      {f.rating === 'reported' && <Flag className="w-4 h-4 text-amber-500" />}
                      <div className="flex-1">
                        <p className="text-sm font-body text-gray-700">
                          {f.rating === 'helpful' ? 'Helpful' : f.rating === 'not_helpful' ? 'Not helpful' : 'Reported'}
                          {f.reason && ` — ${f.reason}`}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {f.createdAt?.seconds ? new Date(f.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {!loading && activeTab === 'sources' && (
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-base font-display font-bold text-gray-900">Knowledge Base</h3>
                    <p className="text-sm font-body text-gray-500 mt-1">{knowledgeBase.length} entries across {new Set(knowledgeBase.map((e) => e.category)).size} categories</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search entries..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm font-body focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors w-64"
                    />
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredSources.map((entry) => (
                  <div key={entry.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-display font-semibold text-gray-800">{entry.canonicalQuestion}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-xs font-display font-medium text-nysc-600 bg-nysc-50 px-2 py-0.5 rounded-full">
                            {entry.category}
                          </span>
                          <span className={`text-xs font-display font-medium px-2 py-0.5 rounded-full ${
                            entry.sourceType === 'official'
                              ? 'text-green-700 bg-green-50'
                              : 'text-blue-700 bg-blue-50'
                          }`}>
                            {entry.sourceType}
                          </span>
                          <span className="text-xs text-gray-400">
                            Verified: {entry.lastVerified}
                          </span>
                        </div>
                        <p className="text-xs font-body text-gray-500 mt-2 line-clamp-2">{entry.answer}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {entry.alternativeQuestions.length} alternative phrasings
                        </p>
                      </div>
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-gray-400 hover:text-nysc-600 transition-colors"
                        aria-label={`View source: ${entry.sourceTitle}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

// Stat card sub-component
function StatCard({ icon: Icon, label, value, color }: {
  icon: typeof BarChart3;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
      <p className="text-sm font-body text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
