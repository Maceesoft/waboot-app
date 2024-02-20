import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../helpers/ocontext';
import { StoreX } from '../../libs/store';
import { AuthData } from '../../models/auth-data';
import { HostComponent } from '../../shared/components/host/host.component';

@Component({
  selector: 'app-campana',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, HostComponent],
  templateUrl: './campana.component.html',
  styleUrl: './campana.component.scss'
})
export class CampanaComponent {
  authData = StoreX.session.getObj<AuthData>('auth');
  currentId = this.authData?.user.padre ?? this.authData?.user.id;

  plantillasDs = new DataSource({
    store: OContext.UsuarioTemplates(),
    filter: ['Usuario', '=', this.currentId],
    expand: ['PlantillaNavigation($select=Nombre)']
  })
}
