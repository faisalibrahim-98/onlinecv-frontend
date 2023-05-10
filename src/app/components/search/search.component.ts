import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    areaOfInterest: new FormControl(''),
    mostRecentEducation: new FormControl(''),
    GCSENumber: new FormControl(''),
    skills: new FormControl(''),
    experience: new FormControl(''),
    educationalField: new FormControl(''),
    jobSector: new FormControl(''),
  });

  cvsData = [];

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      userId: [''],
      areaOfInterest: [''],
      mostRecentEducation: [''],
      GCSENumber: [''],
      skills: [''],
      experience: [''],
      educationalField: [''],
      jobSector: [''],
    });
  }

  async onSubmit() {
    try {
      const query = Object.keys(this.searchForm.value).reduce(
        (acc: any, curr: any) => {
          if (this.isEmptyObject(this.searchForm.value, curr)) return acc;
          acc[curr] = this.searchForm.value[curr];
          return acc;
        },
        {}
      );

      this.cvsData = await this.searchService.getCvByField(query);
    } catch {}
  }

  isEmptyObject(obj: any, key: any) {
    return (
      obj[key] === null ||
      (Array.isArray(obj[key]) && obj[key].length === 0) ||
      obj[key] === ''
    );
  }
}
