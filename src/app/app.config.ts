import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app-routing';
import { AppInfoService, AuthService, ScreenService } from './shared/services';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    provideHttpClient(/*withFetch()*/),
    provideRouter(routes, withHashLocation())
  ]
};
