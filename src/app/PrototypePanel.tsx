import { useState } from 'react';
import { FlaskConical, Moon, Sun, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePrototype, type PrototypeSettings } from '../data/prototype';
import { useStore } from '../data/store';
import { sampleCourse } from '../data/seed';
import './PrototypePanel.css';

/**
 * Moderator panel (not part of the product UI). Switch design-system modes
 * and simulate the UI states / edge cases from the UX doc during a test.
 * Hidden with `?panel=off` so participants don't see it.
 */
export function PrototypePanel() {
  const { settings, set, resetSettings } = usePrototype();
  const { reset, getCourse, updateCourse } = useStore();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hidden = new URLSearchParams(window.location.search).get('panel') === 'off';
  if (hidden) return null;

  const courseId = pathname.match(/^\/courses\/([^/]+)\/(basic|details|sessions|preview)/)?.[1];
  const course = getCourse(courseId);

  const toggle = (key: keyof PrototypeSettings, label: string) => (
    <label className="proto-panel__check">
      <input type="checkbox" checked={Boolean(settings[key])} onChange={(e) => set({ [key]: e.target.checked } as Partial<PrototypeSettings>)} />
      {label}
    </label>
  );

  return (
    <div className="proto-panel">
      <button
        type="button"
        className="proto-panel__theme"
        aria-label={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title="Toggle dark mode"
        onClick={() => set({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
      >
        {settings.theme === 'dark' ? <Sun aria-hidden /> : <Moon aria-hidden />}
      </button>
      <button type="button" className="proto-panel__fab" aria-expanded={open} aria-controls="proto-panel" onClick={() => setOpen(!open)}>
        <FlaskConical aria-hidden /> Prototype
      </button>
      {open && (
        <section className="proto-panel__sheet" id="proto-panel" aria-label="Prototype controls">
          <header className="proto-panel__header">
            <strong>Prototype controls</strong>
            <button type="button" aria-label="Close prototype controls" className="proto-panel__close" onClick={() => setOpen(false)}><X aria-hidden /></button>
          </header>

          <fieldset className="proto-panel__group">
            <legend>Design system modes</legend>
            <label className="proto-panel__field">Theme
              <select value={settings.theme} onChange={(e) => set({ theme: e.target.value as PrototypeSettings['theme'] })}>
                <option value="light">Light</option><option value="dark">Dark</option>
              </select>
            </label>
            <label className="proto-panel__field">Brand
              <select value={settings.brand} onChange={(e) => set({ brand: e.target.value as PrototypeSettings['brand'] })}>
                <option value="default">Default</option><option value="red-brand">Red brand</option>
              </select>
            </label>
            <label className="proto-panel__field">Radius
              <select value={settings.radius} onChange={(e) => set({ radius: e.target.value as PrototypeSettings['radius'] })}>
                <option value="default">Default</option><option value="none-radius">None radius</option>
              </select>
            </label>
            <label className="proto-panel__field">Font
              <select value={settings.font} onChange={(e) => set({ font: e.target.value as PrototypeSettings['font'] })}>
                <option value="default">Inter</option><option value="new-font">New font (mono)</option>
              </select>
            </label>
          </fieldset>

          <fieldset className="proto-panel__group">
            <legend>States &amp; edge cases</legend>
            <label className="proto-panel__field">Course list
              <select value={settings.listState} onChange={(e) => set({ listState: e.target.value as PrototypeSettings['listState'] })}>
                <option value="ready">Loads normally</option>
                <option value="loading">Stays loading</option>
                <option value="error">Fails first time</option>
              </select>
            </label>
            <label className="proto-panel__field">Latency
              <select value={settings.latency} onChange={(e) => set({ latency: Number(e.target.value) })}>
                <option value={0}>None</option><option value={700}>Normal</option><option value={2500}>Slow</option>
              </select>
            </label>
            {toggle('offline', 'Offline')}
            {toggle('sessionExpired', 'Session expired')}
            {toggle('publishFails', 'Publish fails')}
            {toggle('uploadFails', 'Cover upload fails')}
          </fieldset>

          <fieldset className="proto-panel__group">
            <legend>Data</legend>
            {course && (
              <button type="button" className="proto-panel__btn" onClick={() => updateCourse(course.id, sampleCourse())}>
                Fill this course with sample data
              </button>
            )}
            <button type="button" className="proto-panel__btn" onClick={() => { reset(); navigate('/'); }}>Reset sample courses</button>
            <button type="button" className="proto-panel__btn" onClick={() => { reset(true); navigate('/'); }}>New instructor (no courses)</button>
            <button type="button" className="proto-panel__btn" onClick={resetSettings}>Reset simulations</button>
          </fieldset>
        </section>
      )}
    </div>
  );
}
