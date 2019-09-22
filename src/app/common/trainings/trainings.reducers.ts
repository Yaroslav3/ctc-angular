import * as trainings from './trainings.actions';

export interface State {
  trainings: {};
}

const initialState: State = {
  trainings: null
};

export function reducer(state: State = initialState, action: trainings.TrainingsActions) {
  switch (action.type) {
    case trainings.TrainingsActionTypes.ALL_TRAININGS: {
      return {
        ...state,
        trainings: action.payload
      };
    }
    default:
      return state;
  }
}

export const getAllTrainings = (state: State) => state.trainings;
