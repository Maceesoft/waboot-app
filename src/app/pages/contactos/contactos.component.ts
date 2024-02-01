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

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxContextMenuModule],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.scss'
})
export class ContactosComponent {
  @ViewChild('grid')
  grid?: DxDataGridComponent;

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
    if(!!!e.data.Codigo) {
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
}
