import { CurriculumvitaeService } from 'src/app/services/curriculumvitae.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let curriculumvitaeService: CurriculumvitaeService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    curriculumvitaeService = TestBed.inject(CurriculumvitaeService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserData when ngOnInit is called', () => {
    spyOn(component, 'getUserData').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should call getUserData when getUserData is called', () => {
    spyOn(userService, 'getUserData').and.returnValue(new Promise(() => {}));

    component.getUserData();
    fixture.detectChanges();

    expect(userService.getUserData).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickCreate() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickCreate();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickUpdate() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickUpdate();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickSearch() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickSearch();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call relevant functions when onClickView() is called', fakeAsync(() => {
    spyOn(component, 'getCVData').and.callFake(() => new Promise(() => {}));

    component.onClickView(new Event('click'));
    tick();
    fixture.detectChanges();

    expect(component.getCVData).toHaveBeenCalled();
  }));

  it('should call relevant functions when onClickDelete() is called', fakeAsync(() => {
    component.cvData._id = '6459b2d4278695875a0b4ffe';
    spyOn(component, 'getCVData').and.callFake(() => new Promise(() => {}));

    component.onClickDelete(new Event('click'));
    tick();
    fixture.detectChanges();

    expect(component.getCVData).toHaveBeenCalled();
  }));

  it('should set visibleModal to null when closeModal() is called', () => {
    component.visibleModal = true;

    component.closeModal({
      removeAttribute: (str: any) => {},
    });
    fixture.detectChanges();

    expect(component.visibleModal).toBeNull();
  });
});
