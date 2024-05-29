
import { Component, AfterViewInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements AfterViewInit {
 

  
  slides = [
    { name: 'Multi-Step Form', url: 'https://multi-step-form-main-sigma.vercel.app/', thumbnail: 'assets/images/proj7-multistep-form.png' },
    { name: 'Freelance Portfolio', url: 'https://intro-section-with-dropdown-navigation-chi-lemon.vercel.app/', thumbnail: 'assets/images/proj8-cv.png' },
    { name: 'Multi category retail marketplace', url: 'https://online-marketplace-multi-category-retail.vercel.app/home', thumbnail: 'assets/images/proj-eshop.png' },
    { name: 'Restaurant', url: 'https://restaurant-homepage-teal.vercel.app/', thumbnail: 'assets/images/proj2-resturant.png' },
    { name: 'Training Center', url: 'https://training-center-ruddy.vercel.app/home', thumbnail: 'assets/images/proj3-training-center.png' },
    { name: 'E-commerce', url: 'https://ecommerce-product-page-seven-woad.vercel.app/', thumbnail: 'assets/images/proj6-product.png' },
    { name: 'Furniture catalouge snippet', url: 'https://room-homepage-master-beryl.vercel.app/', thumbnail: 'assets/images/proj4-room.png' },
    { name: 'Comment section snippet', url: 'https://interactive-comments-section-main-eight.vercel.app/', thumbnail: 'assets/images/proj5-comments.png' },
  ];
  activeSlideIndex: number = 0; 
  
  constructor() {
   }

 
  ngAfterViewInit() {
    setTimeout(() => {
        this.initializeCarousel();
    }, 0);
  }
  
  onAnimationComplete() {
    this.initializeCarousel();
  }

  initializeCarousel() {
    let element = document.getElementById('carouselExampleCaptions');
    if (element) {
      // Manually initialize the carousel
      let carouselInstance = new bootstrap.Carousel(element, {
        interval: 5000,
        wrap: true
      });
    } else {
      console.error('Carousel element not found');
    }
  }

  nextSlide() {
    if (this.activeSlideIndex >= this.slides.length - 1) {
      this.activeSlideIndex = 0; // Go to the first slide if it's the last slide
    } else {
      this.activeSlideIndex++;
    }
  }

  prevSlide() {
    if (this.activeSlideIndex === 0) {
      this.activeSlideIndex = this.slides.length - 1; // Go to the last slide if it's the first slide
    } else {
      this.activeSlideIndex--;
    }
  }
}



  
  
  

