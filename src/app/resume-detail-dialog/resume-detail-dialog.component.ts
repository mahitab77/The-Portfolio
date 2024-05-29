
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resume-detail-dialog',
  templateUrl: './resume-detail-dialog.component.html',
  styleUrls: ['./resume-detail-dialog.component.css']
})
export class ResumeDetailDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.applyRtlIfNeeded();
    this.translate.onLangChange.subscribe(() => {
      this.applyRtlIfNeeded();
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

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}