import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { Router, RouterModule } from '@angular/router';
import { UnauthenticatedContentComponent } from './unauthenticated-content';
import { CommonModule } from '@angular/common';
import config from 'devextreme/core/config';
import esMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";
import { SideNavOuterToolbarComponent } from './layouts';
import { ODStore } from './libs/odata-store';
import { StoreX } from './libs/store';
import { AuthData } from './models/auth-data';
import { Setting } from './helpers/setting';
import dxTextBox from 'devextreme/ui/text_box';

@Component({
  standalone: true,
  imports: [SideNavOuterToolbarComponent, RouterModule, UnauthenticatedContentComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService,
    public router: Router) {

    ODStore.baseUrl = `${Setting.getDomain()}/odata`;
    ODStore.token = () => StoreX.session.getObj<AuthData>('auth')?.accessToken ?? '';

    loadMessages(esMessages);
    locale(navigator.language);

    config({
      licenseKey: 'm4ASfplEMLZYMMTCJFMlX1jwMcdbaUNh1TU23szT6vKu0gKfVS52wzC8OTuj8TKXCsCmwiSsNx+gG9fI8GTQN4xzh73d1FZCTProLQbwLQm4rxO6t+kAA0UPaZliI8k3iuuqeA==AAAAAAAAAAAAAAAAAAAAAAAAAAAyMzIsOTIyMzM3MjAzNjg1NDc3NTgwNyw5MjIzMzcyMDM2ODU0Nzc1ODA3LE1hY2Vlc29mdCwxODY3NTIxMjY3LDMsMjExOQ=='
    });
    
    dxTextBox.defaultOptions({
      options: {
        inputAttr: { 'style': 'text-transform: uppercase' }
      }
    });
  }

  isAuthenticated() {
    return this.authService.loggedIn == true;
  }
}
