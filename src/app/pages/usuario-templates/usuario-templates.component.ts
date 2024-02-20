import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxListComponent, DxListModule, DxLoadIndicatorModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../helpers/ocontext';
import { FocusedRowChangedEvent } from 'devextreme/ui/data_grid';
import { SelectionChangedEvent } from 'devextreme/ui/list';
import { alert } from 'devextreme/ui/dialog';
import { HostComponent } from '../../shared/components/host/host.component';

@Component({
  selector: 'app-usuario-templates',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxListModule, DxLoadIndicatorModule, HostComponent],
  templateUrl: './usuario-templates.component.html',
  styleUrl: './usuario-templates.component.scss'
})
export class UsuarioTemplatesComponent {
  @ViewChild('list')
  list?: DxListComponent;

  @ViewChild('grid')
  grid?: DxDataGridComponent;

  rowKey?: number;
  loading = false;
  lock = false;

  plantillasDs = new DataSource({
    store: OContext.Plantillas()
  });

  usuariosDs = new DataSource({
    store: OContext.Usuarios(),
    expand: ['UsuarioTemplates'],
    filter: ['Padre', '=', null]
  });

  onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
    this.lock = true;
    const userTemps: Array<any> = e.row?.data.UsuarioTemplates;
    this.list?.instance.option('selectionMode', 'multiple');
    this.list?.instance.option('selectedItemKeys', userTemps.map(o => o.Plantilla));
    this.lock = false;
  }

  onSelectionChanged = async (e: SelectionChangedEvent) => {
    if (this.lock) return;

    this.loading = true;
    try {
      if (e.addedItems.length > 0) {
        this.loading = true;
        await OContext.UsuarioTemplates().insert({
          Plantilla: e.addedItems[0].Id,
          Usuario: this.rowKey
        });
        await this.grid?.instance.refresh();
        this.loading = false;
      } else if (e.removedItems.length > 0) {
        const rows = this.usuariosDs.items();
        const rowIndex = this.grid?.instance.getRowIndexByKey(this.rowKey);
        const row = rows[rowIndex!];
        const userTemps = row.UsuarioTemplates.find((o: any) => o.Plantilla == e.removedItems[0].Id);
        await OContext.UsuarioTemplates().remove(userTemps.Id);
        await this.grid?.instance.refresh();
      }
    } catch (e) {
      alert("Ocurrio un error durante el guardado!!", 'error');
    } finally {
      this.loading = false;
    }
  }
}
