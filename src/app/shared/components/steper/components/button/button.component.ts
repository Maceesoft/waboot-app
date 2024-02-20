import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'x-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input()
  value: any;

  @Input()
  active: boolean = false;

  @Input()
  isFisrt: boolean = false;

  @Input()
  index: number = -1;

  @Input()
  cssIcon: any;

  @Input()
  iconSize: string = "32px";

  @Output("onIndexChange")
  indexChange = new EventEmitter<number>();

  onClick = ()=> {
    this.indexChange.emit(this.index);
  }
}
