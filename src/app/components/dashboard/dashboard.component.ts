import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurriculumvitaeService } from 'src/app/services/curriculumvitae.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userDetails = {
    _id: '',
    username: '',
    email: '',
    password: '',
    userType: '',
  };

  cvData: any = {};
  visibleModal: any = null;

  constructor(
    private curriculumvitaeService: CurriculumvitaeService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  async getUserData(): Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.queryParams['id'];
      this.userDetails = await this.userService.getUserData(id);
    } catch {}
  }

  onClickCreate() {
    this.router.navigate(['/cv'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickUpdate() {
    this.router.navigate(['/cv'], {
      queryParams: { id: this.userDetails._id, update: true },
    });
  }

  onClickSearch() {
    this.router.navigate(['/search'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  async onClickView(event: any) {
    await this.getCVData();
    this.toggleModal(event, 'cv-view');
  }

  async getCVData() {
    try {
      const allUserCvs: Record<string, unknown>[] =
        await this.curriculumvitaeService.getCvData(this.userDetails._id);

      this.cvData = allUserCvs[allUserCvs.length - 1];
    } catch {}
  }

  toggleModal(event: any, modalId: string) {
    event.preventDefault();
    const modal = document.getElementById(modalId);
    typeof modal != 'undefined' && modal != null && this.isModalOpen(modal)
      ? this.closeModal(modal)
      : this.openModal(modal);
  }

  isModalOpen(modal: any) {
    return modal.hasAttribute('open') && modal.getAttribute('open') != 'false'
      ? true
      : false;
  }

  openModal(modal: any) {
    if (this.isScrollbarVisible()) {
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${this.getScrollbarWidth()}px`
      );
    }
    modal.setAttribute('open', true);
  }

  closeModal(modal: any) {
    this.visibleModal = null;
    modal.removeAttribute('open');
  }

  getScrollbarWidth() {
    const outer: any = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  isScrollbarVisible() {
    return document.body.scrollHeight > screen.height;
  }

  async onClickDelete(event: any) {
    await this.getCVData();
    await this.curriculumvitaeService.deleteCv(this.cvData._id);
    this.cvData = {};
    this.toggleModal(event, 'cv-delete');
  }
}
