import {Action} from '@ngrx/store';

export const TrainersActionTypes = {
  ALL_TRAINERS: '[TRAINERS] ALL TRAINERS'
};

export class AllTrainers implements Action {
  readonly type = TrainersActionTypes.ALL_TRAINERS;

  constructor(public payload: any) {}
}

export type TrainersActions = AllTrainers;
