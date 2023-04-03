import update from 'immutability-helper';

import type { ModalNames } from '@type/modalNames';

const OPEN_MODAL = 'modal/OPEN_MODAL' as const;
const CLOSE_MODAL = 'modal/CLOSE_MODAL' as const;
const CLOSE_ALL_MODAL = 'modal/CLOSE_ALL_MODAL' as const;

interface ModalData {
  name: ModalNames;
  props?: any;
  // props?: { [key in string]: any };
}

export const openModal = (modal: ModalData) => ({
  type: OPEN_MODAL,
  payload: modal,
});

export const closeModal = (name: ModalNames) => ({
  type: CLOSE_MODAL,
  payload: name,
});

export const closeAllModals = () => ({
  type: CLOSE_ALL_MODAL,
});

type ModalAction = ReturnType<typeof openModal | typeof closeModal | typeof closeAllModals>;

interface ModalState {
  openedModals: ModalData[];
}

const initialState: ModalState = {
  openedModals: [],
};

function modals(state: ModalState = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case OPEN_MODAL: {
      const isModal = state.openedModals.findIndex(v => v.name === action.payload.name) > -1;

      return {
        ...state,
        openedModals: isModal ? [...state.openedModals] : [...state.openedModals, action.payload],
      };
    }
    case CLOSE_MODAL: {
      const findIndex = state.openedModals.findIndex(v => v.name === action.payload);

      return update(state, {
        openedModals: {
          $splice: [[findIndex, 1]],
        },
      });
    }
    case CLOSE_ALL_MODAL: {
      return { ...state, openedModals: [] };
    }
    default:
      return state;
  }
}

export default modals;
