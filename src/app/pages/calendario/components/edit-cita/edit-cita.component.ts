import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DxFormComponent, DxFormModule, DxPopupModule, DxTextAreaModule } from 'devextreme-angular';
import { Subject, firstValueFrom, ignoreElements } from 'rxjs';
import { AppointStateArray } from '../../../../helpers/appoint-state';
import { HidingEvent } from 'devextreme/ui/popup';
import { OContext } from '../../../../helpers/ocontext';
import { alert } from 'devextreme/ui/dialog';
import DataSource from 'devextreme/data/data_source';
import { StoreX } from '../../../../libs/store';
import { AuthData } from '../../../../models/auth-data';
import { FormatHelper } from '../../../../helpers/format';

@Component({
  selector: 'edit-cita',
  standalone: true,
  imports: [CommonModule, DxPopupModule, DxFormModule, DxTextAreaModule],
  templateUrl: './edit-cita.component.html',
  styleUrl: './edit-cita.component.scss'
})
export class EditCitaComponent {
  @ViewChild('form')
  form?: DxFormComponent;
  loading = false;
  formdata: any = {};
  visible = false;
  result?: Subject<boolean>;
  states = AppointStateArray();
  authData = StoreX.session.getObj<AuthData>('auth');
  currentId = this.authData?.user.padre ?? this.authData?.user.id;

  contactos = new DataSource({
    store: OContext.Contactos(),
    map: (item) => {
      return {
        ...item,
        DisplayText: `${item.Nombre} - ${FormatHelper.phoneNumber(item.Codigo, item.WhatsApp)}`
      };
    },
    filter: ['Usuario', '=', this.currentId]
  });

  show = (data?: any) => {
    this.formdata = {
      ...data
    };
    this.visible = true;
    this.result = new Subject<boolean>();

    return firstValueFrom(this.result);
  }

  onHiding = (e: HidingEvent) => {
    e.cancel = this.loading;
  }

  onHidden = () => {
    this.form?.instance.reset();
  }

  ok = async () => {
    if (this.form?.instance.validate().isValid) {
      this.loading = true;

      try {
        if (!!this.formdata.Id) {
          delete this.formdata['ContactoNavigation'];
          await OContext.Calendarios().update(this.formdata.Id, this.formdata);
        } else {
          await OContext.Calendarios().insert({
            ...this.formdata,
            'Usuario': this.currentId,
            Status: 1
          });
        }
        this.result?.next(true);
        this.result?.complete();
        this.visible = false;
      } catch (e) {
        console.log(e);
        alert('Ocurrio un error durante el guardado', 'Error');
      } finally {
        this.loading = false;
      }
    }
  }

  cancel = () => {
    this.visible = false;
    this.result?.next(false);
    this.result?.complete();
  }
}
