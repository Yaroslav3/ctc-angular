import {Action} from '@ngrx/store';
import {Models} from '../../core/interfaces';

export const TrainingsActionTypes = {
  ALL_TRAININGS: '[TRAININGS] ALL TRAININGS'
};

export class AllTrainings implements Action {
  readonly type = TrainingsActionTypes.ALL_TRAININGS;

  constructor(public payload: any) {}
}

export type TrainingsActions = AllTrainings;
