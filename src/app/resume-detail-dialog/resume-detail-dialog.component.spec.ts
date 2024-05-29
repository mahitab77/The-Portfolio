import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDetailDialogComponent } from './resume-detail-dialog.component';

describe('ResumeDetailDialogComponent', () => {
  let component: ResumeDetailDialogComponent;
  let fixture: ComponentFixture<ResumeDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
