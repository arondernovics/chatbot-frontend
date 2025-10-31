import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BrainRequest {
  prompt: string;
  knowledgeBaseId: string;
}

@Injectable({ providedIn: 'root' })
export class BrainService {
  private apiUrl = 'http://localhost:5000/ask'; // your FastAPI endpoint

  constructor(private http: HttpClient) {}

  askQuestion(prompt: string): Observable<any> {
    const payload: BrainRequest = {
      prompt,
      knowledgeBaseId: 'QP0CmJmy3ych',
    };

    return this.http.post<any>(this.apiUrl, payload);
  }
}
