
import React, { useState, useEffect } from 'react';
import { Product, ProviderType } from '../types';
import { Logo } from '../components/Logo';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Escitalopram 10mg', price: 65.00, requiresPrescription: true, providerId: 'P1', category: 'FARMÁCIA' },
  { id: '2', name: 'Plano Black Mensal', price: 99.00, originalPrice: 330.00, requiresPrescription: false, providerId: 'A1', category: 'ACADEMIA' },
  { id: '3', name: 'Sessão Psicoterapia TCC', price: 150.00, requiresPrescription: false, providerId: 'S1', category: 'PSICOLOGIA' },
  { id: '4', name: 'Sertralina 50mg', price: 112.00, requiresPrescription: true, providerId: 'P1', category: 'FARMÁCIA' },
];

export const CustomerView: React.FC = () => {
  const [totalSaved, setTotalSaved] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Efeito de contador animado para "Economia Real"
  useEffect(() => {
    const target = 1450.80;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = target * progress;
      setTotalSaved(current);

      if (frame === totalFrames) clearInterval(counter);
    }, frameDuration);

    return () => clearInterval(counter);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Economy Header */}
      <div className="bg-slate-900 rounded-[3rem] p-10 mb-12 flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden">
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-3xl font-black mb-2">Mental Pharma CLUB</h2>
          <p className="text-slate-400 font-medium">Saúde mental acessível, sem burocracia.</p>
        </div>
        
        <div className="relative z-10 bg-white/10 px-8 py-6 rounded-3xl border border-white/10 mt-6 md:mt-0 text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Você já economizou</p>
           <p className="text-4xl font-black text-white">R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <Logo variant="symbol" size="lg" className="scale-[5]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all group">
            <div className="h-48 bg-slate-50 flex items-center justify-center relative">
               <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm text-indigo-600">
                 {p.category}
               </span>
               <svg className="w-16 h-16 text-slate-200 group-hover:text-indigo-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.823.362 2.25 2.25 0 00-1.127 1.944v1.854c0 .35.253.642.597.69l15.654 2.155c.344.047.653-.18.723-.526l1.107-5.71a2 2 0 00-1.127-2.128zM15 11V3m0 0l-3 3m3-3l3 3" /></svg>
            </div>
            <div className="p-8">
              <h3 className="font-black text-slate-900 text-xl leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{p.name}</h3>
              
              {p.originalPrice && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-slate-400 line-through text-xs font-bold">R$ {p.originalPrice.toFixed(2)}</span>
                  <span className="text-emerald-600 text-[10px] font-black uppercase bg-emerald-50 px-2 py-0.5 rounded">70% OFF</span>
                </div>
              )}
              
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-slate-400">R$</span>
                <span className="text-3xl font-black text-slate-900">{p.price.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full mt-8 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-100"
              >
                <span>Adquirir Agora</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mock Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] max-w-lg w-full p-12 animate-in fade-in zoom-in duration-300">
              <div className="text-center mb-10">
                <Logo variant="symbol" size="sm" className="mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900">Checkout Seguro</h3>
                <p className="text-slate-500 font-medium">Ambiente homologado Conscius & Stripe</p>
              </div>

              <div className="space-y-6 mb-10">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Resumo da Compra</p>
                    <div className="flex justify-between items-center mb-4">
                       <span className="font-bold text-slate-900">Escitalopram 10mg</span>
                       <span className="font-bold text-slate-900">R$ 65,00</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                       <span>Taxa Conscius Club</span>
                       <span className="text-emerald-600 font-bold">Grátis (Benefício Assinante)</span>
                    </div>
                 </div>

                 <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Este pagamento será processado via <strong>Stripe Connect</strong>. O valor será autorizado agora e capturado apenas após a validação da sua receita pela farmácia parceira.
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setIsCheckoutOpen(false)} className="py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all">Cancelar</button>
                 <button onClick={() => { setIsCheckoutOpen(false); alert('Pagamento Autorizado!'); }} className="py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Finalizar R$ 65,00</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
