import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userDetails = null;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickCreate() {
    this.router.navigate(['/cv']);
  }

  onClickSearch() {
    this.router.navigate(['/search']);
  }
}
