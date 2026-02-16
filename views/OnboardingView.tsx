
import React, { useState } from 'react';
import { ProviderType, OnboardingStatus } from '../types';
import { Logo } from '../components/Logo';

interface OnboardingViewProps {
  onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<ProviderType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: '',
    bio: '',
  });

  const handleNext = () => setStep(step + 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Seja um Parceiro Conscius</h2>
        <p className="text-slate-500">Integre a rede de elite do Mental Pharma CLUB 2.0.</p>
      </div>

      {/* Step Progress */}
      <div className="flex items-center justify-center mb-12 gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
              step >= s ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-400'
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`h-1 w-12 rounded ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>}
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Selecione sua Categoria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: ProviderType.PSYCHIATRIST, label: 'Médico Psiquiatra', icon: '🩺', desc: 'Prescreva receitas digitais e atenda pacientes do Club.' },
                { id: ProviderType.PSYCHOLOGIST, label: 'Psicólogo Clínico', icon: '🧠', desc: 'Gestão de agenda e prontuário integrado Conscius.' },
                { id: ProviderType.GYM, label: 'Academia / Estúdio', icon: '🏋️', desc: 'Oferte planos corporativos com descontos agressivos.' },
                { id: ProviderType.PHARMACY, label: 'Farmácia de Manipulação', icon: '💊', desc: 'Venda medicamentos via split automático.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setType(opt.id); handleNext(); }}
                  className={`p-6 rounded-3xl border-2 text-left transition-all group hover:border-indigo-600 ${
                    type === opt.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  <span className="text-3xl mb-4 block">{opt.icon}</span>
                  <span className="block font-bold text-slate-900 text-lg mb-1">{opt.label}</span>
                  <span className="block text-xs text-slate-500 leading-relaxed font-medium">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Dados Profissionais</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nome Completo / Razão Social</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:outline-none font-medium"
                  placeholder="Ex: Dra. Tais Oliveira"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {type === ProviderType.GYM ? 'CNPJ' : type === ProviderType.PSYCHIATRIST ? 'CRM' : 'CRP'}
                </label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:outline-none font-medium"
                  placeholder="Registro Profissional"
                />
              </div>
              <button 
                onClick={handleNext}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl mt-8 hover:bg-indigo-600 transition-all"
              >
                Continuar para Documentação
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 text-center">
             <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto text-indigo-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Validação de Documentos</h3>
               <p className="text-slate-500 mb-8 max-w-sm mx-auto">Para garantir a segurança do CLUB, anexe uma foto legível da sua carteira profissional ou contrato social.</p>
             </div>

             <div className="border-2 border-dashed border-indigo-100 rounded-[2rem] p-12 bg-indigo-50/20 group hover:bg-indigo-50 transition-all cursor-pointer">
                <p className="text-indigo-600 font-bold mb-1">Arraste seu documento aqui</p>
                <p className="text-slate-400 text-xs font-medium">PNG, JPG ou PDF até 10MB</p>
             </div>

             <div className="bg-slate-900 text-white rounded-2xl p-6 text-left flex items-start gap-4">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-indigo-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.616.92v5.352c0 2.89-2.041 5.677-4.837 6.396l-3.327.854a1 1 0 01-.472 0l-3.327-.854C3.71 16.85 1.666 14.062 1.666 11.17V5.82a1 1 0 01.616-.92zM10 8a1 1 0 100-2 1 1 0 000 2zm0 5a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" /></svg>
                </div>
                <p className="text-xs font-medium leading-relaxed">
                  <strong>Protocolo de Segurança:</strong> Seus dados serão revisados pelo time administrativo da Conscius. Você receberá um e-mail em até 24h úteis confirmando sua ativação.
                </p>
             </div>

             <button 
                onClick={onComplete}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Finalizar Cadastro e Enviar para Revisão
              </button>
          </div>
        )}
      </div>
    </div>
  );
};
