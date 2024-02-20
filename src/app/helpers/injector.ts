import { EnvironmentInjector, inject, runInInjectionContext } from "@angular/core"

export const injector = (callback : Function) => {
    const injector = inject(EnvironmentInjector);
    runInInjectionContext(injector, () => callback);
}