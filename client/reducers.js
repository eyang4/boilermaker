// action types

const DUMMY = 'DUMMY'

// action creators

const dummy = (dummy) => {
  return {
    type: DUMMY,
    action: dummy
  }
}

// reducers

export const dummyReducer = (state = {}, action) => {
  switch(action.type) {
    case DUMMY: return state
    default: return state
  }
}
