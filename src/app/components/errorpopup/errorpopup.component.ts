import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-errorpopup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errorpopup.component.html',
  styleUrl: './errorpopup.component.scss',
})
export class ErrorpopupComponent {
  @Input() errorMessage: string = '';
  visible: boolean = false;

  showError(message: string) {
    this.errorMessage = message;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
