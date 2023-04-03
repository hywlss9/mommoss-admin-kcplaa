import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import type { ModalNames } from '@type/modalNames';

interface ModalData {
  name: ModalNames;
  props?: any;
}

interface ModalState {
  openedModals: ModalData[];
}

const initialState: ModalState = {
  openedModals: [],
};

const modals = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalData>) => {
      const isModal = state.openedModals.findIndex(v => v.name === action.payload.name) > -1;

      if (isModal) return;

      state.openedModals.push(action.payload);
    },
    closeModal: (state, action: PayloadAction<ModalNames>) => {
      const findIndex = state.openedModals.findIndex(v => v.name === action.payload);

      if (findIndex < 0) return;

      state.openedModals = update(state.openedModals, {
        $splice: [[findIndex, 1]],
      });
    },
    closeAllModals: state => {
      state.openedModals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modals.actions;
export default modals.reducer;
