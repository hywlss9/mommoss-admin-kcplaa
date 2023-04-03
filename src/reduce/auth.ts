export const SET_AUTH = 'AUTH/SET_AUTH';

export const setAuth = (data: Partial<Auth>) => ({ type: SET_AUTH, data });

interface Auth {
  accessToken: string | null;
}

type AuthAction = ReturnType<typeof setAuth>;

const initalState: Auth = {
  accessToken: null,
};

function auth(state = initalState, action: AuthAction) {
  switch (action.type) {
    case SET_AUTH: {
      return { ...state, ...action.data };
    }
    default: {
      return state;
    }
  }
}

export default auth;
