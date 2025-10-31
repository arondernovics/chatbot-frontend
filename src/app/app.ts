// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrainService } from './service/brain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FormsModule, NgIf, NgForOf, NgOptimizedImage, HttpClientModule],
  styleUrls: ['./app.css'],
  standalone: true,
  providers: [BrainService]
})
export class App {
  userQuery: string = '';
  response: string | null = null;

  sources = [
    { id: 1, title: 'Document A', content: 'Detailed context from Document A...' },
    { id: 2, title: 'Report B', content: 'Additional info from Report B...' }
  ];

  constructor(private brainService: BrainService) {}

  askQuestion() {
    const question = this.userQuery.trim();
    if (!question) return;

    this.brainService.askQuestion(question).subscribe({
      next: (res) => {
        this.response = res.answer || JSON.stringify(res, null, 2);
        this.userQuery = '';
      },
      error: (err) => {
        console.error(err);
        this.response = 'Error connecting to backend.';
      }
    });
  }
}
