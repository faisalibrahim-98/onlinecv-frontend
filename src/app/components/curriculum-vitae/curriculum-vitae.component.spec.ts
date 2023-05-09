import { CurriculumVitaeComponent } from './curriculum-vitae.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('CurriculumVitaeComponent', () => {
  let component: CurriculumVitaeComponent;
  let fixture: ComponentFixture<CurriculumVitaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CurriculumVitaeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumVitaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
