import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/contexts/auth';

import Routes from './src/routes';
import { LogBox, StatusBar } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#36393F" barStyle="light-content"
          translucent={false} />
          <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};
