import { Routes } from "@angular/router";
import { SendFilesComponent } from "../pages/send-files/send-files.component";
import { authGuard } from "../shared/guards/auth";


export const whatsAppRouter: Routes = [
    {
        path: 'send-files',
        component: SendFilesComponent,
        canActivate: [ authGuard ]
    }
];