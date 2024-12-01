import React from 'react';
import { InterpreterPortal } from './pages/InterpreterPortal';
import { AuthGuard } from './components/auth/AuthGuard';

function App() {
  return (
    <AuthGuard allowedRoles={['interpreter']}>
      <InterpreterPortal />
    </AuthGuard>
  );
}

export default App;