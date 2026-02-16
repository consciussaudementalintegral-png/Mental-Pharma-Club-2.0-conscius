
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { SaaSMetrics } from '../types';

const mockData = [
  { name: 'Jan', gmv: 45000, profit: 4500 },
  { name: 'Fev', gmv: 52000, profit: 5200 },
  { name: 'Mar', gmv: 48000, profit: 4800 },
  { name: 'Abr', gmv: 61000, profit: 6100 },
  { name: 'Mai', gmv: 75000, profit: 7500 },
];

export const CEOView: React.FC = () => {
  const metrics: SaaSMetrics = {
    mrr: 15420,
    arr: 185000,
    churnRate: 1.8,
    ltvCac: 4.2,
    gmv: 75000,
    realProfit: 11250, // Foco em lucro real após impostos sobre a comissão
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Painel do CEO</h2>
          <p className="text-slate-500 font-medium">Gestão Estratégica Conscius • <span className="text-emerald-600">Compliance Ativo</span></p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-2">
           <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Consolidado Mensal</button>
           <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-50">Anual</button>
        </div>
      </header>

      {/* Seção Financeira Principal: Dinheiro Real */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Lucro Líquido Real (Take Rate)</p>
              <h3 className="text-6xl font-black tracking-tighter mb-4">R$ {metrics.realProfit.toLocaleString('pt-BR')}</h3>
              <p className="text-sm text-indigo-100 max-w-lg leading-relaxed font-medium">
                Este valor representa a receita bruta da Conscius após descontos de taxas do Stripe. 
                Sua tributação (ISS/PIS/COFINS) é aplicada <strong>exclusivamente</strong> sobre este montante de intermediação, 
                protegendo o GMV total de bi-tributação desnecessária.
              </p>
           </div>
           {/* Grafismo decorativo */}
           <div className="absolute -bottom-20 -right-20 opacity-10 rotate-12">
              <div className="w-80 h-80 border-[40px] border-white rounded-full"></div>
           </div>
        </div>

        <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm">
           <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Volume Total Transacionado (GMV)</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">R$ {metrics.gmv.toLocaleString('pt-BR')}</h3>
           </div>
           <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-500">Net Take Rate</span>
                 <span className="text-lg font-black text-indigo-600">15%</span>
              </div>
              <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden">
                 <div className="w-[15%] h-full bg-indigo-600"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Fila de Aprovação de Parceiros (Compliance) */}
      <section className="bg-amber-50 border border-amber-100 rounded-[3rem] p-10">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center text-amber-700">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
               <h4 className="font-black text-slate-900 text-lg">Compliance de Onboarding</h4>
               <p className="text-sm text-slate-500 font-medium">3 Novos parceiros aguardando validação jurídica de CRM/CRP/CNPJ.</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Lucas Mendes', type: 'Psiquiatra', reg: 'CRM-SP 12345' },
              { name: 'Ana Souza', type: 'Psicóloga', reg: 'CRP-06/789' },
              { name: 'BioRitmo Unidade Paulista', type: 'Academia', reg: 'CNPJ 00.123/001' }
            ].map((req, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                   <p className="font-black text-slate-900">{req.name}</p>
                   <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-1">{req.type}</p>
                   <p className="text-[10px] text-slate-400 mt-1 font-medium italic">{req.reg}</p>
                </div>
                <div className="mt-6 flex gap-2">
                   <button className="flex-1 bg-amber-50 text-amber-700 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-amber-100 transition-all">Revisar Docs</button>
                   <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">Ativar</button>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* Gráfico de Crescimento SaaS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
            <h4 className="text-slate-900 font-black mb-8 flex items-center gap-3">
               <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
               SaaS Health Metrics (Club Subscription)
            </h4>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">MRR (Assinaturas)</p>
                  <p className="text-3xl font-black text-slate-900">R$ {metrics.mrr.toLocaleString('pt-BR')}</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Taxa de Churn</p>
                  <p className="text-3xl font-black text-rose-600">{metrics.churnRate}%</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">LTV / CAC Ratio</p>
                  <p className="text-3xl font-black text-indigo-600">{metrics.ltvCac}x</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Payback Period</p>
                  <p className="text-3xl font-black text-slate-900">4.1 meses</p>
               </div>
            </div>
         </div>

         <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
            <h4 className="text-slate-900 font-black mb-8 flex items-center gap-3">
               <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
               Evolução Mensal (GMV)
            </h4>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                     <defs>
                        <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#64748b'}} />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px' }}
                     />
                     <Area type="monotone" dataKey="gmv" stroke="#6366f1" fillOpacity={1} fill="url(#colorGmv)" strokeWidth={5} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};
