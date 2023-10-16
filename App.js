import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import { store } from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey='pk_test_51NxnC4BeSY6ufzumLK8MdtlLxpI1qOUD4Ri0KqpNcCxsITV0PzXQpj3YsNaC0aLEeoBrOeIsfw6RgAYQTfDZSfZ000vGUVzUTN'>
      <AppNavigation />
      </StripeProvider>
    </Provider>
  );
}

export default App;

