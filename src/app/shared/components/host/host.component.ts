import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'host-component',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div #main class="main-view">
    <ng-content />
  </div>
  `,
  styles: [`
    :host{
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: white;
    }
    .main-view {
      position: absolute;
      left: 5px;
      right: 5px;
      top: 5px;
      bottom: 10px;
      padding: 0 5px 10px 5px;
      display: flex;
    }
    .content {
      flex: 1
    }
  `]
})
export class HostComponent {
  @ViewChild('main')
  protected main?: ElementRef;

  get element(): HTMLElement {
    return this.main?.nativeElement;
  }
}
