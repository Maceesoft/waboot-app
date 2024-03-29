import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { StoreX } from '../../../libs/store';


@Component({
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule],
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  reMember = StoreX.local.get('user');
  formData: any = { rememberMe: !!this.reMember, email: this.reMember };

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password, rememberMe } = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(email, password, rememberMe);
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }
  }
}
