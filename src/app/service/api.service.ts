// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000'; // Your FastAPI backend

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ask`, { question });
  }
}
