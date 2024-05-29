import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Directive({
  selector: '[appViewportAnimation]'
})
export class ViewportAnimationDirective {
  @Input() appViewportAnimation!: string;
  @Input() highlightElementId: string | undefined;
  @Input() carouselId: string | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    const element = document.getElementById(this.appViewportAnimation);
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element,
          offsetY: navbarHeight + (window.innerHeight - navbarHeight - element.clientHeight) / 2
        },
        ease: 'power3.out',
        onComplete: () => {
          if (this.highlightElementId) {
            this.highlightElement(this.highlightElementId);
          }
          if (this.carouselId) {
            this.startCarousel(this.carouselId);
          }
        }
      });
    }
  }

  highlightElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      gsap.fromTo(element, { opacity: 0 }, { duration: 1, opacity: 1, ease: 'power3.out' });
    }
  }

  startCarousel(carouselId: string): void {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      // Add logic to start carousel
      // Example: Trigger a start function of the carousel if using a specific carousel library
      console.log('Starting carousel:', carouselId);
      // Assuming you are using a carousel library, initialize or start the carousel here
    }
  }
}