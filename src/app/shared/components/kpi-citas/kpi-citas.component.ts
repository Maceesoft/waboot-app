import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'kpi-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-citas.component.html',
  styleUrl: './kpi-citas.component.scss'
})
export class KpiCitasComponent {
  @Input()
  title!: string;

  @Input()
  cssIcon!: string;

  @Input()
  cssColor!: string;

  @Input()
  valor!: string;
}
