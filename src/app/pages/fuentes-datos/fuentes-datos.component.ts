import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { ExcelExporterComponent } from './components/excel-exporter/excel-exporter.component';

@Component({
  selector: 'app-fuentes-datos',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, ExcelExporterComponent],
  templateUrl: './fuentes-datos.component.html',
  styleUrl: './fuentes-datos.component.scss'
})
export class FuentesDatosComponent {
  @ViewChild('excelExporter')
  excelExporter?: ExcelExporterComponent;

  excelClick = async () => {
    await this.excelExporter?.show();
  }
}
