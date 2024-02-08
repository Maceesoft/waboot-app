import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DxButtonModule, DxTextAreaComponent, DxTextBoxComponent, DxTextBoxModule } from 'devextreme-angular';
import { WApiService } from '../../shared/services/w-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, DxButtonModule, DxTextBoxModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  @ViewChild("file")
  file?: ElementRef;

  @ViewChild("text")
  text?: DxTextBoxComponent;

  fileObj: File | undefined;

  constructor(private wApi: WApiService) {
    
    this.wApi.Media.getUrlFromId('409603128135363').subscribe({
      next: e => console.log(e)
    });

  }

  uploadClick = async () => {
    /*
    firstValueFrom(this.wApi.Media.upload(this.fileObj!)).then(e => console.log(e))
      .catch(e => console.log(e)); */
/*
    this.wApi.Media.download("https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=409603128135363&ext=1707289262&hash=ATvsHCbAPuwC_z2EBtem639josD9OloHLV90Nrz3u_OPxA")
      .subscribe({
        next: e => console.log(e)
      }); */

      this.wApi.Media.delete("409603128135363").subscribe(e => console.log(e));
  }

  fileClick = () => {
    this.file?.nativeElement.click();
  }

  filePickerClick = (e: any) => {
    if (e.target.files.length == 1) {
      this.fileObj = e.target.files[0];
      this.text?.instance.option("value", this.fileObj?.name);
    }
  }
}
