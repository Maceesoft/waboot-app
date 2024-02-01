import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DxFormModule } from 'devextreme-angular';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DxFormModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

}
