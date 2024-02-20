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
    const cRole = !!!route.routeConfig?.data ? '' : route.routeConfig?.data!['role'];

    console.log(cRole);
    console.log(route.routeConfig?.data);

    const isLoggedIn = authService.loggedIn;
    let isRouterSecure = false;

    if (!!authData && cRole != '' && authData.user.role != 'admin') {

        if (cRole == 'admin') {
            isRouterSecure = true;
            router.navigate(['/home']);
        } else {
            if (!!authData.user.padre) {
                isRouterSecure = true;
                router.navigate(['/home']);
            } else {
                isRouterSecure = false;
            }
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