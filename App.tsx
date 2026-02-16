
import React, { useState } from 'react';
import { CEOView } from './views/CEOView';
import { PharmacyView } from './views/PharmacyView';
import { CustomerView } from './views/CustomerView';
import { OnboardingView } from './views/OnboardingView';
import { ProviderPortal } from './views/ProviderPortal';
import { Layout } from './components/Layout';

type UserRole = 'ADMIN' | 'SUPPLIER' | 'CUSTOMER' | 'ONBOARDING';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('CUSTOMER');

  return (
    <Layout currentRole={role} onRoleChange={setRole}>
      {role === 'ADMIN' && <CEOView />}
      {role === 'SUPPLIER' && <ProviderPortal />}
      {role === 'CUSTOMER' && <CustomerView />}
      {role === 'ONBOARDING' && <OnboardingView onComplete={() => setRole('SUPPLIER')} />}
    </Layout>
  );
};

export default App;
