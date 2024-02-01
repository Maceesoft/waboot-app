import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { DxPopoverComponent, DxSchedulerComponent, DxSchedulerModule, DxToolbarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../helpers/ocontext';
import { AppointState } from '../../helpers/appoint-state';
import { AppointmentClickEvent, AppointmentFormOpeningEvent } from 'devextreme/ui/scheduler';
import { EditCitaComponent } from './components/edit-cita/edit-cita.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, DxSchedulerModule, DxToolbarModule, EditCitaComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit, OnDestroy {
  @ViewChild('editCita')
  editCita?: EditCitaComponent;

  @ViewChild('scheduler')
  scheduler?: DxSchedulerComponent;

  private connection: HubConnection;

  states = AppointState();

  store = OContext.Calendarios();
  clendariosDs = new DataSource({
    store: this.store,
    expand: ['ContactoNavigation'],
    postProcess: (data) => {
      return data;
    }
  });

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://wb.maceesoft.com/hub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      }).build();

    this.connection.on('insert', (data: any) => {
      data.color = '#56ca85';
      this.store.push([{ type: 'insert', data }]);
      console.log(data);
    });

    this.connection.on('delete', (key) => {
      this.store.push([{ type: 'remove', key }])
    });
  }

  getState = (e: number) => {
    return this.states.get(e);
  }

  getClassByState = (e: number) => {
    switch (e) {
      case 1: return 'appoint-enviado';
      case 2: return 'appoint-cancelado';
      case 3: return 'appoint-aceptado';
      case 4: return 'appoint-perdido';
      default:
        return '';
    }
  }

  getIconByState = (e: number) => {
    switch (e) {
      case 1: return 'fa-solid fa-clock-rotate-left';
      case 2: return 'fa-solid fa-ban';
      case 3: return 'fa-regular fa-circle-check';
      case 4: return 'fa-regular fa-stopwatch';
      default:
        return '';
    }
  }

  formatPhone = (code: string, phone: string) => {
    const p1 = phone.substring(0, 3);
    const p2 = phone.substring(3, 6);
    const p3 = phone.substring(6, 10);

    return `(+${code}) ${p1}-${p2}-${p3}`;
  }

  ngOnDestroy(): void {
    if (this.connection.state == HubConnectionState.Connected) {
      this.connection.stop();
    }
  }

  ngOnInit(): void {
    this.connection.start()
      .then(_ => {
        console.log('Connection Started');
      }).catch(error => {
        return console.error(error);
      });
  }

  onAddAppointment = () => {
    this.editCita?.show();
  }

  onAppointmentFormOpening = async (e: AppointmentFormOpeningEvent) => {
    e.cancel = true;
    const res = await this.editCita?.show(e.appointmentData);
    if(res){
      this.clendariosDs.reload();
    }
  }
}
