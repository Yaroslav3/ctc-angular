import {Component, OnInit} from '@angular/core';
import {Trainings} from '../../../../shared/model/trainings/Trainings.model';
import {TrainingsService} from '../../../../shared/service/trainings/trainings.service';
import {NgProgress} from '@ngx-progressbar/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-trainings-add',
  templateUrl: './trainings-add.component.html',
  styleUrls: ['./trainings-add.component.scss', './trainings-add.adaptive.component.scss']
})
export class TrainingsAddComponent implements OnInit {


  private orderError: Trainings;
  private isCreated = false;


  /**
   *  for validation.
   * ***/
  formGroup: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  done = true;
  doneSave = false;

  trainings: Trainings = new Trainings();
  id: number;


  constructor(private serviceTrainings: TrainingsService,
              private progress: NgProgress,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.createFormGroup();
    window.scroll(0, 0);

  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      briefly: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.formGroup.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.formGroup.reset();
  }


  noClickAddTraining() {

    this.isSubmitted = true;

    if (this.formGroup.invalid) {
      console.log('error');
      return;
    }

    console.log('test');

    const trainings = new Trainings();
    trainings.name = this.f.name.value;
    trainings.briefly = this.f.briefly.value;

    this.progress.ref().start();
    this.serviceTrainings.adminCreateTrainings(trainings).subscribe((data: Trainings) => {
        this.id = data.id;

        this.doneSave = true;
        this.done = false;
        this.progress.ref().complete();
      },
      error => {
        window.alert(error.message);
        this.orderError = error.error;
        this.isCreated = false;
      });
  }


  /**
   *  redirect create Article
   * **/
  next() {
    console.log('dsdv');
    this.router.navigate(['admin', 'trainings', 'create', 'article-trainings', this.id]);

  }
}
