import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { DxContextMenuModule, DxSchedulerComponent, DxSchedulerModule, DxToolbarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { OContext } from '../../helpers/ocontext';
import { AppointState } from '../../helpers/appoint-state';
import { AppointmentContextMenuEvent, AppointmentFormOpeningEvent, CellContextMenuEvent, ViewType } from 'devextreme/ui/scheduler';
import { EditCitaComponent } from './components/edit-cita/edit-cita.component';
import { StoreX } from '../../libs/store';
import { AuthData } from '../../models/auth-data';
import { Calendario } from '../../models/calendario';
import notify from 'devextreme/ui/notify';
import { Setting } from '../../helpers/setting';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, DxSchedulerModule, DxToolbarModule, EditCitaComponent, DxContextMenuModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit, OnDestroy {
  @ViewChild('editCita')
  editCita?: EditCitaComponent;

  @ViewChild('scheduler')
  scheduler?: DxSchedulerComponent;

  private connection?: HubConnection;

  currentView: ViewType = 'day';

  appointmentClassName = '.dx-scheduler-appointment';
  cellClassName = '.dx-scheduler-date-table-cell';
  target: string = this.appointmentClassName;

  states = AppointState();
  appointmentData: any;
  authData = StoreX.session.getObj<AuthData>('auth');
  currentId = this.authData?.user.padre ?? this.authData?.user.id;
  menuEdit = [
    {
      icon: 'fa-light fa-pen-to-square',
      text: 'Editar Cita',
      onItemClick: async () => await this.editCita?.show(this.appointmentData)
    }, {
      beginGroup: true,
      text: 'Eliminar Cita',
      icon: 'fa-light fa-trash-can'
    }
  ];
  contextMenuItems = this.menuEdit;

  store = OContext.Calendarios();
  clendariosDs = new DataSource({
    store: this.store,
    filter: ['Usuario', '=', this.currentId],
    expand: ['ContactoNavigation']
  });

  constructor() {

    this.connection = new HubConnectionBuilder()
      .withUrl(`${Setting.getDomain()}/hub`, {
        skipNegotiation: true,
        withCredentials: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return this.authData?.accessToken!
        }
      }).build();


    this.connection?.on('insert', (data: Calendario) => {
      this.store.push([{ type: 'insert', data }]);
    });

    this.connection?.on('update', (data: Calendario) => {
      this.store.push([{ type: 'update', data, key: data.Id }]);
    });

    this.connection?.on('delete', (data: Calendario) => {
      this.store.push([{ type: 'remove', key: data.Id }]);
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

    StoreX.local.set('currentView', this.currentView);

    if (this.connection?.state == HubConnectionState.Connected) {
      this.connection?.invoke('unsubscribe', ['Calendario']).then(() => this.connection?.stop());
    }

  }

  ngOnInit(): void {

   this.currentView =  <ViewType>StoreX.local.get('currentView') ?? 'week';

    this.connection?.start()
      .then(async _ => {
        await this.connection?.invoke('subscribe', 'Calendario');
      }).catch(error => {
        notify('Las actualización en tiempo real esta fuera de linea', 'error', 5000);
        return console.error(error);
      });

  }

  onAddAppointment = () => {
    this.appointmentData = null;
    this.editCita?.show();
  }

  onRefreshView = async () => {
    await this.clendariosDs.reload();
  }

  onAppointmentFormOpening = async (e: AppointmentFormOpeningEvent) => {
    e.cancel = true;
    await this.editCita?.show(this.appointmentData);
  }

  onCellContextMenu = (e: CellContextMenuEvent) => {
    this.target = this.cellClassName;
    this.appointmentData = {
      Finicio: e.cellData.startDate,
      Ftermino: e.cellData.endDate,
    }

    this.contextMenuItems = [
      {
        icon: 'plus',
        text: 'Nueva Cita',
        onItemClick: async () => await this.editCita?.show(this.appointmentData)
      }
    ];


  }

  onAppointmentContextMenu = (e: AppointmentContextMenuEvent) => {
    this.target = this.appointmentClassName;
    this.appointmentData = e.appointmentData;
    this.contextMenuItems = this.menuEdit;
  }

  onContextMenuItemClick(e: any) {
    e.itemData.onItemClick(e);
  }
}
