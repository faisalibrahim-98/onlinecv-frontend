import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segment = event.url.split('?')[0];
        if (
          segment === '/dashboard' ||
          segment === '/cv' ||
          segment === '/search'
        ) {
          this.isLoggedIn = true;
        }
      });
  }

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

  onClickLogout() {
    this.userService.logout({});

    this.router.navigate(['/']);
  }
}
