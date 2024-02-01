import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { DxFormModule } from 'devextreme-angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'send-file',
  standalone: true,
  imports: [DxFormModule, CommonModule],
  templateUrl: './send-file.component.html',
  styleUrl: './send-file.component.scss'
})
export class SendFileComponent {
  data = {
    pdf: '',
    name: '',
    phone: ''
  }

  id?: number;
  index: number = 0;
  clickHandler = new EventEmitter<any>();
  _isValid = true;

  constructor(public cdf: ChangeDetectorRef) {
  }

  changeInput = (e: Event) => {
    const input: HTMLInputElement = <HTMLInputElement>e.target;
    (<any>this.data)[input.name] = input.value;

    if (!this._isValid) {
      this.isValid();
    }
  }

  isValid = () => {
    this._isValid = !!this.data.pdf && !!this.data.name && !!this.data.phone;
    return this._isValid;
  }

  clickClose = () => {
    this.clickHandler.emit(this.id);
  }

}
