import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    }
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode);
  }

  private setDarkMode(isDark: boolean): void {
    this.isDarkMode = isDark;
    const body = document.body;
    
    if (isDark) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}