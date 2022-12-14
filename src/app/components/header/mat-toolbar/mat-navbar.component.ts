import { Component, DoCheck, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent implements OnInit, DoCheck {

  error = undefined;
  showProdTab: boolean = false;

  isAuthenticated!: boolean;
  getRole: string | undefined;
  badgeCount: number | undefined;
  isSubscribed!: boolean | undefined;

  isDarkMode: boolean = this.themeService.themeStatus();
  themeColor!: string;

  showFiller = false;
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    // rileva cambiamento dopo il login
    if (localStorage.getItem("isAuthenticated")) {
      this.getRole = this.authService.getRole()?.toString(); // [0] non e' consentito
      this.badgeCount = this.authService.getBadgeCount();
      this.isAuthenticated = true;
    } else {
      this.getRole = undefined;
      this.isAuthenticated = false;
    }

  }

  logout(): void {
    this.authService.openSnackBar("Successfully logged out", 'primary-snackbar', 3);
    this.authService.logout();
    this.isAuthenticated = false;
    localStorage.removeItem("badgeCount");
    localStorage.removeItem("isSubscribed");
    localStorage.removeItem("accountBalance");
  }

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

  /*   setColor(): string {
      if (this.isDarkMode) {
        this.themeColor = "accent";
      } else this.themeColor = "primary";
      return this.themeColor;
    } */

}
