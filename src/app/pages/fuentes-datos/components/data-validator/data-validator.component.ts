import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxPopupModule } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { CellPreparedEvent } from 'devextreme/ui/data_grid';
import { Subject, firstValueFrom } from 'rxjs';
import { CheckButtonComponent } from '../../../../shared/components/check-button/check-button.component';
import { alert } from 'devextreme/ui/dialog';

@Component({
  selector: 'data-validator',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxPopupModule, CheckButtonComponent],
  templateUrl: './data-validator.component.html',
  styleUrl: './data-validator.component.scss'
})
export class DataValidatorComponent {
  @ViewChild('grid')
  grid?: DxDataGridComponent;
  visible = false;
  result = false;
  hook: Subject<boolean> | undefined;
  dataStore = new ArrayStore<any>({ data: [] });
  dataDs = new DataSource({ store: this.dataStore });
  fullscreen = false;
  parametros: Array<any> | undefined;

  show = (data: Array<any>, parametros: Array<any>) => {
    this.fullscreen = false;
    this.dataStore.clear();
    data.forEach(row => this.dataStore.insert(row));
    this.parametros = structuredClone(parametros);
    this.dataDs.reload();
    this.visible = true;
    this.hook = new Subject<boolean>();

    return firstValueFrom(this.hook);
  }

  onValidate = () => {
    const rows = this.dataDs.items();

    for (let row of rows) {
      const values = Object.values(row);

      for (let val of values) {
        if (!!!val)
          return false;
      }
    }

    return true;
  }

  onCellPrepared = (e: CellPreparedEvent) => {
    if (e.data.Obligatorio) {
      if (!!!e.value && e.column.type != 'buttons')
        e.cellElement.classList.add('invalidCell');
    }
  }

  onHidden = () => {
    if (this.hook?.observed) {
      this.hook?.next(this.result);
      this.hook?.complete();
    }
    this.hook = undefined;
  }

  onCheckChanged = (check: boolean) => {
    this.grid?.instance.option('wordWrapEnabled', check);
  }

  onFullScreen = () => {
    this.fullscreen = !this.fullscreen;
  }

  onColumnChanged = (check: boolean) => {
    this.grid?.instance.option('columnAutoWidth', check);
  }

  onSave = () => {
    const data = this.dataDs.items();

    ///aki se guarda los datos
    alert('Datos guardado', 'notify');

  }
}
