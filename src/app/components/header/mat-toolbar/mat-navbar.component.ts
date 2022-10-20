import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent implements OnInit, DoCheck {

  isDarkMode!: boolean;
  showFiller = false;
  showProdTab: boolean = false;
  isAuthenticated!: boolean;
  getRole: string | undefined;
  error = undefined;

  constructor(private themeService: ThemeService, private authService: AuthService) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    // rileva cambiamento dopo il login
    if (localStorage.key(0)) {
      this.getRole = this.authService.getRole()?.toString(); // [0] non e' consentito      
      this.isAuthenticated = true;
    } else {
      this.getRole = undefined;
      this.isAuthenticated = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  // ----------------------

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

  toggleProdTab() {
    if (this.showProdTab == true) {
      this.showProdTab = false;
    } else this.showProdTab = true;
  }

  hideProdTab() {
    this.showProdTab = false;
  }

}
