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

  cvData: any = {};
  submitted = false;
  userId = '';
  isUpdate = false;
  buttonText = 'Create CV';
  successMessage = 'Your CV has been Created';

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
      age: [''],
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
    this.setDataForUpdate();
  }

  setDataForUpdate() {
    this.isUpdate = this.activatedRoute.snapshot.queryParams['update'];

    if (this.isUpdate) {
      this.buttonText = 'Update CV';
      this.successMessage = 'Your CV has been Updated';
      this.getCVData();
    }
  }

  async getCVData() {
    try {
      const allUserCvs: Record<string, unknown>[] =
        await this.curriculumvitaeService.getCvData(this.userId);

      this.cvData = allUserCvs[allUserCvs.length - 1];
      this.setCVData(this.cvData);
    } catch {}
  }

  setCVData(data: Record<string, unknown>) {
    this.cvForm.patchValue({
      name: data['name'],
      email: data['email'],
      age: data['age'],
      interest: data['areaOfInterest'],
      recentEducation: data['mostRecentEducation'],
      gcse: data['GSCENumber'],
      fieldName: data['educationalField'],
      jobSector: data['jobSector'],
      experience: data['experience'],
      contact: data['contact'],
    });

    const formArray: FormArray = this.cvForm.get('skills') as FormArray;
    (data['skills'] as string[]).forEach((skill) => {
      formArray.push(new FormControl(skill));
    });

    this.skills = this.skills.map((skill) => {
      if ((data['skills'] as String).includes(skill.value)) {
        skill.selected = true;
      }
      return skill;
    });
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }

  async onSubmit() {
    try {
      const cvBody = {
        userId: this.userId,
        name: this.cvForm.value.name,
        email: this.cvForm.value.email,
        age: this.cvForm.value.age?.toString() || '0',
        areaOfInterest: this.cvForm.value.interest,
        skills: this.cvForm.value.skills,
        mostRecentEducation: this.cvForm.value.recentEducation,
        GSCENumber: this.cvForm.value.gcse,
        educationalField: this.cvForm.value.fieldName,
        jobSector: this.cvForm.value.jobSector,
        experience: this.cvForm.value.experience.toString(),
        contact: this.cvForm.value.contact,
        createdAt: Date.now(),
      };

      if (this.isUpdate) {
        await this.curriculumvitaeService.updateCv(this.cvData._id, cvBody);
      } else {
        await this.curriculumvitaeService.createCv(cvBody);
      }

      this.submitted = true;
    } catch (e) {
      console.log('API error', e);
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
