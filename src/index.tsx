import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from '@reduce/index';

import { queryClient } from '@utils/queryClient';

import '@constants/antdReset.css';
import colors from '@constants/colors';

import Router from '@pages/Router';

import '@src/customAntd.scss';
import '@src/index.css';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: colors.NAVY_BLUE_ORIGIN,
              borderRadius: 5,
              boxShadow: '20px 20px 40px #00000A',
              fontFamily: 'SpoqaHanSansNeo',
            },
          }}>
          <Router />
        </ConfigProvider>
      </PersistGate>
    </QueryClientProvider>
  </Provider>,
  // </React.StrictMode>,
);
