import store from '@redux/store';
import Routes from '@routes/routes';
import React from 'react';
import {Text, View} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <ToastProvider>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <MenuProvider>
            <Routes />
          </MenuProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
