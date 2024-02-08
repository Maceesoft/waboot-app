import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxColorBoxModule, DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Subject, firstValueFrom } from 'rxjs';
import { OContext } from '../../../../helpers/ocontext';
import { InitNewRowEvent } from 'devextreme/ui/data_grid';

@Component({
  selector: 'group-list',
  standalone: true,
  imports: [CommonModule, DxPopupModule, DxDataGridModule, DxColorBoxModule, DxSelectBoxModule, DxTextBoxModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {
  @ViewChild('grid')
  grid?: DxDataGridComponent;
  itemId: any;

  protected visible = false;
  protected hook: Subject<boolean> | undefined;
  protected groupsDs = new DataSource({
    store: OContext.WGrupos(),
    filter: ['Usuario', '=', 0]
  });

  icons = [
    'fa-light fa-car-side',
    'fa-light fa-user-helmet-safety',
    'fa-solid fa-user-tie-hair',
    'fa-light fa-temperature-snow'
  ];

  show = (opts: { userId: number }) => {
    this.hook = new Subject<boolean>();
    this.visible = true;
    this.itemId = opts.userId;
    this.groupsDs.filter(['Usuario', '=', opts.userId]);
    this.groupsDs.load();

    return firstValueFrom(this.hook);
  }

  protected onHidden = () => {
    if (this.hook?.observed) {
      this.hook.complete();
      this.hook.unsubscribe();
    }
    this.hook = undefined;
  }

  protected addNewRowClick = async () => {
    await this.grid?.instance.addRow();
  }

  protected onInitNewRow = (e: InitNewRowEvent) => {
    e.data = {
      Usuario: this.itemId
    };
  }
}
