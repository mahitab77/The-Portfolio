
import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentLanguage: string = 'en';
  isDarkTheme: boolean = true; // Set initial theme to dark

  @ViewChild('navbarTogglerBtn', { static: true }) navbarTogglerBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('navbarCollapse', { static: true }) navbarCollapse!: ElementRef<HTMLDivElement>;


  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    translate.addLangs(['en', 'ar']);
    const savedLanguage = localStorage.getItem('language') || 'en';
    translate.setDefaultLang(savedLanguage);
    this.currentLanguage = savedLanguage;
    if (this.currentLanguage === 'ar') {
      this.renderer.addClass(document.body, 'rtl');
    } else {
      this.renderer.removeClass(document.body, 'rtl');
    }
  }

  ngOnInit(): void {
    //show mobile menu
    this.navbarTogglerBtn.nativeElement.addEventListener('click', this.toggleMenu.bind(this));

    // Set initial theme to light
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    
    // Jump to section
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = event.urlAfterRedirects.split('#')[1];
        if (fragment) {
          this.scrollToSection(fragment); 
        }
      }
    });
    // Load the light/dark theme from storage if available
    this.loadTheme();
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
    if (this.currentLanguage === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
      this.renderer.addClass(document.body, 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
      this.renderer.removeClass(document.body, 'rtl');
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
    }
    this.saveTheme();
  }

  loadTheme(): void {
    const theme = localStorage.getItem('theme') || 'dark'; // Set initial theme to dark if not in localStorage
    if (theme === 'dark') {
      this.isDarkTheme = true;
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.isDarkTheme = false;
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
    }
  }

  saveTheme(): void {
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  scrollToSection(sectionId: string): void {
    if (sectionId) {
      this.viewportScroller.scrollToAnchor(sectionId);
    }
  }
  toggleMenu() {
    this.navbarCollapse.nativeElement.classList.toggle('show');
  }


}