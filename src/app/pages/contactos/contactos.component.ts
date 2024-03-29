import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxContextMenuComponent, DxContextMenuModule, DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { StoreX } from '../../libs/store';
import { AuthData } from '../../models/auth-data';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../helpers/ocontext';
import { EditingStartEvent, InitNewRowEvent, RowInsertingEvent } from 'devextreme/ui/data_grid';
import { Countries } from '../../helpers/country';
import { alert } from 'devextreme/ui/dialog'
import { GroupListComponent } from './components/group-list/group-list.component';
import { HostComponent } from '../../shared/components/host/host.component';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxContextMenuModule, GroupListComponent, HostComponent],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.scss'
})
export class ContactosComponent {
  @ViewChild('grid')
  grid?: DxDataGridComponent;

  @ViewChild('groupList')
  groupList?: GroupListComponent;

  @ViewChild('menucountry')
  menucountry?: DxContextMenuComponent;

  phoneRules: any = {
    X: /[0-9]/,
  };
  authData = StoreX.session.getObj<AuthData>('auth');
  currentId = this.authData?.user.padre ?? this.authData?.user.id;
  curFilter = ['Usuario', '=', this.authData?.user.id];

  contactosDs = new DataSource({
    store: OContext.Contactos(),
    expand: ['GrupoNavigation($select=Nombre,Bcolor,Tcolor,Icono)'],
    filter: this.curFilter,
  });

  countryMenu = Countries();
  country: any;

  constructor() {
  }

  showCountryMenu = () => {
    this.menucountry?.instance.show();
  }

  onEditingStart = (e: EditingStartEvent) => {
    this.country = <any>this.countryMenu.find(o => o.value == e.data.Codigo);
  }

  onInitNewRow = (e: InitNewRowEvent) => {
    e.data = {
      Usuario: this.currentId
    };
  }

  onAddNewClick = async () => {
    await this.grid?.instance.addRow();
  }

  onRowInserting = (e: RowInsertingEvent) => {
    if (!!!e.data.Codigo) {
      e.cancel = true;
      alert('Selecioné el codigo de su pais', 'Error');
    }
  }

  onMenuCountryClick = (e: any) => {
    this.country = e.itemData;

    const gridInstance = this.grid!.instance;
    const editRowKey = gridInstance.option('editing.editRowKey');
    const rowIndex = gridInstance.getRowIndexByKey(editRowKey);
    gridInstance.cellValue(rowIndex, "Codigo", this.country.value);
  }

  onGroupMenuClick = async () => {
    const result = await this.groupList?.show({
      userId: this.currentId!
    });

    if(result) {
      this.grid?.instance.refresh();
    }
  }

  customizePhoneText = (data: any) => {
    if (!!data.WhatsApp) {
      const part1 = data.WhatsApp.substring(0, 3);
      const part2 = data.WhatsApp.substring(3, 6);
      const part3 = data.WhatsApp.substring(6);
      return `(+${data.Codigo}) ${part1}-${part2}-${part3}`;
    } else {
      return '';
    }
  }

  getGroupBackgroundColor = (data: Array<any>) => {
    if (!!!data || data.length == 0 || data[0].GrupoNavigation == null)
      return '';

    return data[0].GrupoNavigation.Bcolor;
  }

  getGroupIcon = (data: Array<any>) => {
    if (!!!data || data.length == 0 || data[0].GrupoNavigation == null)
      return '';

    return data[0].GrupoNavigation.Icono;
  }

  getGroupColor = (data: Array<any>) => {
    if (!!!data || data.length == 0 || data[0].GrupoNavigation == null)
      return '';

    return data[0].GrupoNavigation.Tcolor;
  }

  printAll = (a: any)=> {

  }
}
