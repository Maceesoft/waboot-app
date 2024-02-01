import { Routes } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { HomeComponent } from './pages/home/home.component';
import { PoliticaComponent } from './pages/politica/politica.component';
import { AuthGuard } from './shared/guards/auth';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'politica',
    component: PoliticaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contactos',
    component: ContactosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte',
    component: ReporteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'calendario',
    component: CalendarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];