
import React, { useState } from 'react';
import { ProviderType, OrderStatus } from '../types';

export const ProviderPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock do perfil atual (em um app real viria do Auth/Supabase)
  const [providerProfile] = useState({
    name: 'Dra. Tais Oliveira',
    type: ProviderType.PSYCHIATRIST,
    status: 'ACTIVE'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
            Portal do Parceiro • {providerProfile.type}
          </span>
          <h2 className="text-3xl font-black text-slate-900">Olá, {providerProfile.name}</h2>
          <p className="text-slate-500 font-medium">Gerencie sua agenda, receitas e recebimentos.</p>
        </div>
        
        <div className="flex gap-3">
          {providerProfile.type === ProviderType.PSYCHIATRIST && (
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Nova Receita Digital
            </button>
          )}
          {providerProfile.type === ProviderType.GYM && (
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 11v1m5-10v1m0 8v1m-10-9h12M4 6h16M4 18h16" /></svg>
              Scanner QR Code Check-in
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <nav className="lg:col-span-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'agenda', label: providerProfile.type === ProviderType.PHARMACY ? 'Pedidos' : 'Agenda', icon: '📅' },
            { id: 'wallet', label: 'Carteira & Splits', icon: '💰' },
            { id: 'profile', label: 'Bio & Documentos', icon: '👤' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                activeTab === item.id 
                ? 'bg-white border-indigo-100 text-indigo-600 shadow-sm' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Main Workspace */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-between h-56">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Seus Recebimentos (Split Ativo)</p>
                  <p className="text-4xl font-black">R$ 8.420,50</p>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-xs text-emerald-400 font-bold">● Pronto para saque</span>
                  <button className="text-[10px] font-black uppercase bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">Ver Extrato</button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] flex flex-col justify-between h-56 shadow-sm">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Sua Avaliação Média</p>
                  <div className="flex items-center gap-2">
                    <p className="text-4xl font-black text-slate-900">4.9</p>
                    <div className="flex text-amber-400 text-xl">★★★★★</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium italic">Baseado em 142 feedbacks de clientes CLUB 2.0</p>
              </div>
            </div>
          )}

          {activeTab === 'agenda' && providerProfile.type === ProviderType.PHARMACY && (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-100">
                <h3 className="font-black text-slate-900">Validação de Receitas</h3>
                <p className="text-sm text-slate-500">Aprovação necessária para captura do pagamento no Stripe.</p>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { id: 'ORD-1', customer: 'Roberto Silva', item: 'Clonazepam 2mg', status: 'PENDING' },
                  { id: 'ORD-2', customer: 'Mariana Luz', item: 'Fluoxetina 20mg', status: 'PENDING' },
                ].map((order) => (
                  <div key={order.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{order.customer}</p>
                        <p className="text-xs text-slate-500">{order.item} • #{order.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100">Ver Receita</button>
                       <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-100">Aprovar & Cobrar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-10">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg mb-2">Conformidade Fiscal Inteligente</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Sua conta está configurada no modelo de <strong>Intermediação de Negócios</strong>. 
                    A Conscius retém apenas o Take Rate, garantindo que você não pague imposto sobre o 
                    faturamento que pertence a nós, e nós não pagamos sobre o que pertence a você. 
                    Economia tributária aplicada automaticamente via split Stripe Connect.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
