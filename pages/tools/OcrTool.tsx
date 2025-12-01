import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { extractTextFromImage, fileToBase64 } from '../../services/geminiService';
import { Upload, Copy, Check, Loader2, AlertCircle } from 'lucide-react';

const OcrTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [resultText, setResultText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResultText('');
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleExtract = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    setResultText('');

    try {
      const base64 = await fileToBase64(file);
      const text = await extractTextFromImage(base64, file.type);
      setResultText(text);
    } catch (err) {
      setError('حدث خطأ أثناء استخراج النص. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>استخراج النص من الصور (OCR) | أدوات يومية عربية</title>
        <meta name="description" content="أداة مجانية لاستخراج النصوص العربية والإنجليزية من الصور بدقة عالية باستخدام الذكاء الاصطناعي." />
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">استخراج النص من الصور (OCR)</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          حول الصور والمستندات الممسوحة ضوئياً إلى نصوص قابلة للتعديل والنسخ. ندعم اللغة العربية بدقة عالية.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-8">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-primary-500 mb-4" />
              <p className="text-lg font-medium text-slate-700 mb-1">
                {file ? file.name : 'اضغط للرفع أو اسحب الصورة هنا'}
              </p>
              <p className="text-sm text-slate-500">PNG, JPG, JPEG (الحد الأقصى 5MB)</p>
            </div>
          </div>

          {/* Preview */}
          {imagePreview && (
            <div className="mt-8 flex justify-center">
              <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg shadow-md" />
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleExtract}
              disabled={!file || loading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> جاري المعالجة...
                </>
              ) : (
                'استخرج النص'
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* Result Area */}
          {resultText && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">النص المستخرج:</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'تم النسخ' : 'نسخ النص'}
                </button>
              </div>
              <textarea
                value={resultText}
                readOnly
                className="w-full h-64 p-4 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none resize-none text-slate-800 leading-relaxed"
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OcrTool;
