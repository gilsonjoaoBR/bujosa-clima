import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { scrollToSection } from './lib/scroll';

/**
 * Mantém a rolagem coerente: âncoras rolam até a seção e rotas novas voltam ao
 * topo. A dependência em `key` garante que a rolagem aconteça a cada navegação,
 * inclusive quando só o hash muda.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));

      if (document.getElementById(id)) {
        scrollToSection(id);
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key]);

  /**
   * Navegações por âncora que não passam pelo roteador (por exemplo, o link
   * "Ir para o conteúdo") também precisam do mesmo cuidado com a rolagem suave.
   */
  useEffect(() => {
    const handleHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));

      if (id) {
        scrollToSection(id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacidade" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
