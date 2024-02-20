import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StepButtonComponent } from './component/step-button/step-button.component';

export interface StepItem {
  cssIcon: string;
}

@Component({
  selector: 'step-progress',
  standalone: true,
  imports: [CommonModule, StepButtonComponent],
  templateUrl: './step-progress.component.html',
  styleUrl: './step-progress.component.scss'
})
export class StepProgressComponent {
  @Input({ required: true })
  items!: Array<StepItem>;

  @Input()
  selectIndex: number = 0;

  @Input('indexChanging')
  validateFn?: (nextIndex: number) => boolean;

  @Output('onSelectIndex')
  selectIndexChange = new EventEmitter<number>();

  onItemClick = (index: number) => {
    if (!!this.validateFn) {
      const result = this.validateFn(index);
      if (!result) return;
    }

    this.selectIndex = index;
    this.selectIndexChange.emit(index);
  }

  prev = () => {
    if (this.selectIndex == 0) return;
    const nextIndex = this.selectIndex - 1;
    this.selectIndex = nextIndex;
    this.selectIndexChange.emit(nextIndex);
  }

  next = () => {
    if (this.selectIndex >= this.items.length) return;

    const nextIndex = this.selectIndex + 1;

    if (!!this.validateFn) {
      const result = this.validateFn(nextIndex);
      if (!result) return;
    }

    this.selectIndex = nextIndex;
    this.selectIndexChange.emit(nextIndex);
  }
}
