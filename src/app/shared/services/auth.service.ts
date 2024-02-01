import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Setting } from '../../helpers/setting';
import { AuthData } from '../../models/auth-data';
import { StoreX } from '../../libs/store';
import { Usuario } from '../../models/usuario';

export interface IUser {
  email: string;
  avatarUrl?: string;
}

const defaultPath = '/';
const defaultUser = {
  email: 'macee@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  get loggedIn(): boolean {
    return StoreX.session.getObj('auth') != null;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(userName: string, password: string, remember: boolean) {

    try {

      const url = `${Setting.getDomain()}/usuarios/auth`

      const body = {
        user: userName,
        pwd: password
      };

      const authData = await firstValueFrom(this.http.post<AuthData>(url, body));

      const meUrl = `${Setting.getDomain()}/usuarios/me`
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.accessToken}`
      })

      const me = await firstValueFrom(this.http.get<Usuario>(meUrl, { headers: headers }));
      authData.user = me;

      StoreX.session.setObj('auth', authData);

      if (remember) {
        StoreX.local.set('user', userName);
      } else {
        StoreX.local.set('user', null);
      }

      this.router.navigate([this._lastAuthenticatedPath]);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async logOut() {
    StoreX.session.setObj('auth', null);
    this.router.navigate(['/login-form']);
  }
}
