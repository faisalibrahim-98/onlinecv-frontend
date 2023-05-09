import { CurriculumvitaeService } from 'src/app/services/curriculumvitae.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css'],
})
export class CurriculumVitaeComponent {
  cvForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    age: new FormControl(''),
    interest: new FormControl(''),
    skills: new FormArray([]),
    recentEducation: new FormControl(''),
    gcse: new FormControl(''),
    fieldName: new FormControl(''),
    jobSector: new FormControl(''),
    experience: new FormControl(''),
    contact: new FormControl(''),
  });

  skills = [
    { name: 'Developent', value: 'development', selected: false },
    { name: 'Testing', value: 'testing', selected: false },
    { name: 'Deployment', value: 'deployment', selected: false },
    { name: 'Management', value: 'management', selected: false },
    { name: 'Data Analysis', value: 'dataAnalysis', selected: false },
    { name: 'Marketing', value: 'marketing', selected: false },
  ];

  submitted = false;
  userId = '';

  constructor(
    private curriculumvitaeService: CurriculumvitaeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cvForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      interest: ['', Validators.required],
      skills: new FormArray([]),
      recentEducation: ['', Validators.required],
      gcse: ['', Validators.required],
      fieldName: ['', Validators.required],
      jobSector: ['', Validators.required],
      experience: ['', Validators.required],
      contact: ['', Validators.required],
    });

    this.userId = this.activatedRoute.snapshot.queryParams['id'];
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }

  async onSubmit() {
    if (this.cvForm.invalid) {
      return;
    }

    try {
      const cvBody = {
        name: this.cvForm.value.name,
        email: this.cvForm.value.email,
        password: this.cvForm.value.password,
        age: this.cvForm.value.age,
        interest: this.cvForm.value.interest,
        skills: this.cvForm.value.skills,
        recentEducation: this.cvForm.value.recentEducation,
        gcse: this.cvForm.value.gcse,
        fieldName: this.cvForm.value.fieldName,
        jobSector: this.cvForm.value.jobSector,
        experience: this.cvForm.value.experience,
        contact: this.cvForm.value.contact,
      };

      await this.curriculumvitaeService.createCv(cvBody);

      this.submitted = true;
    } catch {
      console.log('API error');
    }
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.cvForm.get('skills') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
