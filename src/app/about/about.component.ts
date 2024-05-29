import { Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  currentLine: number = 0;
  currentLanguage: string = 'en';
  lines: string[] = [];
  highlightInterval: any;

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    translate.addLangs(['en', 'ar']);
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.currentLanguage = savedLanguage;
    translate.setDefaultLang(this.currentLanguage);
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.loadContent();
      this.updateDirection();
    });
    this.loadContent();
    this.updateDirection();
    this.setupObserver();
  }

  ngOnDestroy() {
    if (this.highlightInterval) {
      clearInterval(this.highlightInterval);
    }
  }

  setupObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.highlightLines();
        } else {
          this.clearHighlightInterval();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const target = this.el.nativeElement.querySelector('.highlight-paragraph');
    if (target) {
      observer.observe(target);
    }
  }

  highlightLines() {
    this.clearHighlightInterval(); // Clear any existing interval
    this.highlightInterval = setInterval(() => {
      if (this.currentLine >= this.lines.length - 1) {
        this.currentLine = 0;  // Reset to start or stop after the last line
      } else {
        this.currentLine++;
      }
    }, 5000);  // 5 seconds delay
  }

  clearHighlightInterval() {
    if (this.highlightInterval) {
      clearInterval(this.highlightInterval);
    }
  }

  loadContent(): void {
    this.translate.get('ABOUT_ME_CONTENT').subscribe((res: string[]) => {
      this.lines = res;
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
}
