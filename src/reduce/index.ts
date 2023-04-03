import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';

import auth from '@reduce/auth';
import group from '@reduce/group';
import modals from '@reduce/modals';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['group'],
};

const middleware: any[] = [];

const rootReducer = combineReducers({
  auth,
  modals,
  group,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

middleware.push(ReduxThunk);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;
