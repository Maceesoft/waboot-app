import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, input, } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';

export interface StepData {
  value: number;
}

export interface StepButton extends StepData {
  cssIcon: string;
}

@Component({
  selector: 'x-steper',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './steper.component.html',
  styleUrl: './steper.component.scss'
})
export class SteperComponent {

  @ViewChild('dvHost')
  dvHost?: ElementRef;

  @Input()
  items: Array<StepButton> | undefined;

  @Input()
  selectIndex: number = -1;

  @Input({ required: true })
  callback!: (index: number) => boolean;

  @Output()
  selectIndexChange = new EventEmitter<number>();

  onIndexChange = (index: number) => {

    if(index < 0 || index >= (this.items?.length ?? 0)) return;

    if (this.callback(index)) {
      this.selectIndex = index;
      this.selectIndexChange.emit(this.selectIndex);
    }
  }
}
