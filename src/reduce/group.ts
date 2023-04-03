import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Group as GroupInfo } from '@type/group';

interface Group {
  groupInfo: GroupInfo | null;
}

const initialState: Group = { groupInfo: null };

const group = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupInfo: (state, action: PayloadAction<GroupInfo>) => {
      state.groupInfo = action.payload;
    },
    resetGroup: state => {
      state = initialState;
    },
  },
});

export const { setGroupInfo, resetGroup } = group.actions;
export default group.reducer;
