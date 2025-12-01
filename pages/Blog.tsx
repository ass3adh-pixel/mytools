import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'أفضل 5 طرق لتحويل PDF إلى Word بالعربية',
    excerpt: 'تعرف على كيفية تحويل ملفات PDF المعقدة إلى مستندات Word قابلة للتعديل دون فقدان التنسيق.',
    date: '10 أكتوبر 2023',
    slug: 'pdf-to-word-arabic-guide'
  },
  {
    id: 2,
    title: 'كيف يعمل الـ OCR؟ استخراج النص من الصور',
    excerpt: 'شرح تقنية التعرف الضوئي على الحروف وكيف نستخدم الذكاء الاصطناعي لتحسين دقة اللغة العربية.',
    date: '15 أكتوبر 2023',
    slug: 'how-ocr-works'
  },
  {
    id: 3,
    title: 'نصائح لإدارة راتبك الشهري بذكاء',
    excerpt: 'استخدم حاسبة الراتب الخاصة بنا لتخطيط ميزانيتك وتجنب الديون غير الضرورية.',
    date: '20 أكتوبر 2023',
    slug: 'salary-management-tips'
  }
];

const Blog: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>المدونة | مقالات تقنية وشروحات أدوات يومية</title>
        <meta name="description" content="اقرأ أحدث المقالات حول التكنولوجيا، الأدوات الرقمية، وطرق زيادة الإنتاجية." />
      </Helmet>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">المدونة</h1>
        <p className="text-slate-600">مقالات وشروحات لزيادة إنتاجيتك.</p>
      </div>

      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-primary-600 mb-2">{article.date}</div>
            <Link to={`/blog/${article.slug}`}>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-primary-700 transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-slate-600 leading-relaxed mb-4">
              {article.excerpt}
            </p>
            <Link to={`/blog/${article.slug}`} className="text-primary-600 font-bold hover:underline">
              اقرأ المزيد ←
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
