import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrainService} from './service/brain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FormsModule, NgForOf, NgOptimizedImage, HttpClientModule, NgClass],
  styleUrls: ['./app.css'],
  standalone: true,
  providers: [BrainService]
})
export class App implements OnInit {
  userQuery: string = '';
  messages: { type: 'user' | 'bot'; text: string }[] = [];

  constructor(private brainService: BrainService) {
  }

  ngOnInit() {
    // Send greeting immediately
    this.messages.push({
      text: 'Hello! I am a chatbot. How can I help you today?',
      type: 'bot'
    });
  }

  public askQuestion() {
    const question = this.userQuery.trim();
    if (!question) return;

    // Add user's message to chat
    this.messages.push({text: question, type: 'user'});

    this.brainService.askQuestion(question).subscribe({
      next: (res) => {
        let botAnswer = 'No answer found';

        try {
          botAnswer = res || botAnswer;
        } catch (e) {
          console.error('Failed to parse backend answer', e);
        }

        this.messages.push({text: botAnswer, type: 'bot'});

        this.userQuery = '';
      },
      error: (err) => {
        console.error(err);
        const errorMsg = 'Error connecting to backend.';
        this.messages.push({text: errorMsg, type: 'bot'});
      }
    });
  }

}
