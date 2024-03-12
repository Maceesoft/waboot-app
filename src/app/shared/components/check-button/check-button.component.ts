import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'check-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-button.component.html',
  styleUrl: './check-button.component.scss'
})
export class CheckButtonComponent {
  @Input()
  cssIcon?: string;
  @Input()
  text?: string;
  @Input()
  check: boolean = false;
  @Output('onCheckChanged')
  checkChange = new EventEmitter<boolean>();

  changeCheck = (e: Event) => {
    const input: HTMLInputElement = <HTMLInputElement>e.target!;
    this.checkChange.emit(input.checked);
  }
}
