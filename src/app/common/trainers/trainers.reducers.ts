import * as trainers from './trainers.actions';

export interface State {
  trainers: {};
}

const initialState: State = {
  trainers: null
};

export function reducer(state: State = initialState, action: trainers.TrainersActions) {
  switch (action.type) {
    case trainers.TrainersActionTypes.ALL_TRAINERS: {
      return {
        ...state,
        trainers: action.payload
      };
    }
    default:
      return state;
  }
}

export const getTrainersState = (state: State) => state.trainers;
export const getAllTrainers = (state: State) => state.trainers;
