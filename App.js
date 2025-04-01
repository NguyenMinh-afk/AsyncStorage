import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext'; // Import AuthProvider
import AppRouter from './src/routers/index'; // Import Router chính của ứng dụng

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
