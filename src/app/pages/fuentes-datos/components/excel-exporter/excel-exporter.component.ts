import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormComponent, DxFormModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { Subject, firstValueFrom } from 'rxjs';
import * as ExcelJS from 'exceljs';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../../../helpers/ocontext';
import { StoreX } from '../../../../libs/store';
import { AuthData } from '../../../../models/auth-data';
import { StepButton, SteperComponent } from '../../../../shared/components/steper/steper.component';
import { SelectionChangedEvent } from 'devextreme/ui/select_box';
import { InitializedEvent } from 'devextreme/ui/text_box';
import { StepProgressComponent } from '../../../../shared/components/step-progress/step-progress.component';

@Component({
  selector: 'excel-exporter',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxPopupModule, DxSelectBoxModule, DxFormModule, DxButtonModule, SteperComponent, DxTextBoxModule, DxScrollViewModule, StepProgressComponent, DxCheckBoxModule],
  templateUrl: './excel-exporter.component.html',
  styleUrl: './excel-exporter.component.scss'
})
export class ExcelExporterComponent {
  @ViewChild('steper')
  steper?: StepProgressComponent;

  @ViewChild('file')
  file?: ElementRef;

  @ViewChild('form')
  form?: DxFormComponent;

  steps: Array<StepButton> = [
    {
      cssIcon: 'fa-light fa-file-excel',
      value: 1
    },
    {
      cssIcon: 'fa-light fa-code',
      value: 2
    },
    {
      cssIcon: 'fa-light fa-pen-field',
      value: 3
    },
    {
      cssIcon: 'fa-light fa-database',
      value: 4
    }
  ];

  step = 0;

  protected authData = StoreX.session.getObj<AuthData>('auth');
  protected currentId = this.authData?.user.padre ?? this.authData?.user.id;
  protected visible = false;
  protected hook: Subject<boolean> | undefined;
  protected result = false;
  protected sheetsStore = new ArrayStore<ExcelJS.Worksheet>({
    data: []
  });

  protected sheetsDs = new DataSource({
    store: this.sheetsStore
  });

  protected title = 'Crear Fuente de datos desde Excel'
  protected fileStr: string = '';
  protected sheet: ExcelJS.Worksheet | undefined;
  protected plantilla: any;
  protected parametros: any = {};
  protected rowHeader: boolean | null | undefined = false;
  protected exportedDataStore = new ArrayStore<any>({
    data: []
  });
  protected exportedDataDs = new DataSource({
    store: this.exportedDataStore
  });

  protected columnsDs = new ArrayStore<ExcelJS.Column>({
    data: []
  });
  protected plantillasDs = new DataSource({
    store: OContext.UsuarioTemplates(),
    filter: ['Usuario', '=', this.currentId],
    expand: ['PlantillaNavigation($select=Nombre, Parametros)'],
    postProcess: (data: Array<any>) => {

      for (let item of data) {
        item.ParametrosArray = JSON.parse(item.PlantillaNavigation.Parametros)
      }

      return data;
    }
  });

  show = () => {
    this.step = 0;
    this.fileStr = '';
    this.exportedDataStore.clear();
    this.columnsDs.clear();
    this.sheetsStore.clear();
    this.sheet = undefined;
    this.plantilla = undefined;
    this.parametros = {};
    this.visible = true;
    this.result = false;
    this.hook = new Subject<boolean>();
    return firstValueFrom(this.hook);
  }

  selectStepChange = (index: number) => {
    if (index == 0)
      this.title = 'Archivo de Excel';
    else if (index == 1)
      this.title = 'Plantilla de whatsApp';
    else if (index == 2)
      this.title = 'Asignación de columnas de excel a plantilla';
    else if (index == 3)
      this.title = 'Vista previa de Datos';

    if (index == 3) {
      this.exportData();
    }

    this.step = index;
  }

  exportData = () => {

    this.exportedDataStore.clear();

    const rowStart = this.rowHeader ? 2 : 1;

    for (let r = rowStart; r <= this.sheet!.actualRowCount; r++) {
      let row = this.sheet?.getRow(r);

      let nRow: any = {};

      for (let entry of Object.entries<ExcelJS.Column>(this.parametros)) {
        const field = entry[0];

        const column = entry[1];

        const value = row?.getCell(column.letter).value;

        nRow[field] = value;
      }

      this.exportedDataStore.insert(nRow);
    }
  }

  onPlantillaSelectionChanged = (e: SelectionChangedEvent) => {
    if (!!this.plantilla) {
      const cols = this.sheet?.actualColumnCount ?? 0;
      this.columnsDs.clear();

      for (let c = 1; c <= cols; c++) {
        const column = this.sheet?.getColumn(c);

        if (this.rowHeader) {
          const cell = this.sheet?.getCell(`${column?.letter}1`);
          column!.key = cell?.value?.toString();
          this.columnsDs.insert(column!);
        } else if (column?.letter) {
          column.key = `Columna-${column?.letter}`;
          this.columnsDs.insert(column);
        }
      }
    }
  }

  protected onFileInitialized = (e: InitializedEvent) => {
    e.element!.onclick = () => {
      this.file?.nativeElement.click();
    }
  }

  protected onHidden = () => {
    this.hook?.next(this.result);
    this.hook?.complete();
    this.hook = undefined;
  }

  protected openExcel = () => {
    this.file?.nativeElement.click();
  }

  protected validChangeStep = (index: number) => {
    if (index > 0 && !this.sheet) return false;

    if (index > 1 && !this.plantilla) return false;

    if (index > 2 && Object.keys(this.parametros).length == 0) return false;

    if (index == 3 && !this.form?.instance.validate().isValid) return false;

    return true;
  }

  onPrevStep = () => {
    this.steper?.prev();
  }

  onNextStep = () => {
    this.steper?.next();
  }

  protected inputChange = (e: Event) => {
    const ele = <HTMLInputElement>e.target;
    const files = <FileList>ele.files;

    if (files.length > 0) {
      const ext = files[0].name.split('.').pop();

      if (!!!ext || ext != 'xlsx') {
        alert('El archivo excel no es valido, debe tener la extensión .xlsx');
        return;
      }

      this.fileStr = files[0].name;

      const reader = new FileReader();

      reader.readAsArrayBuffer(files[0]);
      reader.onloadend = () => {
        var arrayBuffer = <ArrayBuffer>reader.result;
        var workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(arrayBuffer).then(workbook => {
          this.sheetsStore.clear();
          this.sheet = undefined;
          workbook.worksheets.forEach(wordsheet => {
            this.sheetsStore.insert(wordsheet);
          });
          this.sheetsDs.reload();
        });
      }

    }
  }
}
