import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'step-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-button.component.html',
  styleUrl: './step-button.component.scss'
})
export class StepButtonComponent {
  @Input()
  enable = true;

  @Input()
  index = -1;

  @Input({ required: true })
  cssIcon!: string;

  @Input()
  isFirst = false;

  @Input()
  active = false;

  @Output('onClick')
  clickButton = new EventEmitter<number>();

  protected onClick = () => {
    if (this.enable)
      this.clickButton.emit(this.index);
  }
}
