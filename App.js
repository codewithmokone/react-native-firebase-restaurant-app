import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
     <AppNavigation />
    </Provider>
  );
}

export default App;

