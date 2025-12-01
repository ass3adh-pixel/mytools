import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <Helmet>
        <title>خطط الأسعار | أدوات يومية عربية</title>
        <meta name="description" content="اشترك في النسخة الاحترافية واحصل على ميزات حصرية." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">خطط تناسب الجميع</h1>
        <p className="text-xl text-slate-600">اختر الخطة المناسبة لاحتياجاتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">مجاني</h2>
          <p className="text-slate-500 mb-6">للاستخدام الشخصي البسيط</p>
          <div className="text-4xl font-bold text-slate-900 mb-8">0$ <span className="text-lg font-normal text-slate-500">/ شهر</span></div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <Check className="text-green-500" size={20} />
              <span>جميع الأدوات الأساسية</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-green-500" size={20} />
              <span>استخراج نص (OCR) محدود (5 صور/يوم)</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-green-500" size={20} />
              <span>ضغط صور بحد أقصى 5MB</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <X size={20} />
              <span>بدون إعلانات</span>
            </li>
             <li className="flex items-center gap-3 text-slate-400">
              <X size={20} />
              <span>دعم فني ذو أولوية</span>
            </li>
          </ul>

          <button className="w-full py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:border-slate-300 transition-colors">
            استمر مجاناً
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-primary-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-br-lg">الأكثر طلباً</div>
          <h2 className="text-2xl font-bold mb-2">احترافي Pro</h2>
          <p className="text-primary-200 mb-6">للمحترفين والإنتاجية العالية</p>
          <div className="text-4xl font-bold mb-8">9.99$ <span className="text-lg font-normal text-primary-300">/ شهر</span></div>
          
          <ul className="space-y-4 mb-8 text-primary-50">
            <li className="flex items-center gap-3">
              <Check className="text-yellow-400" size={20} />
              <span>استخدام غير محدود لجميع الأدوات</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-yellow-400" size={20} />
              <span>OCR غير محدود وبدقة أعلى</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-yellow-400" size={20} />
              <span>رفع ملفات حتى 50MB</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-yellow-400" size={20} />
              <span>تجربة خالية تماماً من الإعلانات</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-yellow-400" size={20} />
              <span>أولوية الوصول للأدوات الجديدة (Beta)</span>
            </li>
          </ul>

          <button className="w-full py-3 rounded-xl bg-white text-primary-900 font-bold hover:bg-primary-50 transition-colors">
            اشترك الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
