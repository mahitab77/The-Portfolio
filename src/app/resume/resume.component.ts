
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ResumeService } from '../ResumeService.service';
import { ResumeDetailDialogComponent } from '../resume-detail-dialog/resume-detail-dialog.component';
import { Renderer2 } from '@angular/core';
import { ResumeData } from '../resume-data.interface';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  resumeData: any = {};

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private resumeService: ResumeService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadResumeData();
    this.translate.onLangChange.subscribe(() => {
      this.applyRtlIfNeeded();
    });
    this.applyRtlIfNeeded();
  }

  loadResumeData(): void {
    this.resumeService.getResumeData().subscribe((data) => {
      this.resumeData = data['RESUME-DATA'];
      console.log('Loaded resume data:', this.resumeData);
    });
  }

  

  applyRtlIfNeeded(): void {
    const currentLang = this.translate.currentLang;
    if (currentLang === 'ar') {
      this.renderer.addClass(document.body, 'rtl');
    } else {
      this.renderer.removeClass(document.body, 'rtl');
    }
  }
 
  openDialog(section: string): void {
    const contentKey = `${section}_FULL`;
    const title = this.formatTitle(section);
    console.log(`Opening dialog with content: ${this.resumeData[contentKey]}`);
    this.dialog.open(ResumeDetailDialogComponent, {
      width: '800px',
      data: {
        title: title,
        content: this.resumeData[contentKey]
      }
    });
  }
  
  formatTitle(section: string): string {
    return section.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
}