import { StrictMode, Component, type ReactNode, type ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ─── Error Boundary ───────────────────────────────────────────────────────────
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[NYSC Diary] Unhandled render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '2rem',
          background: '#f0fdf4',
          color: '#166534',
          textAlign: 'center',
        }}>
          <img src="/nysc-diary-logo.png" alt="NYSC Diary" style={{ height: 64, marginBottom: 24 }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: '#374151', marginBottom: 24, maxWidth: 480 }}>
            We're sorry — NYSC Diary encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#16a34a',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Refresh Page
          </button>
          {import.meta.env.DEV && (
            <pre style={{
              marginTop: 24,
              padding: '1rem',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: 8,
              fontSize: '0.75rem',
              textAlign: 'left',
              maxWidth: '100%',
              overflowX: 'auto',
            }}>
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Mount ────────────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
