import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxPopupModule, DxScrollViewModule, DxTextBoxModule } from 'devextreme-angular';
import { Subject, firstValueFrom } from 'rxjs';
import { ServiciosTransporteMessage } from '../../../schemas/servicios_transporte_schema';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { alert } from 'devextreme/ui/dialog';
import { OContext } from '../../../helpers/ocontext';

export interface eParam {
  name: string;
  caption: string;
  size: number;
}

@Component({
  selector: 'edit-tamplate',
  standalone: true,
  imports: [CommonModule, DxPopupModule, NgJsonEditorModule, DxScrollViewModule, DxDataGridModule, DxButtonModule, DxTextBoxModule],
  templateUrl: './edit-tamplate.component.html',
  styleUrl: './edit-tamplate.component.scss'
})
export class EditTamplateComponent implements OnInit {
  @ViewChild('grid')
  grid?: DxDataGridComponent;

  protected visible = false;
  protected loading = false;
  protected hook: Subject<boolean> | undefined;
  protected editorOptions = new JsonEditorOptions();
  protected rowId?: number;
  protected emptyJson = ServiciosTransporteMessage.json;
  protected outJson: any; // = structuredClone(this.emptyJson);
  protected tempName: string = '';
  protected parameter = new Array<eParam>();
  protected paramsData = new Array<any>();
  protected parametersDs = new DataSource({
    store: new ArrayStore({
      data: this.paramsData, key: 'Parametro',
      onInserting(values) {
        values.Parametro = values.Parametro.toUpperCase();
        values.Etiqueta = values.Etiqueta.toLowerCase();
        values.Tooltip = values.Tooltip.toLowerCase();
      }
    })
  });

  constructor() {
    this.editorOptions.modes = ['code', 'form', 'tree', 'view'];
    this.editorOptions.mode = 'view';
    this.editorOptions.mainMenuBar = true;
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.editorOptions.search = false;
    this.editorOptions.statusBar = true;
    this.editorOptions.name = "Root";
    this.editorOptions.expandAll = true;
    this.editorOptions.schema = ServiciosTransporteMessage.schema;
  }

  ngOnInit(): void {
    this.parameter.push({
      name: 'PARAM_PHONE_1',
      caption: 'Numero Telefonico',
      size: 13
    });

    this.parameter.push({
      name: 'PARM_IMAGE_1',
      caption: 'Url de Imagen',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT1',
      caption: 'Nombre del Cliente',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT2',
      caption: 'Fecha del Servicio',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT3',
      caption: 'Hora del Servicio',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT4',
      caption: 'Conductor',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT5',
      caption: 'Vehiculo',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT6',
      caption: 'Placa',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT7',
      caption: 'Telefono Condcutor',
      size: 512
    });

    this.parameter.push({
      name: 'PARAM_TEXT8',
      caption: 'Telefono Contacto',
      size: 512
    });
  }


  show = (data?: any) => {
    this.visible = true;
    this.hook = new Subject();

    if (!!data) {
      this.rowId = data.Id;
      this.tempName = data.Nombre;
      this.emptyJson = JSON.parse(data!.Plantilla1);
      this.outJson = structuredClone(this.emptyJson);
      const params: Array<any> = JSON.parse(data!.Parametros);

      for (let p of params) {
        this.parametersDs.store().insert(p);
      }

      this.parametersDs.reload();
    }

    return firstValueFrom(this.hook);
  }

  protected onHidden = () => {
    if (this.hook && this.hook.observed) {
      this.hook.complete();
      this.hook = undefined;
    }
  }

  protected addNewClick = () => {
    this.grid?.instance.addRow();
  }

  cancel = () => {
    this.hook?.next(false);
    this.hook?.complete();
    this.visible = false;
  }

  saveData = async () => {
    if (!!!this.outJson || !!!this.paramsData || this.paramsData.length == 0 || !!!this.tempName) {
      alert('La plantilla y los parametros son obligatorios!', 'Error');
    } else {
      try {
        this.loading = true;

        const body = {
          Plantilla1: JSON.stringify(this.outJson),
          Parametros: JSON.stringify(this.paramsData),
          Nombre: this.tempName.toLocaleUpperCase()
        };

        if (!!!this.rowId) {
          await OContext.Plantillas().insert(body);
        } else {
          await OContext.Plantillas().update(this.rowId, body);
        }

        this.hook?.next(true);
        this.hook?.complete();
        this.visible = false;
      } catch (e) {
        console.log(e);
        alert('Ocurrio un error durante el guardado', 'Error');
      } finally {
        this.loading = false;
      }
    }
  }

  jsonChange = (e: any) => {
    this.outJson = e;
  }
}
