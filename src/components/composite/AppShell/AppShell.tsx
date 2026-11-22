import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePrototype } from '../../../data/prototype';
import { useToast } from '../../../app/toast';
import { Alert, Avatar, Button, Dialog } from '../../core';
import { Sidebar } from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';
import './AppShell.css';

/**
 * App shell: Sidebar + Topbar on desktop (Figma 1440 frames), mobile header
 * + drawer below 1024 (Figma 📱 Mobile · 375). Also hosts the global edge
 * cases: offline banner (U3) and session-expired dialog (U4).
 */
export interface AppShellProps {
  title: string;
  subtitle?: ReactNode;
  /** Shorter title for the mobile header */
  mobileTitle?: string;
  mobileSubtitle?: string;
  status?: ReactNode;
  showSearch?: boolean;
  /** Mobile header back target. Without it the header shows a menu button. */
  back?: string;
  children: ReactNode;
  /** Centered narrow content (Publish success) */
  narrow?: boolean;
}

export function AppShell({
  title, subtitle, mobileTitle, mobileSubtitle, status, showSearch = true, back, children, narrow,
}: AppShellProps) {
  const [drawer, setDrawer] = useState(false);
  const { settings, set } = usePrototype();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);
  useEffect(() => {
    document.title = `${title} · Academy`;
  }, [title]);

  const [wasOffline, setWasOffline] = useState(settings.offline);
  useEffect(() => {
    if (wasOffline && !settings.offline) toast.show({ tone: 'success', message: 'Back online. All changes synced.' });
    setWasOffline(settings.offline);
  }, [settings.offline]);

  return (
    <div className="app-shell">
      <div className="app-shell__sidebar"><Sidebar /></div>

      {drawer && (
        <div className="app-shell__drawer" role="dialog" aria-modal="true" aria-label="Main menu">
          <button type="button" className="app-shell__scrim" aria-label="Close menu" onClick={() => setDrawer(false)} />
          <div className="app-shell__drawer-panel">
            <button type="button" className="app-shell__drawer-close" aria-label="Close menu" onClick={() => setDrawer(false)}>
              <X aria-hidden />
            </button>
            <Sidebar onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="app-shell__main">
        <div className="app-shell__topbar">
          <Topbar title={title} subtitle={subtitle} status={status} showSearch={showSearch} />
        </div>

        <header className="app-shell__mobile-header">
          {back ? (
            <Link to={back} className="app-shell__mobile-btn" aria-label="Back"><ChevronLeft aria-hidden /></Link>
          ) : (
            <button type="button" className="app-shell__mobile-btn" aria-label="Open menu" onClick={() => setDrawer(true)}>
              <Menu aria-hidden />
            </button>
          )}
          <div className="app-shell__mobile-heading">
            <h1 className="app-shell__mobile-title">{mobileTitle ?? title}</h1>
            {(mobileSubtitle || status) && (
              <p className="app-shell__mobile-subtitle">{mobileSubtitle}{status}</p>
            )}
          </div>
          <Avatar name="Sanaz Kiani" size="sm" />
        </header>

        <main className={narrow ? 'app-shell__content app-shell__content--narrow' : 'app-shell__content'} id="main">
          {settings.offline && (
            <Alert
              tone="warning"
              title="You're offline"
              description="Changes are saved on this device and will sync when you're back online."
            />
          )}
          {children}
        </main>
      </div>

      <Dialog
        open={settings.sessionExpired}
        title="Your session has expired"
        dismissible={false}
        actions={
          <>
            <Button
              fullWidth
              onClick={() => {
                set({ sessionExpired: false });
                toast.show({ tone: 'success', message: 'Signed in again. Your draft is safe.' });
              }}
            >
              Sign in again
            </Button>
            <Button
              fullWidth
              variant="outlined"
              appearance="secondary"
              onClick={() => {
                set({ sessionExpired: false });
                navigate('/');
              }}
            >
              Go to dashboard
            </Button>
          </>
        }
      >
        For your security we signed you out. Your draft is saved, and you'll come back to this step.
      </Dialog>
    </div>
  );
}
