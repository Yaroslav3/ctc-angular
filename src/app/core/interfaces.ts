import {PhotoTrainings} from '../shared/model/PhotoTrainings.model';

export namespace Models {
  export interface AllTrainings {
    trainings: Trainings[];
  }

  export interface Trainings {
    id: number;
    name: string;
    briefly: string;
    photoTrainings: PhotoTrainings[];
  }
}
