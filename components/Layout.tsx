import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, Home, Info, Phone, FileText, CreditCard } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الأدوات', path: '/#tools', icon: Wrench },
    { name: 'الأسعار', path: '/pricing', icon: CreditCard },
    { name: 'المدونة', path: '/blog', icon: FileText },
    { name: 'عن الموقع', path: '/about', icon: Info },
    { name: 'اتصل بنا', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-lg text-white">
                <Wrench size={24} />
              </div>
              <span className="font-bold text-xl text-primary-900">أدوات يومية</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
                  }`}
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              ))}
              <Link to="/pricing" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-md shadow-primary-500/20">
                نسخة Pro
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-primary-600 hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path) 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                  }`}
                >
                  <link.icon size={20} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Wrench size={24} />
              <span className="font-bold text-xl">أدوات يومية</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              منصتك العربية الأولى للأدوات الرقمية والذكاء الاصطناعي. نسهل حياتك الرقمية بأدوات سريعة وآمنة.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">الرئيسية</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">المقالات</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">خطط الأسعار</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">قانوني</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">شروط الاستخدام</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">نشرة بريدية</h3>
            <p className="text-xs mb-4">اشترك للحصول على آخر التحديثات والأدوات الجديدة.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="بريدك الإلكتروني" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-primary-500" />
              <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                اشترك
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} أدوات يومية عربية. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
