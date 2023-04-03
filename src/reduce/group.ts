import type { Group } from '@type/group';

const SET_GROUP = 'group/SET_GROUP' as const;

export const setGroup = (group: Group | null) => ({
  type: SET_GROUP,
  payload: group,
});

type GroupAction = ReturnType<typeof setGroup>;

interface GroupState {
  groupInfo: Group | null;
}

const initialState: GroupState = {
  groupInfo: null,
};

function group(state: GroupState = initialState, action: GroupAction): GroupState {
  switch (action.type) {
    case SET_GROUP: {
      return { ...state, groupInfo: action.payload };
    }
    default:
      return state;
  }
}

export default group;
