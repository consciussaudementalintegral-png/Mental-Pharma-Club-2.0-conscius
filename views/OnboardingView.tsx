
import React, { useState } from 'react';
import { ProviderType } from '../types';
import { Logo } from '../components/Logo';

interface OnboardingViewProps {
  onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<ProviderType | null>(null);
  const [formData, setFormData] = useState({
    name: '', // Nome Completo ou Razão Social
    tradingName: '', // Nome Fantasia
    email: '',
    phone: '',
    documentNumber: '', // Numero de registro profissional (CRM/CRP) ou CNPJ
    responsibleCpf: '', // CPF do Responsável (para Academias)
    techResponsible: '', // Responsável Técnico (para Farmácias)
    bio: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Onboarding de Parceiros</h2>
        <p className="text-slate-500 font-medium italic">Protocolo de Expansão Conscius Saúde Mental Integral</p>
      </div>

      {/* Step Progress Indicator */}
      <div className="flex items-center justify-center mb-12 gap-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black border-2 transition-all shadow-sm ${
              step >= s ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-300'
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`h-1 w-16 rounded-full ${step > s ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>}
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center max-w-sm mx-auto">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Qual o seu perfil?</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Selecione sua categoria para iniciarmos o processo de compliance.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: ProviderType.PSYCHIATRIST, label: 'Médico Psiquiatra', icon: '🩺', desc: 'Prescrições digitais e telemedicina club.' },
                { id: ProviderType.PSYCHOLOGIST, label: 'Psicólogo Clínico', icon: '🧠', desc: 'Gestão de sessões e bio profissional Conscius.' },
                { id: ProviderType.GYM, label: 'Academia / Estúdio', icon: '🏋️', desc: 'Planos corporativos com até 70% de desconto.' },
                { id: ProviderType.PHARMACY, label: 'Farmácia Parceira', icon: '💊', desc: 'Venda via split e validação de receitas.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setType(opt.id); handleNext(); }}
                  className={`p-8 rounded-[2rem] border-2 text-left transition-all group hover:scale-[1.02] hover:shadow-lg ${
                    type === opt.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-50 bg-slate-50/30'
                  }`}
                >
                  <span className="text-4xl mb-6 block">{opt.icon}</span>
                  <span className="block font-black text-slate-900 text-xl mb-1 tracking-tight">{opt.label}</span>
                  <span className="block text-xs text-slate-500 leading-relaxed font-bold italic">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <header className="flex justify-between items-center border-b border-slate-50 pb-6">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Formulário de Credenciamento</h3>
              <button onClick={handleBack} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Voltar</button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campos comuns */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  {type === ProviderType.GYM || type === ProviderType.PHARMACY ? 'Razão Social' : 'Nome Completo'}
                </label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                  placeholder={type === ProviderType.GYM ? "Ex: Academia Saúde Total Ltda" : "Ex: Dra. Tais Oliveira"}
                />
              </div>

              {type === ProviderType.GYM && (
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Nome Fantasia</label>
                  <input 
                    type="text" name="tradingName" value={formData.tradingName} onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                    placeholder="Ex: GYM Conscius Unidade 1"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">E-mail Profissional</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Telefone / WhatsApp</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                />
              </div>

              {/* Lógica Condicional de Documentos */}
              {(type === ProviderType.PSYCHIATRIST || type === ProviderType.PSYCHOLOGIST) && (
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Numero de registro profissional (CRM/CRP)</label>
                  <input 
                    type="text" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                    placeholder="Número do Registro Ativo"
                  />
                </div>
              )}

              {(type === ProviderType.GYM || type === ProviderType.PHARMACY) && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">CNPJ</label>
                  <input 
                    type="text" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                    placeholder="00.000.000/0001-00"
                  />
                </div>
              )}

              {type === ProviderType.GYM && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">CPF do Responsável</label>
                  <input 
                    type="text" name="responsibleCpf" value={formData.responsibleCpf} onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                    placeholder="000.000.000-00"
                  />
                </div>
              )}

              {type === ProviderType.PHARMACY && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Responsável Técnico</label>
                  <input 
                    type="text" name="techResponsible" value={formData.techResponsible} onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                    placeholder="Nome Completo do Farmacêutico"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Endereço Comercial Completo</label>
                <input 
                  type="text" name="address" value={formData.address} onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700"
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                />
              </div>

              {(type === ProviderType.PSYCHIATRIST || type === ProviderType.PSYCHOLOGIST) && (
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Mini Bio / Abordagem Clínica</label>
                  <textarea 
                    name="bio" value={formData.bio} onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-600/10 focus:outline-none font-bold text-slate-700 h-32 resize-none"
                    placeholder="Conte brevemente sua experiência e especialidades..."
                  />
                </div>
              )}
            </div>

            <button 
              onClick={handleNext}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] mt-8 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
            >
              Continuar para Documentação
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in slide-in-from-right duration-500 text-center">
             <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-600 mb-8 border border-indigo-100">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
             </div>
             
             <div>
               <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Validação de Segurança</h3>
               <p className="text-slate-500 font-medium italic max-w-sm mx-auto">Anexe os comprovantes para que o Admin Conscius realize a ativação do seu perfil.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-indigo-100 rounded-[2.5rem] p-10 bg-indigo-50/20 group hover:bg-indigo-50 transition-all cursor-pointer">
                  <p className="text-indigo-600 font-black mb-1">
                    {type === ProviderType.GYM || type === ProviderType.PHARMACY ? 'Contrato Social / Alvará' : 'Carteira Profissional'}
                  </p>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Clique ou arraste (PDF/JPG)</p>
                </div>
                
                <div className="border-2 border-dashed border-indigo-100 rounded-[2.5rem] p-10 bg-indigo-50/20 group hover:bg-indigo-50 transition-all cursor-pointer">
                  <p className="text-indigo-600 font-black mb-1">
                    {type === ProviderType.GYM ? 'Fotos da Unidade' : 'Foto de Perfil Profissional'}
                  </p>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Até 5 arquivos (MAX 20MB)</p>
                </div>
             </div>

             <div className="bg-slate-900 text-white rounded-[2rem] p-8 text-left flex items-start gap-5 border border-white/10">
                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-black mb-1 uppercase tracking-widest text-indigo-400">Garantia de Compliance</p>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Sua documentação será analisada manualmente pelo time de auditoria da <strong>Conscius Saúde Mental Integral</strong> em até 48h. Você receberá notificações automáticas via E-mail e WhatsApp sobre o status da ativação.
                  </p>
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <button 
                  onClick={onComplete}
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200"
                >
                  Finalizar Cadastro e Enviar para Auditoria
                </button>
                <button onClick={handleBack} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600">Revisar Informações Anteriores</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
