import { Component, NgModule, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { StoreX } from '../../../libs/store';
import { AuthData } from '../../../models/auth-data';
@Component({
  standalone: true,
  imports: [CommonModule,
    DxButtonModule,
    UserPanelComponent,
    DxToolbarModule],
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  timeString = signal('');

  constructor() {
    const prevTime = this.getTime();
    if (prevTime == 0)
      this.setTime(new Date().getTime());
/*
    setInterval(() => {
      const prevTime = this.getTime();
      const newTime = new Date().getTime();
      const time = (newTime - prevTime);

      const hour = Math.floor(time / 3600000);
      const minutes = Math.floor((time % 3600000) / 60000);
      const seconds = Math.floor(((time % 3600000) % 60000) / 1000);

      this.timeString.set(`${Math.floor(hour).toString().padStart(2, '0')}:${Math.floor(minutes).toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}`);
    }, 500); */
  }

  @Output()
  menuToggle = new EventEmitter<boolean>();


  getTime = () => {
    return Number(sessionStorage.getItem('time') ?? 0);
  }

  setTime = (num: number) => {
    return sessionStorage.setItem('time', num.toString());
  }

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}
