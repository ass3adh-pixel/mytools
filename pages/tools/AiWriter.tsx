import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { processTextWithAi } from '../../services/geminiService';
import { Sparkles, Loader2, RefreshCcw, Check, Copy } from 'lucide-react';

const AiWriter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'summarize' | 'rewrite' | 'proofread'>('summarize');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const output = await processTextWithAi(inputText, mode);
      setResult(output);
    } catch (error) {
      setResult('حدث خطأ. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>مساعد الكتابة الذكي | أدوات يومية عربية</title>
        <meta name="description" content="أدوات ذكاء اصطناعي لتلخيص النصوص، إعادة صياغتها، وتصحيحها لغوياً." />
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-primary-500" /> مساعد الكتابة الذكي
        </h1>
        <p className="text-slate-600">حسن جودة كتابتك العربية باستخدام الذكاء الاصطناعي المتقدم.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit mx-auto">
          {[
            { id: 'summarize', label: 'تلخيص' },
            { id: 'rewrite', label: 'إعادة صياغة' },
            { id: 'proofread', label: 'تصحيح لغوي' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-slate-700 mb-2">النص الأصلي</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب أو الصق النص هنا..."
              className="flex-grow min-h-[300px] p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            ></textarea>
            <div className="mt-4 flex justify-end">
               <button
                onClick={handleProcess}
                disabled={!inputText.trim() || loading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <RefreshCcw size={18} />}
                {mode === 'summarize' ? 'لخص النص' : mode === 'rewrite' ? 'أعد الصياغة' : 'صحح النص'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-slate-700 mb-2">النتيجة</label>
            <div className={`flex-grow min-h-[300px] p-4 border rounded-xl relative ${result ? 'bg-primary-50 border-primary-200' : 'bg-slate-50 border-slate-200'}`}>
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin" size={32} />
                    <span>جاري التفكير...</span>
                  </div>
                </div>
              ) : result ? (
                <p className="whitespace-pre-wrap leading-relaxed text-slate-800">{result}</p>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                  ستظهر النتيجة هنا
                </div>
              )}
            </div>
             {result && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-bold"
                >
                  <Copy size={16} /> نسخ النتيجة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiWriter;
