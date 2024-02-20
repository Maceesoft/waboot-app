import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface uploadResponse {
  id: string;
}

export interface urlFromIdResponse {
  file_size: number;
  id: number;
  messaging_product: string;
  mime_type: string;
  sha256: string;
  url: string;
}

export interface deleteResponse {
  success: boolean;
}

export interface createTemplateResponse {
  id: string;
  status: string;
  category: string;
}

export interface listTemplateResponse {
  id: string;
  status: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WApiService {
  f5Number = '223852870813184';
  testNumber = '117168924654185';
  token = 'EAARsJaQdFWwBOzJGPvrdnaMXOAZAHYXzSwdk2dmIpWPI2AHZBdHWSAlcZBqP8DHKSzDC9LgVZA68rbw494ZC8w9OzpivCBitVgyCbUJTj7sbjfiwiNQ2ITuSiexBKqToqZCW4inZCELa90FhyxElQGO3k6HDCZB4Hhfb7FccgbtcXUc3QhO7oseWAg8swSgdSUXIwsiZBxDro5JKVgEsa';

  constructor(private http: HttpClient) { }

  Media = {
    upload: (file: File): Observable<uploadResponse> => {

      const url = `${this.WaUrl}/${this.f5Number}/media`;

      const formData = new FormData();
      formData.append("messaging_product", "whatsapp");
      formData.append('file', file);

      return this.http.post<uploadResponse>(url, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    },
    getUrlFromId: (mediaId: string) => {

      const url = `${this.WaUrl}/${mediaId}?phone_number_id=${this.f5Number}`;

      return this.http.get<urlFromIdResponse>(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    },
    delete: (mediaId: string) => {
      const url = `${this.WaUrl}/${mediaId}?phone_number_id=${this.f5Number}`;
      return this.http.delete<deleteResponse>(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    },
    download: (mediaUrl: string) => {
      const url = `${this.WaUrl}/${mediaUrl}`;
      return this.http.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    },
  };

  Template = {
    Create: (name: string, components: Array<any>) => {
      let body = {
        name: name,
        category: 'UTILITY', //AUTHENTICATION, MARKETING
        allow_category_change: true,
        language: 'es',
        components: components
      };


      const url = `${this.WaUrl}/240329252490866/message_templates`;
      return this.http.post<createTemplateResponse>(url, body, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    },
    List: () => {
      const url = `${this.WaUrl}/240329252490866/message_templates`;
      return this.http.get<listTemplateResponse>(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
  }

  get WaUrl() {
    return 'https://graph.facebook.com/v19.0'
  }
}
