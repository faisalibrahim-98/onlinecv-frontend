import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickLogin(): void {
    this.router.navigate(['/login']);
  }

  onClickSignup(): void {
    this.router.navigate(['/signup']);
  }

  onClickHome(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
