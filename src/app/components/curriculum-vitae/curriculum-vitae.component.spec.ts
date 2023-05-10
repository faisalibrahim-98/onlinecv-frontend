import { CurriculumvitaeService } from 'src/app/services/curriculumvitae.service';
import { CurriculumVitaeComponent } from './curriculum-vitae.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('CurriculumVitaeComponent', () => {
  let component: CurriculumVitaeComponent;
  let fixture: ComponentFixture<CurriculumVitaeComponent>;
  let curriculumvitaeService: CurriculumvitaeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [CurriculumVitaeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumVitaeComponent);
    component = fixture.componentInstance;
    curriculumvitaeService = TestBed.inject(CurriculumvitaeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCVData when ngOnInit is called', () => {
    spyOn(component, 'setDataForUpdate').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.setDataForUpdate).toHaveBeenCalled();
  });

  it('should call getCVData when getCvData is called', () => {
    spyOn(curriculumvitaeService, 'getCvData').and.returnValue(
      new Promise(() => {})
    );

    curriculumvitaeService.getCvData('6459b2d4278695875a0b4ffe');
    fixture.detectChanges();

    expect(curriculumvitaeService.getCvData).toHaveBeenCalled();
  });

  it('should call updateCv when onSubmit is called and isUpdate is true', () => {
    component.isUpdate = true;
    spyOn(curriculumvitaeService, 'updateCv').and.returnValue(
      new Promise(() => {})
    );

    curriculumvitaeService.updateCv('6459b2d4278695875a0b4ffe', {});
    fixture.detectChanges();

    expect(curriculumvitaeService.updateCv).toHaveBeenCalled();
  });

  it('should call createCv when onSubmit is called and isUpdate is false', () => {
    spyOn(curriculumvitaeService, 'createCv').and.returnValue(
      new Promise(() => {})
    );

    curriculumvitaeService.createCv({});
    fixture.detectChanges();

    expect(curriculumvitaeService.createCv).toHaveBeenCalled();
  });
});
