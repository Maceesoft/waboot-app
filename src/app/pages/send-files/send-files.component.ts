import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SendFileComponent } from '../../shared/components/send-file/send-file.component';

@Component({
  selector: 'app-send-files',
  standalone: true,
  imports: [CommonModule, SendFileComponent],
  templateUrl: './send-files.component.html',
  styleUrl: './send-files.component.scss'
})
export class SendFilesComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container?: ViewContainerRef;
  controls = new Map<number, ComponentRef<SendFileComponent>>();
  loading = false;


  add = () => {
    const v = this.container?.createComponent(SendFileComponent, {
      index: 0
    });

    const key = new Date().getTime();

    v!.instance.id = key;
    v!.instance.index = this.container!.length;
    this.controls.set(key, v!);

    v!.instance.clickHandler.subscribe(id => {
      const instance = this.controls.get(id);
      this.container?.remove(this.container.indexOf(instance!.hostView));
      this.controls.delete(id);
      this.updateIndexs();
    });
  }

  updateIndexs = () => {
    let index = 1;
    for (let c of this.controls.values()) {
      c.instance.index = index;
      index++;
    }
  }

  guardar = () => {
    if (this.controls.size == 0) return;

    let isInvalid = false;

    for (let c of this.controls.values()) {
      if (!c.instance.isValid()) {
        c.instance.cdf.detectChanges();
        if (!isInvalid) isInvalid = true;
      }
    }

    if (isInvalid) {
      alert('Complete todos los campos');
    } else {
      this.loading = true;
    }
  }
}
