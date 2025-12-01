import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FileText, Image as ImageIcon, ScanText, Key, DollarSign, Calculator, Calendar, Upload, Sparkles, Search 
} from 'lucide-react';
import { Tool } from '../types';

const tools: Tool[] = [
  { id: 'ocr', title: 'استخراج النص من الصور', description: 'حول الصور إلى نصوص قابلة للتعديل بدقة عالية تدعم العربية.', icon: ScanText, path: '/tools/ocr', category: 'ai' },
  { id: 'pdf-word', title: 'تحويل PDF إلى Word', description: 'حول ملفات PDF إلى مستندات Word بسهولة.', icon: FileText, path: '/tools/pdf-to-word', category: 'pdf' },
  { id: 'img-compress', title: 'ضغط الصور', description: 'قلل حجم صورك دون فقدان الجودة.', icon: ImageIcon, path: '/tools/compress-image', category: 'image' },
  { id: 'ai-writer', title: 'مساعد الكتابة الذكي', description: 'لخيص، إعادة صياغة، وتصحيح لغوي باستخدام الذكاء الاصطناعي.', icon: Sparkles, path: '/tools/ai-writer', category: 'ai' },
  { id: 'password', title: 'مولد كلمات مرور', description: 'أنشئ كلمات مرور قوية وآمنة لحساباتك.', icon: Key, path: '/tools/password-generator', category: 'security' },
  { id: 'currency', title: 'محول العملات', description: 'أسعار صرف العملات لحظة بلحظة.', icon: DollarSign, path: '/tools/currency', category: 'finance' },
  { id: 'salary', title: 'حاسبة الراتب', description: 'احسب راتبك الصافي بعد الخصومات والضرائب.', icon: Calculator, path: '/tools/salary', category: 'finance' },
  { id: 'date', title: 'تحويل التاريخ', description: 'حول بين الهجري والميلادي بدقة.', icon: Calendar, path: '/tools/date-converter', category: 'date' },
];

const Home: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesFilter = filter === 'all' || tool.category === filter;
    const matchesSearch = tool.title.includes(searchTerm) || tool.description.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>أدوات يومية عربية | الرئيسية</title>
        <meta name="description" content="أدوات مجانية عبر الإنترنت: تحويل PDF، استخراج نصوص، ذكاء اصطناعي، حسابات مالية والمزيد." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            أدواتك اليومية، <span className="text-primary-400">في مكان واحد</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            مجموعة متكاملة من الأدوات الرقمية الذكية لمساعدتك في إنجاز مهامك بسرعة وكفاءة. مجانية، آمنة، وتدعم اللغة العربية بالكامل.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن أداة (مثلاً: راتب، PDF، صور...)"
                className="w-full pr-10 pl-4 py-3 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-400 focus:outline-none shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <a href="#tools" className="bg-primary-500 hover:bg-primary-400 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2">
              تصفح الأدوات
            </a>
          </div>
        </div>
      </section>

      {/* Categories & Grid */}
      <section id="tools" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['all', 'pdf', 'image', 'ai', 'finance', 'security'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat === 'ai' ? 'ذكاء اصطناعي' : cat === 'pdf' ? 'PDF' : cat === 'image' ? 'صور' : cat === 'finance' ? 'مالية' : 'أمان'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <tool.icon size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">{tool.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">عذراً، لم نجد أدوات تطابق بحثك.</p>
          </div>
        )}
      </section>

      {/* Features / Why Us */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">لماذا تختار أدواتنا؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">مدعوم بالذكاء الاصطناعي</h3>
              <p className="text-slate-600">نستخدم أحدث تقنيات Gemini لضمان دقة النتائج خاصة في اللغة العربية.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">خصوصية تامة</h3>
              <p className="text-slate-600">ملفاتك تتم معالجتها بسرعة ولا يتم تخزينها على خوادمنا لفترات طويلة.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">تحديثات مستمرة</h3>
              <p className="text-slate-600">نضيف أدوات جديدة أسبوعياً بناءً على طلبات المستخدمين.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
