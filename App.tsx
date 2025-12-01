import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages
const OcrTool = React.lazy(() => import('./pages/tools/OcrTool'));
const AiWriter = React.lazy(() => import('./pages/tools/AiWriter'));
const FinanceTools = React.lazy(() => import('./pages/tools/FinanceTools'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Blog = React.lazy(() => import('./pages/Blog'));

// Fallback Loading
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-primary-600">
    <Loader2 className="animate-spin" size={48} />
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools/ocr" element={<OcrTool />} />
              <Route path="/tools/ai-writer" element={<AiWriter />} />
              <Route path="/tools/salary" element={<FinanceTools />} />
              <Route path="/tools/currency" element={<FinanceTools />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Placeholders for other tools */}
              <Route path="*" element={<div className="text-center py-20 text-slate-500">جاري العمل على هذه الصفحة...</div>} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
