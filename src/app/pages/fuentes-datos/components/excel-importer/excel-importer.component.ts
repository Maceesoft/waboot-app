import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DxPopupModule } from 'devextreme-angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-excel-importer',
  standalone: true,
  imports: [CommonModule, DxPopupModule],
  templateUrl: './excel-importer.component.html',
  styleUrl: './excel-importer.component.scss'
})
export class ExcelImporterComponent {
  visible = false;
  hook: Subject<boolean> | undefined;

}
