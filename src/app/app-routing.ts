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
import { TestComponent } from './pages/test/test.component';
import { CampanaComponent } from './pages/campana/campana.component';
import { FuentesDatosComponent } from './pages/fuentes-datos/fuentes-datos.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { UsuarioTemplatesComponent } from './pages/usuario-templates/usuario-templates.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'politica',
    component: PoliticaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'campanas',
    component: CampanaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'Client'
    }
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'usuario-templates',
    component: UsuarioTemplatesComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
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
    path: 'fuentes-datos',
    component: FuentesDatosComponent,
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