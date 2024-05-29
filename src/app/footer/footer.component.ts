import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentLanguage: string = 'en';
  
 

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private http: HttpClient,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    translate.addLangs(['en', 'ar']);
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLanguage;
    translate.setDefaultLang(this.currentLanguage);
    this.updateDirection();
  }

  ngOnInit(): void {
   // this.activatedRoute.fragment.subscribe(fragment => {
   //   this.scrollTo(fragment);
   // });
    // Jump to section
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = event.urlAfterRedirects.split('#')[1];
        if (fragment) {
          this.scrollToSection(fragment); 
        }
      }
    });
    this.translate.onLangChange.subscribe(() => {
      this.updateDirection();
    });
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
    this.updateDirection();
  }

  updateDirection(): void {
    if (this.currentLanguage === 'ar') {
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
      this.renderer.addClass(document.body, 'rtl');
    } else {
      this.renderer.removeAttribute(document.body, 'dir');
      this.renderer.removeClass(document.body, 'rtl');
    }
  }

  onSubmit(contactForm: any): void {
    if (contactForm.valid) {
      const formData = contactForm.value;
      this.http.post('/api/send-email', formData).subscribe(
        (response: any) => {
          console.log('Email sent successfully', response);
          // Add your success message or handling here
        },
        (error: any) => {
          console.error('Error sending email', error);
          // Add your error message or handling here
        }
      );
    }
  }

  scrollToSection(sectionId: string): void {
    if (sectionId) {
      this.viewportScroller.scrollToAnchor(sectionId);
    }
  }
}