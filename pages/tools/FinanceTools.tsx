import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SalaryDetails } from '../../types';
import { Calculator, DollarSign, ArrowRightLeft } from 'lucide-react';

export const SalaryCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(0);
  const [result, setResult] = useState<SalaryDetails | null>(null);

  const calculate = () => {
    const insurance = salary * 0.09; // Mock social insurance (9% e.g., KSA GOSI style)
    const taxable = salary - insurance;
    const tax = taxable > 5000 ? (taxable - 5000) * 0.15 : 0; // Mock simple progressive tax
    const net = salary - insurance - tax;

    setResult({
      gross: salary,
      insurance,
      tax,
      net
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-primary-500" />
        <h2 className="text-xl font-bold">حاسبة الراتب التقريبية</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">الراتب الإجمالي (الأساسي + البدلات)</label>
          <input
            type="number"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="مثال: 10000"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
        >
          احسب الصافي
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-slate-50 p-4 rounded-xl space-y-3">
          <div className="flex justify-between text-sm">
            <span>التأمينات الاجتماعية (9%):</span>
            <span className="font-bold text-red-500">-{result.insurance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>ضريبة الدخل التقديرية:</span>
            <span className="font-bold text-red-500">-{result.tax.toFixed(2)}</span>
          </div>
          <div className="h-px bg-slate-200 my-2"></div>
          <div className="flex justify-between text-lg font-bold text-primary-700">
            <span>الصافي:</span>
            <span>{result.net.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">* هذه الحسابات تقديرية وقد تختلف بناءً على قوانين بلدك.</p>
        </div>
      )}
    </div>
  );
};

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SAR');
  
  // Static rates for demo (Real app would use API)
  const rates: Record<string, number> = {
    USD: 1,
    SAR: 3.75,
    AED: 3.67,
    EGP: 48.50,
    EUR: 0.92,
    KWD: 0.31
  };

  const convert = () => {
    const fromRate = rates[from];
    const toRate = rates[to];
    return ((amount / fromRate) * toRate).toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="text-primary-500" />
        <h2 className="text-xl font-bold">محول العملات</h2>
      </div>

      <div className="space-y-4">
         <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">المبلغ</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <select 
            value={from} onChange={(e) => setFrom(e.target.value)}
            className="p-3 border border-slate-200 rounded-xl bg-white"
          >
            {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <div className="flex justify-center">
            <ArrowRightLeft size={20} className="text-slate-400" />
          </div>

          <select 
            value={to} onChange={(e) => setTo(e.target.value)}
            className="p-3 border border-slate-200 rounded-xl bg-white"
          >
            {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="bg-primary-50 p-4 rounded-xl text-center">
          <p className="text-sm text-primary-600 mb-1">{amount} {from} يساوي</p>
          <p className="text-3xl font-bold text-primary-800">{convert()} {to}</p>
        </div>
      </div>
    </div>
  );
};

const FinanceTools: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Helmet>
        <title>الأدوات المالية | أدوات يومية عربية</title>
        <meta name="description" content="حاسبة الراتب ومحول العملات. أدوات مالية بسيطة للمستخدم العربي." />
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">الأدوات المالية</h1>
        <p className="text-slate-600">حسابات دقيقة وسريعة لأموالك.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SalaryCalculator />
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default FinanceTools;
