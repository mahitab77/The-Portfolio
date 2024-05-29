/*import { ViewportAnimationDirective } from './viewport-animation.directive';

describe('ViewportAnimationDirective', () => {
  it('should create an instance', () => {
    const directive = new ViewportAnimationDirective();
    expect(directive).toBeTruthy();
  });
});
*/
import { ElementRef } from '@angular/core';
import { ViewportAnimationDirective } from './viewport-animation.directive';

describe('ViewportAnimationDirective', () => {
  it('should create an instance', () => {
    const elementRefMock: ElementRef = {
      nativeElement: document.createElement('div') // Create a mock native element
    } as ElementRef;
    const directive = new ViewportAnimationDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
