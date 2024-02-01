import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { OContext } from '../../helpers/ocontext';
import DataSource from 'devextreme/data/data_source';
import { StoreX } from '../../libs/store';
import { AuthData } from '../../models/auth-data';
import { EditingStartEvent, InitNewRowEvent } from 'devextreme/ui/data_grid';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import { TextEditorButton } from 'devextreme/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, DxDataGridModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  @ViewChild('grid')
  grid?: DxDataGridComponent;

  password = '';
  confirmation = '';
  modePwdField = 'password';
  isEditing = false;
  curData: any;
  authData = StoreX.session.getObj<AuthData>('auth');
  adminFilter = ['Id', '<>', this.authData?.user.id];
  userFilter = ['Padre', '=', this.authData?.user.id];

  usuariosDs = new DataSource({
    store: OContext.Usuarios(),
    filter: this.authData?.user.role == 'admin' ? this.adminFilter : this.userFilter,
  });

  usuarios = OContext.Usuarios();

  passButtons: Array<TextEditorButton> = [
    {
      name: 'pwd',
      options: {
        icon: 'eyeopen',
        stylingMode: 'text',
        onClick: () => {
          this.modePwdField = this.modePwdField === 'text' ? 'password' : 'text';
        }
      },
    }
  ];

  constructor() {
    this.validationCallback = this.validationCallback.bind(this);
  }

  onEditingStart = (e: EditingStartEvent) => {
    this.modePwdField = 'password';
    this.isEditing = true;
    e.data.Confirm = e.data.Password;
    this.curData = e.data;
  }

  onInitNewRow = (e: InitNewRowEvent) => {
    this.modePwdField = 'password';
    this.isEditing = false;
    e.data = {
      Role: 'user',
      Padre: this.authData?.user.id,
      Activo: true,
      ChangedPasswordFirstLogin: false
    };
    this.curData = null;
  }

  onPwdValueChanged = (e: ValueChangedEvent) => {
    this.password = e.value;
  }

  passwordComparison = () => {
    return this.password;
  }

  onAddNewClick = async () => {
    await this.grid?.instance.addRow();
  }

  validationCallback = (params: any) => {
    return new Promise<void>(async (resolve, reject) => {

      if (this.isEditing && this.curData?.UserName == params.value) {
        resolve();
      } else {
        const usuarios = await OContext.Usuarios().load({
          filter: ['UserName', '=', params.value]
        });

        if (usuarios.length > 0) {
          reject(`El nombre de usuario '${params.value}' ya existe, use otro diferente`);
        } else {
          resolve();
        }
      }

    });
  }
}
