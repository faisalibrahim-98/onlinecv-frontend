import { TestBed } from '@angular/core/testing';

import { CurriculumvitaeService } from './curriculumvitae.service';

describe('CurriculumvitaeService', () => {
  let service: CurriculumvitaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumvitaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
