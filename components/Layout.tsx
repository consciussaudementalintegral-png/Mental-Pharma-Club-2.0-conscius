
import React from 'react';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: string;
  onRoleChange: (role: any) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentRole, onRoleChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo />
            
            <nav className="flex items-center space-x-4">
              <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex space-x-1">
                {(['CUSTOMER', 'ONBOARDING', 'SUPPLIER', 'ADMIN'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => onRoleChange(role)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      currentRole === role
                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-100'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {role === 'ADMIN' ? 'CEO' : 
                     role === 'SUPPLIER' ? 'Portal Parceiro' : 
                     role === 'ONBOARDING' ? 'Seja Parceiro' : 'Paciente'}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="grayscale opacity-50 brightness-200">
               <Logo size="sm" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm font-medium text-slate-300">
                Conscius Saúde Mental Integral
              </p>
              <p className="text-xs mt-1">
                Propriedade Intelectual: Tais Oliveira de Paula &copy; {new Date().getFullYear()}
              </p>
              <p className="text-[10px] mt-4 text-slate-500 max-w-xs md:ml-auto leading-relaxed">
                Tecnologia de Split de Pagamento homologada via Stripe Connect. 
                Eficiência tributária garantida por intermediação de negócios.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
