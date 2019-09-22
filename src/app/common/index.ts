import {createSelector} from '@ngrx/store';
import * as formTrainings from './trainings/trainings.reducers';
import * as formTrainers from './trainers/trainers.reducers';


export interface AppState {
  trainings: formTrainings.State;
  trainers: formTrainers.State;
}

export const reducers: any = {
  trainings: formTrainings.reducer,
  trainers: formTrainers.reducer
};

// Trainings
export const getTrainingsState          = (state: AppState) => state.trainings;
export const getAllTrainings            = createSelector(getTrainingsState, formTrainings.getAllTrainings);


// Trainers
export const getTrainersState           = (state: AppState) => state.trainers;
export const getAllTrainers             = createSelector(getTrainersState, formTrainers.getAllTrainers);
