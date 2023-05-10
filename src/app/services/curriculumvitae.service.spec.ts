import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurriculumvitaeService } from './curriculumvitae.service';
import { TestBed } from '@angular/core/testing';

describe('CurriculumvitaeService', () => {
  let service: CurriculumvitaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CurriculumvitaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
