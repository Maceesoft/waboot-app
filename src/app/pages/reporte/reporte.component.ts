import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DxChartModule } from 'devextreme-angular';
import { KpiCitasComponent } from '../../shared/components/kpi-citas/kpi-citas.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, DxChartModule, KpiCitasComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteComponent {

}
