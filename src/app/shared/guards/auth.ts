import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services";
import { StoreX } from "../../libs/store";
import { AuthData } from "../../models/auth-data";

const defaultPath = '/';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const authData = StoreX.session.getObj<AuthData>('auth');

    const isLoggedIn = authService.loggedIn;
    let isRouterSecure= false;

    if (!!authData && !!authData.user.padre) {
        isRouterSecure = [
            'usuarios'
        ].includes(route.routeConfig?.path || defaultPath);

        if (isRouterSecure) {
            router.navigate(['/home']);
        }
    }

    const isAuthForm = [
        'login-form'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
        authService.lastAuthenticatedPath = defaultPath;
        router.navigate([defaultPath]);
        return false;
    }

    if (!isLoggedIn && !isAuthForm) {
        router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
        authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm || isRouterSecure;
}