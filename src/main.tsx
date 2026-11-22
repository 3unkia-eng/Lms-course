import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Order matters: generated tokens → prototype extension → base → text styles.
import './styles/tokens.css';
import './styles/tokens.ext.css';
import './styles/base.css';
import './styles/typography.css';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
