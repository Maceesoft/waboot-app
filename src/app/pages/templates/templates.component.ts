import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../helpers/ocontext';
import { HostComponent } from '../../shared/components/host/host.component';
import { EditTamplateComponent } from './edit-tamplate/edit-tamplate.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, HostComponent, EditTamplateComponent, NgJsonEditorModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  @ViewChild('grid')
  grid?: DxDataGridComponent;

  @ViewChild('editTemp')
  editTemp?: EditTamplateComponent;

  plantillasDs = new DataSource({
    store: OContext.Plantillas()
  });

  addNewClick = async () => {
    await this.editTemp?.show();
  }

  formatJson = (data: any) => {
    const obj = JSON.parse(data);
    return JSON.stringify(obj, null, "\t")
  }

  parseJson = (data: any) => {
    return JSON.parse(data);
  }

  onEditClick = async (e: any) => {
    const result = await this.editTemp?.show(e.row.data);

    if (result) {
      await this.grid?.instance.refresh();
    }
  }
}
