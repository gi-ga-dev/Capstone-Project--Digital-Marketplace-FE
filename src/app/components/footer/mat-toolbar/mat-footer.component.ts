import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-mat-footer',
  templateUrl: './mat-footer.component.html',
  styleUrls: ['./mat-footer.component.scss']
})
export class MatFooterComponent implements OnInit {

  isDarkMode: boolean = this.themeService.themeStatus();
  themeColor!: string;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void { }

  setColor(): string {
    this.toggleDarkMode();
    if (this.isDarkMode) {
      this.themeColor = "accent";
    } else this.themeColor = "primary";
    return this.themeColor;
  }

  // metodo necessario per aggiornare tema del footer
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

}
