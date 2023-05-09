import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
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

  onClickView() {}

  onClickDelete() {}
}
