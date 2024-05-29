
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private jsonUrl = 'assets/i18n/en.json';

  constructor(private http: HttpClient) {}

  getResumeData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}