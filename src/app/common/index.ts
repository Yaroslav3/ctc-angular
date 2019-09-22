import {createSelector} from '@ngrx/store';
import * as formTrainings from './trainings/trainings.reducers';


export interface AppState {
  trainings: formTrainings.State;
}

export const reducers: any = {
  trainings: formTrainings.reducer
}

// Trainings
export const getTrainingsState          = (state: AppState) => state.trainings;
export const getAllTrainings            = createSelector(getTrainingsState, formTrainings.getAllTrainings);
